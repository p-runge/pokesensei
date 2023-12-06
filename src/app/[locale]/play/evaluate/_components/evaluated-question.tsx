import { useTranslations } from "next-intl";
import Image from "next/image";
import type { QuestionWithAnswers } from "~/server/utils/question";

export interface EvaluatedQuestionData {
  question: QuestionWithAnswers;
  givenAnswer: string;
  correctAnswers: string[];
}

export default function EvaluatedQuestion({
  data: { question, givenAnswer, correctAnswers },
}: {
  data: EvaluatedQuestionData;
}) {
  const t = useTranslations();

  return (
    <div className="m-auto mb-12 grid max-w-full gap-4">
      {/* question */}
      <div className="flex flex-col items-center justify-center rounded-lg bg-gray-700 p-4">
        <span>
          {t(question.question.label.string, question.question.label.params)}
        </span>
        {question.question.type === "NAME_OF_POKEMON_BY_IMAGE" && (
          <Image
            src={question.question.params.imgSrc}
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
            className={`btn cursor-default rounded-lg border-4 border-transparent p-3 ${
              (correctAnswers.includes(answer.value) && "bg-success") ||
              (!correctAnswers.includes(answer.value) &&
                answer.value === givenAnswer &&
                "bg-error") ||
              "bg-primary"
            } ${
              answer.value === givenAnswer ? "border-4 border-secondary" : ""
            }`}
          >
            <span>{answer.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
