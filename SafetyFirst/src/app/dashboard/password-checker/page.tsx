"use client";

import * as React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
const Page = () => {
  const [password, setPassword] = React.useState("");
  const [strength, setStrength] = React.useState({
    value: 0,
    label: "Enter a password to see its strength.",
    color: "text-muted-foreground",
    progressColor: "",
  });

  const checkPasswordStrength = (pass: string) => {
    let score = 0;
    if (pass.length > 8) score++;
    if (pass.match(/[a-z]/)) score++;
    if (pass.match(/[A-Z]/)) score++;
    if (pass.match(/[0-9]/)) score++;
    if (pass.match(/[^a-zA-Z0-9]/)) score++;

    let strengthLabel = "";
    let strengthColor = "";
    let progressColorClass = ""
     switch (score) {
      case 0:
      case 1:
        strengthLabel = "Very Weak"
        strengthColor = "text-red-600"
        progressColorClass = "bg-red-600"
        break
      case 2:
        strengthLabel = "Weak"
        strengthColor = "text-orange-500"
        progressColorClass = "bg-orange-500"
        break
      case 3:
        strengthLabel = "Medium"
        strengthColor = "text-yellow-500"
        progressColorClass = "bg-yellow-500"
        break
      case 4:
        strengthLabel = "Strong"
        strengthColor = "text-blue-500"
        progressColorClass = "bg-blue-500"
        break
      case 5:
        strengthLabel = "Very Strong"
        strengthColor = "text-green-600"
        progressColorClass = "bg-green-600"
        break
      default:
        strengthLabel = ""
        strengthColor = "text-muted-foreground"
        progressColorClass = ""
    }

    if (!pass) {
      strengthLabel = "Enter a password to see its strength.";
      strengthColor = "text-muted-foreground";
      progressColorClass = "";
    }

    setStrength({
      value: score * 20,
      label: strengthLabel,
      color: strengthColor,
      progressColor: progressColorClass,
    })
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = event.target.value;
    setPassword(newPassword);
    checkPasswordStrength(newPassword);
  }

  return (
    <div className="flex h-full justify-center items-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Password Strength Checker</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            type="password"
            placeholder="Enter a password"
            value={password}
            onChange={handleChange}
          />
          <Progress value={strength.value}
            indicatorClassName={strength.progressColor} />
          <p className={cn("text-sm", strength.color)}>{strength.label}</p>
        </CardContent>
      </Card>
    </div>
  );
};
export default Page;
