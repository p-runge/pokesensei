import { QuestionWithAnswers } from "@/server/utils/question";
import { useTranslation } from "next-i18next";
import Image from "next/future/image";

export interface EvaluatedQuestionData {
  question: QuestionWithAnswers;
  givenAnswer: string;
  correctAnswers: string[];
}

const Question: React.FC<{
  data: EvaluatedQuestionData;
}> = ({ data: { question, givenAnswer, correctAnswers } }) => {
  const { t } = useTranslation();

  return (
    <div className="grid gap-4 m-auto max-w-full mb-12">
      {/* question */}
      <div className="flex flex-col justify-center items-center p-4 bg-gray-700 rounded-lg">
        <span>
          {t(question.question.label.string, question.question.label.params)}
        </span>
        {question.question.imgSrc && (
          <Image
            src={question.question.imgSrc}
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
          <div
            key={`${answer}${i}`}
            className={`btn cursor-default border-4 border-transparent p-3 rounded-lg ${
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
};

export default Question;
