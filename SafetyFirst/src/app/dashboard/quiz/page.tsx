"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import allQuestions from "@/data/questions.json"; 


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
    if (selected === questions[current].answer) {
      setScore(score + 1);
    }
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

  return (
    <div className="flex min-h-screen justify-center items-center">
      <Card className="w-full max-w-xl">
        <CardHeader>
          <CardTitle>Cybersecurity Quiz</CardTitle>
        </CardHeader>
        <CardContent>
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

                    if (index === questions[current].answer) {
                      optionClasses += "bg-green-500 text-white";
                    } else if (index === selected) {
                      optionClasses += "bg-red-500 text-white";
                    } else {
                      optionClasses += "bg-muted";
                    }

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
