"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import Button from "~/components/button";
import { type QueryReturnType } from "~/server/api/root";
import { api } from "~/trpc/react";

export default function Question({
  question,
  onAnswer,
}: {
  question: QueryReturnType["quiz"]["getById"]["questions"][number];
  onAnswer: (value: string) => void;
}) {
  const t = useTranslations();

  const { mutateAsync: answerQuestion } = api.question.answer.useMutation();

  async function onAnswerClicked(value: string) {
    void answerQuestion({
      id: question.id,
      value,
    });

    onAnswer(value);
  }

  return (
    <div className="mb-12 grid gap-4">
      {/* question */}
      <div className="flex h-64 flex-col items-center justify-center rounded-lg bg-gray-500 p-4 shadow-lg shadow-gray-500 dark:bg-gray-700 dark:shadow-none">
        <span className="text-shadow text-lg text-white">
          {t(question.label.string, question.label.params)}
        </span>
        {question.type === "NAME_OF_POKEMON_BY_IMAGE" && (
          <Image
            src={question.params.imgSrc}
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
            className="bg-primary-500 rounded-lg px-8 py-4 text-2xl shadow-lg shadow-gray-500 dark:shadow-none"
            onClick={() => onAnswerClicked(answer.value)}
          >
            {answer.label}
          </Button>
        ))}
      </div>
    </div>
  );
}
