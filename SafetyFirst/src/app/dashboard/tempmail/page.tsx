"use client";

import { useState } from "react";
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
  id: number;
  from: string;
  subject: string;
  time: string;
  body: string;
}

export default function TempMail() {
  const [tempEmail, setTempEmail] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [inbox, setInbox] = useState<Message[]>([]);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);

  // Mock email generator (replace with backend call later)
  const generateEmail = () => {
    const random = Math.random().toString(36).substring(2, 7);
    const email = `${random}@safetyfirstmail.com`;
    setTempEmail(email);
    setCopied(false);

    // Mock inbox with random messages (replace with backend fetch later)
    const mockInbox: Message[] = [
      {
        id: 1,
        from: "noreply@webapp.com",
        subject: "Welcome to our platform!",
        time: "2m ago",
        body: "Thank you for signing up with our platform. We're excited to have you onboard. Stay safe online!",
      },
      {
        id: 2,
        from: "security@alerts.com",
        subject: "Suspicious login attempt detected",
        time: "10m ago",
        body: "We detected a login attempt from a new device. If this was you, no action is required. If not, please reset your password immediately.",
      },
      {
        id: 3,
        from: "newsletter@cybersafe.org",
        subject: "Top 5 tips to stay safe online",
        time: "1h ago",
        body: "1. Use strong passwords\n2. Enable 2FA\n3. Watch out for phishing\n4. Keep software updated\n5. Use secure networks.",
      },
    ];
    setInbox(mockInbox);
  };

  const copyToClipboard = () => {
    if (tempEmail) {
      navigator.clipboard.writeText(tempEmail);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 space-y-8">
      {/* Hero */}
      <section className="text-center space-y-4">
        <motion.h1
          className="text-4xl font-bold tracking-tight"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Temporary Email Generator
        </motion.h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Protect your privacy by using disposable emails when signing up for
          websites. Stop spam and keep your personal inbox safe.
        </p>
      </section>

      {/* Generator Card */}
      <Card className="rounded-2xl shadow-md">
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
                  className="text-center font-mono"
                />
                <Button variant="outline" size="icon" onClick={copyToClipboard}>
                  <Copy className="h-5 w-5" />
                </Button>
              </div>
              {copied && (
                <p className="text-sm text-green-600">Copied to clipboard!</p>
              )}
              <Button
                variant="secondary"
                className="rounded-2xl w-full"
                onClick={generateEmail}
              >
                Generate Another
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Inbox Section */}
      {tempEmail && (
        <Card className="rounded-2xl shadow-md">
          <CardHeader>
            <CardTitle>Inbox for {tempEmail}</CardTitle>
          </CardHeader>
          <CardContent>
            {inbox.length > 0 ? (
              <div className="divide-y">
                {inbox.map((msg) => (
                  <button
                    key={msg.id}
                    className="w-full text-left py-3 flex items-center justify-between hover:bg-muted/40 rounded-lg px-3 transition"
                    onClick={() => setSelectedMessage(msg)}
                  >
                    <div className="flex items-center gap-3">
                      <Mail className="h-5 w-5 text-blue-600" />
                      <div>
                        <p className="font-medium">{msg.subject}</p>
                        <p className="text-sm text-muted-foreground">
                          From: {msg.from}
                        </p>
                      </div>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {msg.time}
                    </span>
                  </button>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">No messages yet.</p>
            )}
          </CardContent>
        </Card>
      )}

      {/* Message Dialog */}
      <Dialog
        open={!!selectedMessage}
        onOpenChange={() => setSelectedMessage(null)}
      >
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>{selectedMessage?.subject}</DialogTitle>
            <DialogDescription>
              From: {selectedMessage?.from} • {selectedMessage?.time}
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4 whitespace-pre-line text-sm text-muted-foreground">
            {selectedMessage?.body}
          </div>
        </DialogContent>
      </Dialog>

      {/* Info Section */}
      <Card className="rounded-2xl shadow-md">
        <CardHeader>
          <CardTitle>Why Use Temp Mail?</CardTitle>
        </CardHeader>
        <CardContent className="text-muted-foreground space-y-2">
          <p>✔ Avoid spam in your main inbox</p>
          <p>✔ Protect your identity when testing websites</p>
          <p>
            ✔ Stay safe while signing up for newsletters, free trials, or
            downloads
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
