import Image from "next/image";
import clsx from "clsx";
import { getTranslations } from "next-intl/server";

import type { QueryReturnType } from "@acme/api";

import { cn } from "~/server/utils/cn";

export default async function EvaluatedQuestion({
  question,
}: {
  question: QueryReturnType["quiz"]["evaluate"]["questions"][number];
}) {
  const t = await getTranslations();

  return (
    <div className="grid max-w-full gap-4">
      {/* question */}
      <div className="flex flex-col items-center justify-center rounded-lg bg-gray-500 p-4 shadow-lg shadow-gray-500 dark:bg-gray-700 dark:shadow-none">
        <span className="text-shadow text-lg text-white">
          {t(question.label.string, question.label.params)}
        </span>
        {question.type === "NAME_OF_POKEMON_BY_IMAGE" && (
          <Image
            src={question.params.imgSrc}
            alt=""
            width="192"
            height="192"
            className="rendering-pixelated"
            priority
          />
        )}
      </div>

      {/* answers */}
      <div className="grid grid-cols-2 gap-4">
        {question.answers.map((answer) => (
          <div
            key={answer.value}
            className={clsx(
              "text-shadow",
              cn(
                "rounded-lg border-8 px-6 py-2 text-center text-2xl text-white shadow-lg shadow-gray-500 dark:shadow-none",
                answer.isChosen ? "border-secondary-500" : "border-transparent",
                answer.isCorrect && "bg-success",
                !answer.isCorrect && answer.isChosen && "bg-error",
                !answer.isCorrect && !answer.isChosen && "bg-primary-500",
              ),
            )}
          >
            {answer.label}
          </div>
        ))}
      </div>
    </div>
  );
}
