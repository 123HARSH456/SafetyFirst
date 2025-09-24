
const PHISHTANK_API_URL = 'http://data.phishtank.com/data/online-valid.json';
const BLOCKLIST_KEY = 'phishingBlocklist';
const LAST_FETCH_KEY = 'lastFetchTimestamp';
const FETCH_INTERVAL = 60 * 60 * 1000; 

const MANUAL_BLOCKLIST = new Set([
  'example-phishing-site.com',
  'malicious-test-page.net',
]);

async function fetchAndStoreBlocklist() {
  console.log('Safe Surf: Fetching updated blocklist...');
  try {
    const response = await fetch(PHISHTANK_API_URL);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    
    const hostnames = new Set(data.map(item => {
        try {
            return new URL(item.url).hostname;
        } catch (e) {
            
            return null;
        }
    }).filter(hostname => hostname !== null));

    console.log(`Safe Surf: Fetched ${hostnames.size} unique malicious hostnames.`);
    
    
    await chrome.storage.local.set({
      [BLOCKLIST_KEY]: Array.from(hostnames),
      [LAST_FETCH_KEY]: Date.now()
    });
    console.log('Safe Surf: Blocklist updated and stored.');
  } catch (error) {
    console.error('Safe Surf: Failed to fetch or process blocklist:', error);
  }
}

async function updateBlocklistIfNeeded() {
  const result = await chrome.storage.local.get(LAST_FETCH_KEY);
  const lastFetch = result[LAST_FETCH_KEY] || 0;
  const now = Date.now();
  if (now - lastFetch > FETCH_INTERVAL) {
    await fetchAndStoreBlocklist();
  } else {
    console.log('Safe Surf: Blocklist is up to date.');
  }
}
chrome.alarms.create('updateBlocklistAlarm', {
  delayInMinutes: 1,      
  periodInMinutes: 60     
});

chrome.alarms.onAlarm.addListener(async (alarm) => {
  if (alarm.name === 'updateBlocklistAlarm') {
    await updateBlocklistIfNeeded();
  }
});

chrome.runtime.onStartup.addListener(updateBlocklistIfNeeded);
chrome.runtime.onInstalled.addListener(updateBlocklistIfNeeded);

chrome.webNavigation.onBeforeNavigate.addListener(async (details) => {
  if (details.frameId !== 0 || !details.url.startsWith('http')) {
    return;
  }

  const url = new URL(details.url);
  const hostname = url.hostname;

  if (MANUAL_BLOCKLIST.has(hostname)) {
    console.log(`Safe Surf: Blocking manually listed site: ${hostname}`);
    blockPage(details.tabId, details.url);
    return;
  }

  const data = await chrome.storage.local.get(BLOCKLIST_KEY);
  const storedList = data[BLOCKLIST_KEY];

  if (storedList && Array.isArray(storedList)) {
    const blocklistSet = new Set(storedList); 
    if (blocklistSet.has(hostname)) {
      console.log(`Safe Surf: Blocking PhishTank listed site: ${hostname}`);
      blockPage(details.tabId, details.url);
    }
  }
});

/**
 * Redirects the user to our custom "blocked" page.
 * @param {number} tabId 
 * @param {string} blockedUrl 
 */
function blockPage(tabId, blockedUrl) {
  const redirectUrl = chrome.runtime.getURL(`blocked.html?url=${encodeURIComponent(blockedUrl)}`);
  chrome.tabs.update(tabId, { url: redirectUrl });
}
