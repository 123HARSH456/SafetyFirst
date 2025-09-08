"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";

type Article = {
  id: number;
  title: string;
  description: string;
  image: string;
  content: string;
};

const articles: Article[] = [
  {
    id: 1,
    title: "The Day I Almost Fell for a Phishing Scam",
    description:
      "A personal story of receiving a convincing fake email and how small details saved me from losing everything.",
    image: "/article1.png",
    content: `Last year I received an email that looked exactly like it came from my bank. 
    It had the logo, the same formatting, even a footer with legal text. At first glance I was ready to click 
    the “Verify Account” button. Something stopped me—the email address. It was a long string of random characters, 
    nothing close to my bank. That tiny detail kept me safe. 
    Phishing emails work because they play on urgency and fear. 
    Taking a deep breath and looking closer is sometimes the only difference between safety and disaster.`,
  },
  {
    id: 2,
    title: "Why Your Wi-Fi Password Matters More Than You Think",
    description:
      "How a neighbor’s curiosity turned into a wake-up call about home network security.",
    image: "/article2.png",
    content: `A friend once bragged about how he could connect to his neighbor’s Wi-Fi 
    just by guessing their password—it was literally 'password123'. 
    What started as a harmless joke quickly became serious when he realized he had access to shared files 
    and devices on the network. Weak Wi-Fi passwords can let strangers snoop on your activity, 
    steal files, or even launch attacks using your internet connection. 
    Setting a strong WPA3 password is one of the simplest but most powerful defenses for your digital home.`,
  },
  {
    id: 3,
    title: "The Forgotten Software Update That Saved a Company",
    description:
      "A small delay in updating software nearly cost a business millions. Here’s how they recovered.",
    image: "/article3.png",
    content: `A mid-sized company ignored system updates for months because they didn’t want downtime. 
    One day, ransomware slipped in through an unpatched vulnerability. 
    Workstations locked up, files encrypted, panic everywhere. Luckily, a single server had been updated by accident, 
    and that became the key to restoring their systems. It was a painful lesson but also proof that regular updates 
    are not just about new features—they are about survival in a hostile digital world.`,
  },
];

export default function ArticlesPage() {
  const [selected, setSelected] = useState<Article | null>(null);

  if (selected) {
    return (
      <div className="flex justify-center items-start p-6">
        <Card className="max-w-3xl w-full">
          <Image
            src={selected.image}
            alt={selected.title}
            width={800}
            height={400}
            className="rounded-t-lg"
          />
          <CardHeader>
            <CardTitle className="text-2xl">{selected.title}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground whitespace-pre-line">
              {selected.content}
            </p>
            <Button onClick={() => setSelected(null)}>Back to Articles</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-3 p-6">
      {articles.map((article) => (
        <Card
          key={article.id}
          className="cursor-pointer hover:shadow-lg transition flex flex-col"
          onClick={() => setSelected(article)}
        >
          <div className="relative w-full h-48 md:h-56 lg:h-64 overflow-hidden rounded-t-lg">
            <Image
              src={article.image}
              alt={article.title}
              fill
              className="object-cover object-center"
            />
          </div>
          <CardHeader>
            <CardTitle className="text-lg md:text-xl">
              {article.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">{article.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
