"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"
export default function Uses() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-12 space-y-12">
      {/* Hero Section */}
      <section className="text-center space-y-4">
        <motion.h1
          className="text-4xl font-bold tracking-tight"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          How people use <span className="text-blue-600">SafetyFirst</span>
        </motion.h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          SafetyFirst fits into everyday browsing, helping students, professionals, and families stay safe online. 
          Here are some common ways our toolkit makes life easier and more secure.
        </p>
      </section>

      {/* Use Cases */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="rounded-2xl shadow-md">
          <CardHeader>
            <CardTitle>Students</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground">
            Whether researching for assignments or exploring new platforms, students often face phishing attempts 
            and shady ads. With our browser extension, they instantly know which sites are safe to trust — avoiding 
            stolen credentials or wasted time on fake sites.
          </CardContent>
        </Card>

        <Card className="rounded-2xl shadow-md">
          <CardHeader>
            <CardTitle>Professionals</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground">
            Remote workers and freelancers often deal with client portals, email attachments, and login pages. 
            SafetyFirst helps them verify domains, test password strength, and use temporary emails for signups — 
            reducing risk and improving digital hygiene.
          </CardContent>
        </Card>

        <Card className="rounded-2xl shadow-md">
          <CardHeader>
            <CardTitle>Families</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground">
            Parents can browse confidently knowing the extension warns against suspicious links, while kids learn 
            through our gamified safety quizzes. It’s a lightweight way to teach online responsibility at home.
          </CardContent>
        </Card>

        <Card className="rounded-2xl shadow-md">
          <CardHeader>
            <CardTitle>Everyday Users</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground">
            From shopping online to signing up for newsletters, people rely on SafetyFirst for disposable emails, 
            scam spotting guides, and real-time phishing alerts. It’s a digital companion for safer browsing.
          </CardContent>
        </Card>
      </div>

      {/* Closing Note */}
      <section className="text-center space-y-4">
        <h2 className="text-2xl font-semibold">Making Safety Simple</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          No complicated jargon. No technical barriers. Just a straightforward toolkit designed for real-world 
          internet use — so that everyone can put SafetyFirst.
        </p>
      </section>
    </div>
  )
}
