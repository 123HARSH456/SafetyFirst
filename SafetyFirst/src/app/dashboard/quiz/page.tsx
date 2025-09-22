"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import allQuestions from "@/data/questions.json";
import { motion } from "framer-motion";

type Question = {
  question: string;
  options: string[];
  answer: number;
  explanation: string;
};

function getRandomQuestions(num: number): Question[] {
  const shuffled = [...allQuestions].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, num);
}

export default function QuizPage() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  useEffect(() => {
    setQuestions(getRandomQuestions(10));
  }, []);

  const handleAnswer = () => {
    if (selected === questions[current].answer) setScore(score + 1);
    setShowExplanation(true);
  };

  const handleContinue = () => {
    if (current + 1 < questions.length) {
      setCurrent(current + 1);
      setSelected(null);
      setShowExplanation(false);
    } else {
      setFinished(true);
    }
  };

  const handleRestart = () => {
    setQuestions(getRandomQuestions(10));
    setCurrent(0);
    setSelected(null);
    setScore(0);
    setFinished(false);
    setShowExplanation(false);
  };

  if (questions.length === 0) return null;

  const progressValue =
    ((current + (showExplanation ? 1 : 0)) / questions.length) * 100;

  return (
    <div className="flex flex-col min-h-screen items-center justify-start pt-12 pb-6 space-y-8 px-4">
      <section className="text-center space-y-4 w-full max-w-xl">
        <motion.h1
          className="text-4xl font-bold tracking-tight"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Cybersecurity Awareness Quiz
        </motion.h1>
        <motion.p
          className="text-lg text-muted-foreground"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          Test your knowledge on online safety and cybersecurity best practices.
          Complete the quiz to see how prepared you are to stay secure on the
          web.
        </motion.p>
      </section>

      <Card className="w-full max-w-xl">
        <CardContent>
          <Progress value={progressValue} className="mb-4 h-3 rounded-full" />

          {!finished ? (
            !showExplanation ? (
              <>
                <p className="mb-4 font-medium">
                  Question {current + 1} of {questions.length}:{" "}
                  {questions[current].question}
                </p>
                <div className="space-y-2">
                  {questions[current].options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => setSelected(index)}
                      className={`w-full p-2 text-left rounded-md border ${
                        selected === index
                          ? "bg-primary text-primary-foreground"
                          : "hover:bg-muted"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
                <Button
                  onClick={handleAnswer}
                  disabled={selected === null}
                  className="mt-4"
                >
                  Submit Answer
                </Button>
              </>
            ) : (
              <div className="space-y-4">
                <p
                  className={`text-lg font-semibold ${
                    selected === questions[current].answer
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {selected === questions[current].answer
                    ? "✅ Correct!"
                    : "❌ Incorrect!"}
                </p>

                <div className="space-y-2">
                  {questions[current].options.map((option, index) => {
                    let optionClasses =
                      "w-full p-2 text-left rounded-md border ";
                    if (index === questions[current].answer)
                      optionClasses += "bg-green-500 text-white";
                    else if (index === selected)
                      optionClasses += "bg-red-500 text-white";
                    else optionClasses += "bg-muted";
                    return (
                      <div key={index} className={optionClasses}>
                        {option}
                      </div>
                    );
                  })}
                </div>

                <p className="text-sm text-muted-foreground">
                  {questions[current].explanation}
                </p>
                <Button onClick={handleContinue}>Continue</Button>
              </div>
            )
          ) : (
            <div className="space-y-4">
              <p className="text-lg font-semibold">
                Your Score: {score} / {questions.length}
              </p>
              <Button onClick={handleRestart}>Retake Quiz</Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
