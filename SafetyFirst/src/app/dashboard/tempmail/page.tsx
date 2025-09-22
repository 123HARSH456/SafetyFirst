"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Copy, Mail } from "lucide-react";
import { motion } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

interface Message {
  id: string;
  from: string;
  subject: string;
  time: string;
  body?: string;
}

export default function TempMail() {
  const [tempEmail, setTempEmail] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [inbox, setInbox] = useState<Message[]>([]);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);

  const generateEmail = async () => {
    const resp = await fetch("/api/tempmail/create", { method: "POST" });
    const data = await resp.json();
    if (resp.ok) {
      setTempEmail(data.address);
      setToken(`Bearer ${data.token}`);
      setInbox([]);

      //Save in localStorage
      localStorage.setItem("tempEmail", data.address);
      localStorage.setItem("tempToken", `Bearer ${data.token}`);
    }
  };

  const fetchInbox = async () => {
    if (!token) return;
    const resp = await fetch("/api/tempmail/messages", {
      headers: { Authorization: token },
    });
    const data = await resp.json();

    if (resp.ok) {
      interface ApiMessage {
        id: string;
        from?: { address: string };
        subject?: string;
        createdAt: string;
      }

      const msgs = (data["hydra:member"] || []).map((m: ApiMessage) => ({
        id: m.id,
        from: m.from?.address || "Unknown",
        subject: m.subject || "(no subject)",
        time: new Date(m.createdAt).toLocaleTimeString(),
      }));

      setInbox(msgs);
    }
  };

  const openMessage = async (id: string) => {
    if (!token) return;
    const resp = await fetch(`/api/tempmail/message/${id}`, {
      headers: { Authorization: token },
    });
    const data = await resp.json();
    if (resp.ok) {
      setSelectedMessage({
        id: data.id,
        from: data.from?.address,
        subject: data.subject,
        time: new Date(data.createdAt).toLocaleString(),
        body: data.text || data.intro,
      });
    }
  };

  const copyToClipboard = () => {
    if (tempEmail) {
      navigator.clipboard.writeText(tempEmail);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // auto-refresh inbox every 10s
  useEffect(() => {
    if (!token) return;

    const interval = setInterval(fetchInbox, 10000);
    fetchInbox(); // initial fetch

    return () => clearInterval(interval);
  }, [token, fetchInbox]);

  useEffect(() => {
    const savedEmail = localStorage.getItem("tempEmail");
    const savedToken = localStorage.getItem("tempToken");
    if (savedEmail && savedToken) {
      setTempEmail(savedEmail);
      setToken(savedToken);
    }
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 space-y-8 dark text-white min-h-screen">
      {/* Hero */}
      <section className="text-center space-y-4">
        <motion.h1
          className="text-4xl font-bold tracking-tight"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Temporary Email Generator
        </motion.h1>
        <p className="text-lg text-gray-300 max-w-2xl mx-auto">
          Protect your privacy by using disposable emails when signing up for
          websites. Stop spam and keep your personal inbox safe.
        </p>
      </section>

      {/* Generator */}
      <Card className="rounded-2xl shadow-md dark border border-gray-700">
        <CardHeader>
          <CardTitle>Create a Temporary Email</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {!tempEmail ? (
            <Button
              size="lg"
              className="rounded-2xl w-full"
              onClick={generateEmail}
            >
              Generate Email
            </Button>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Input
                  value={tempEmail}
                  readOnly
                  className="text-center font-mono bg-gray-700 text-white"
                />
                <Button variant="outline" size="icon" onClick={copyToClipboard}>
                  <Copy className="h-5 w-5" />
                </Button>
              </div>
              {copied && (
                <p className="text-sm text-green-400">Copied to clipboard!</p>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Inbox */}
      {tempEmail && (
        <Card className="rounded-2xl shadow-md dark border border-gray-700">
          <CardHeader>
            <CardTitle>Inbox for {tempEmail}</CardTitle>
          </CardHeader>
          <CardContent>
            {inbox.length > 0 ? (
              <div className="divide-y divide-gray-700">
                {inbox.map((msg) => (
                  <button
                    key={msg.id}
                    className="w-full text-left py-3 flex items-center justify-between hover:bg-gray-700 rounded-lg px-3 transition"
                    onClick={() => openMessage(msg.id)}
                  >
                    <div className="flex items-center gap-3">
                      <Mail className="h-5 w-5 text-blue-400" />
                      <div>
                        <p className="font-medium text-white">{msg.subject}</p>
                        <p className="text-sm text-gray-400">
                          From: {msg.from}
                        </p>
                      </div>
                    </div>
                    <span className="text-sm text-gray-400">{msg.time}</span>
                  </button>
                ))}
              </div>
            ) : (
              <p className="text-gray-400">No messages yet.</p>
            )}
          </CardContent>
        </Card>
      )}

      {/* Dialog */}
      <Dialog
        open={!!selectedMessage}
        onOpenChange={() => setSelectedMessage(null)}
      >
        <DialogContent className="sm:max-w-lg bg-gray-800 text-white border border-gray-700">
          <DialogHeader>
            <DialogTitle>{selectedMessage?.subject}</DialogTitle>
            <DialogDescription className="text-gray-400">
              From: {selectedMessage?.from} • {selectedMessage?.time}
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4 whitespace-pre-line text-sm text-gray-300">
            {selectedMessage?.body}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
