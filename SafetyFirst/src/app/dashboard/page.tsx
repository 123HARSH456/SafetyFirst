"use client"
 import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

export default function AboutSafetyFirst() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-12 space-y-12">
      {/* Hero Section */}
      <section className="text-center space-y-4">
        <motion.h1
          className="text-4xl font-bold tracking-tight"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          About <span className="text-blue-600">SafetyFirst</span>
        </motion.h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Your all-in-one privacy and security hub. Designed to restore digital trust, protect against threats, 
          and empower people to browse the internet with confidence.
        </p>
      </section>

      {/* Mission */}
      <Card className="rounded-2xl shadow-md">
        <CardHeader>
          <CardTitle>Our Mission</CardTitle>
        </CardHeader>
        <CardContent className="text-muted-foreground">
          <p>
            In today’s digital world, scams, phishing, and fake websites are growing at an alarming pace. 
            Traditional security tools are often too technical or opaque. SafetyFirst was built to make 
            digital safety simple, transparent, and accessible to everyone. We believe your privacy, your 
            trust, and your safety should always come first.
          </p>
        </CardContent>
      </Card>

      {/* Core Features */}
      <section>
        <h2 className="text-2xl font-semibold mb-6 text-center">What We Offer</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="rounded-2xl shadow-md">
            <CardHeader>
              <CardTitle>Browser Extension</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              Instantly checks if a website is safe or unsafe using APIs like Google Safe Browsing, 
              PhishTank, and WHOIS, combined with community reports. Gives clear explanations, not just labels.
            </CardContent>
          </Card>
          <Card className="rounded-2xl shadow-md">
            <CardHeader>
              <CardTitle>Privacy Toolkit</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              Includes a temporary email generator, password strength tester, and scam-spotting resources to 
              help you stay protected and reduce spam.
            </CardContent>
          </Card>
          <Card className="rounded-2xl shadow-md">
            <CardHeader>
              <CardTitle>Community Reporting</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              Users can report suspicious sites, building a shared trust database that grows stronger together.
            </CardContent>
          </Card>
          <Card className="rounded-2xl shadow-md">
            <CardHeader>
              <CardTitle>Gamified Learning</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              Learn to recognize online threats through quizzes, badges, and safety scores — making awareness fun and engaging.
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Vision */}
      <Card className="rounded-2xl shadow-md">
        <CardHeader>
          <CardTitle>Our Vision</CardTitle>
        </CardHeader>
        <CardContent className="text-muted-foreground">
          <p>
            By 2025, cybercrime is expected to cost the world over $10 trillion annually. 
            Even a small step toward safer browsing can have a massive impact. 
            SafetyFirst aims to be more than just a tool — it’s a companion that protects, educates, and 
            builds trust in the digital age.
          </p>
        </CardContent>
      </Card>

      {/* Call to Action */}
      <div className="text-center space-y-4">
        <h3 className="text-xl font-semibold">Put SafetyFirst, always.</h3>
        <Link href="/dashboard/uses"><Button size="lg" className="rounded-2xl">
          Get Started
        </Button></Link>
      </div>
    </div>
  )
}
