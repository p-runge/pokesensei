import { type Prisma } from "@prisma/client";
import clsx from "clsx";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { cn } from "~/server/utils/cn";
import { type api } from "~/trpc/server";

export default function EvaluatedQuestion({
  question,
}: {
  question: Prisma.PromiseReturnType<
    typeof api.quiz.evaluate.query
  >["questions"][number];
}) {
  const t = useTranslations();

  return (
    <div className="grid max-w-full gap-4">
      {/* question */}
      <div className="flex flex-col items-center justify-center rounded-lg bg-gray-700 p-4">
        <span className="text-xl">
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
                "rounded-lg border-4 p-4 text-center text-2xl",
                answer.isChosen ? "border-secondary" : "border-transparent",
                answer.isCorrect && "bg-success",
                !answer.isCorrect && answer.isChosen && "bg-error",
                !answer.isCorrect && !answer.isChosen && "bg-primary",
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
