"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { type Prisma } from "@prisma/client";
import Button from "~/components/button";
import { type api } from "~/trpc/server";
import { api as clientApi } from "~/trpc/react";

export default function Question({
  question,
  onAnswer,
}: {
  question: Prisma.PromiseReturnType<
    typeof api.quiz.getById.query
  >["questions"][number];
  onAnswer: (value: string) => void;
}) {
  const t = useTranslations();

  const { mutateAsync: answerQuestion } =
    clientApi.question.answer.useMutation();

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
      <div className="flex h-64 flex-col items-center justify-center rounded-lg bg-gray-700 p-4">
        <span className="text-lg">
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
            className="rounded-lg bg-primary p-4 text-2xl"
            onClick={() => onAnswerClicked(answer.value)}
          >
            {answer.label}
          </Button>
        ))}
      </div>
    </div>
  );
}
