import { QuestionWithAnswers } from "@/server/utils/question";
import { trpc } from "@/utils/trpc";
import { useTranslation } from "next-i18next";
import Image from "next/future/image";
import { useState } from "react";
import Button from "./Button";
import { EvaluatedQuestionData } from "./EvaluatedQuestion";
import Skeleton from "./Skeleton";

const initialState = {
  givenAnswer: undefined,
  correctAnswers: undefined,
};

const Question: React.FC<{
  data: QuestionWithAnswers;
  selectedTime?: number;
  validatedTime?: number;
  onAnswer: (evaluatedQuestion: EvaluatedQuestionData) => void;
}> = ({ data, onAnswer, selectedTime = 0, validatedTime = 0 }) => {
  const { t } = useTranslation();

  const [givenAnswer, updateGivenAnswer] = useState(
    initialState.givenAnswer as string | undefined
  );
  const [correctAnswers, updateCorrectAnswers] = useState(
    initialState.correctAnswers as string[] | undefined
  );

  const { mutate: mutateAnswer } = trpc.useMutation(["answer-question"], {
    onSuccess: (ca) => {
      updateCorrectAnswers(ca);
      if (givenAnswer) {
        setTimeout(() => {
          onAnswer({
            question: data,
            givenAnswer,
            correctAnswers: ca,
          });
          updateGivenAnswer(initialState.givenAnswer);
          updateCorrectAnswers(initialState.correctAnswers);
        }, validatedTime);
      }
    },
  });

  const onAnswerClicked = (answer: string) => {
    updateGivenAnswer(answer);

    setTimeout(() => {
      mutateAnswer({
        type: data.question.type,
        params: data.question.params,
      });
    }, selectedTime);
  };

  return (
    <div className="grid gap-4 m-auto max-w-full mb-12">
      {/* question */}
      <div className="h-[248px] flex flex-col justify-center items-center p-4 bg-gray-700 rounded-lg">
        <span>{t(data.question.label.string, data.question.label.params)}</span>
        {data.question.imgSrc && (
          <Image
            src={data.question.imgSrc}
            width="192"
            height="192"
            className="rendering-pixelated"
            priority
          />
        )}
      </div>

      {/* answers */}
      <div className="grid grid-cols-2 gap-4">
        {data.answers.map((answer, i) => (
          <Button
            key={`${answer}${i}`}
            disabled={!!(givenAnswer && givenAnswer !== answer.value)}
            className={`px-4 py-4 rounded-lg ${
              (givenAnswer === answer.value &&
                ((correctAnswers === undefined &&
                  "bg-secondary hover:bg-secondary-dark") ||
                  (correctAnswers?.includes(answer.value) &&
                    "bg-success hover:bg-success") ||
                  "bg-error hover:bg-error")) ||
              "bg-primary"
            }`}
            onClick={() => onAnswerClicked(answer.value)}
          >
            <Skeleton isLoading={!data} width="w-6/12">
              <span>{answer.label}</span>
            </Skeleton>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default Question;
