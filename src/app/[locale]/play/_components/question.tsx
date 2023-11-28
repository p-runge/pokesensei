"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { useState } from "react";
import Button from "~/components/button";
import { cn } from "~/server/utils/cn";
import type { QuestionWithAnswers } from "~/server/utils/question";

const initialState = {
  givenAnswer: undefined,
  correctAnswers: undefined,
};

const Question: React.FC<{
  question: QuestionWithAnswers;
  onAnswer: (answer: string) => void;
}> = ({ question, onAnswer }) => {
  const t = useTranslations();

  const [givenAnswer, updateGivenAnswer] = useState(
    initialState.givenAnswer as string | undefined,
  );

  async function onAnswerClicked(answer: string) {
    updateGivenAnswer(answer);

    onAnswer(answer);
  }

  return (
    <div className="mb-12 grid gap-4">
      {/* question */}
      <div className="flex h-64 flex-col items-center justify-center rounded-lg bg-gray-700 p-4">
        <span className="text-lg">
          {t(question.question.label.string, question.question.label.params)}
        </span>
        {question.question.type === "NAME_OF_POKEMON_BY_IMAGE" && (
          <Image
            src={question.question.imgSrc}
            alt="Pokémon Image"
            width="192"
            height="192"
            className="rendering-pixelated"
            priority
          />
        )}
      </div>

      {/* answers */}
      <div className="grid grid-cols-2 gap-4">
        {question.answers.map((answer, i) => (
          <Button
            key={`${answer.value}-${i}`}
            disabled={!!givenAnswer}
            className="rounded-lg bg-primary px-4 py-4 text-2xl"
            onClick={() => onAnswerClicked(answer.value)}
          >
            {answer.label}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default Question;
