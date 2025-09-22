"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function ReportSuspiciousLink() {
  const [url, setUrl] = useState("");
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const isValidUrl = (str: string) => {
    try {
      new URL(str);
      return true;
    } catch {
      return false;
    }
  };

  const wordCount = (text: string) => text.trim().split(/\s+/).length;

  const submitReport = async () => {
    setError("");
    if (!url || !isValidUrl(url)) {
      setError("Please enter a valid URL.");
      return;
    }
    if (!reason || wordCount(reason) < 100) {
      setError("Reason must be at least 100 words.");
      return;
    }

    setLoading(true);

    try {
      const resp = await fetch("/api/report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url, reason }),
      });

      if (!resp.ok) throw new Error("Failed to submit");

      setUrl("");
      setReason("");
      setSubmitted(true);
    } catch (err) {
      setError("Failed to submit report. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen px-6 py-12 space-y-12">
      {/* Hero Section */}
      <section className="text-center space-y-4 max-w-2xl">
        <motion.h1
          className="text-4xl md:text-5xl font-bold tracking-tight"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Report Unsafe Websites
        </motion.h1>
        <motion.p
          className="text-lg text-muted-foreground"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          Help keep the web safe! Submit reports for suspicious or unsafe
          websites so our extension can flag and protect users from potential
          threats.
        </motion.p>
      </section>

      {/* Report Form Card */}
      <Card className="rounded-2xl shadow-md w-full max-w-lg">
        <CardHeader>
          <CardTitle>Submit a Suspicious Link</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            placeholder="Enter suspicious URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            disabled={loading}
          />
          <Textarea
            placeholder="Explain why this link is suspicious (at least 100 words)"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            disabled={loading}
            rows={8}
          />
          <Button onClick={submitReport} disabled={loading}>
            {loading ? "Submitting..." : "Submit Report"}
          </Button>

          {/* Inline feedback */}
          {submitted && (
            <p className="text-green-600 font-medium">
              ✅ Your report has been submitted. Thank you for helping keep the
              web safe!
            </p>
          )}
          {error && <p className="text-red-600 font-medium">⚠️ {error}</p>}
        </CardContent>
      </Card>
    </div>
  );
}
