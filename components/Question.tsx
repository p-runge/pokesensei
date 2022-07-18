import { QuestionType, QuestionWithAnswers } from "@/server/utils/question";
import { trpc } from "@/utils/trpc";
import { useTranslation } from "next-i18next";
import Image from "next/future/image";
import { useState } from "react";
import Button from "./Button";
import Skeleton from "./Skeleton";

const initialState = {
  selectedAnswer: undefined,
  answerData: undefined,
};

const Question: React.FC<{
  data: QuestionWithAnswers | undefined;
  selectedTime?: number;
  validatedTime?: number;
  onAnswer: (answer: string, isCorrect: boolean) => void;
}> = ({ data, onAnswer, selectedTime = 0, validatedTime = 0 }) => {
  const { t } = useTranslation("common");

  const [selectedAnswer, changeSelectedAnswer] = useState(
    initialState.selectedAnswer as string | undefined
  );
  const [answerData, updateAnswerData] = useState(
    initialState.answerData as boolean | undefined
  );

  const { mutate: mutateAnswer } = trpc.useMutation(["answer-question"], {
    onSuccess: (isCorrect) => {
      updateAnswerData(isCorrect);
      if (selectedAnswer) {
        setTimeout(() => {
          onAnswer(selectedAnswer, isCorrect);
          changeSelectedAnswer(initialState.selectedAnswer);
          updateAnswerData(initialState.answerData);
        }, validatedTime);
      }
    },
  });

  const onAnswerClicked = (answer: string) => {
    changeSelectedAnswer(answer);

    if (data) {
      setTimeout(() => {
        mutateAnswer({
          type: data.question.type,
          additionalData: data.question.additionalData,
          answer,
        });
      }, selectedTime);
    }
  };

  return (
    <div className="grid gap-4 m-auto max-w-full mb-12">
      {/* question */}
      <div className="flex flex-col justify-center items-center p-4 bg-gray-700 rounded-lg">
        <Skeleton isLoading={!data} width="w-6/12">
          {data && (
            <>
              <span>
                {t(data.question.label.string, data.question.label.params)}
              </span>
              {data.question.imgSrc && (
                <Image
                  src={data.question.imgSrc}
                  width="192"
                  height="192"
                  className="rendering-pixelated"
                  priority
                />
              )}
            </>
          )}
        </Skeleton>
      </div>

      {/* answers */}
      <div className="grid grid-cols-2 gap-4">
        {(data || skeletonData).answers.map((answer, i) => (
          <Button
            // eslint-disable-next-line react/no-array-index-key
            key={`${answer}${i}`}
            disabled={!!(selectedAnswer && selectedAnswer !== answer.value)}
            className={`px-4 py-4 w-full rounded-lg ${
              (selectedAnswer === answer.value &&
                ((answerData === undefined &&
                  "bg-secondary hover:bg-secondary-dark") ||
                  (answerData === true && "bg-success hover:bg-success") ||
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

const skeletonData: QuestionWithAnswers = {
  question: {
    type: Object.values(QuestionType)[0],
    additionalData: {
      id: 0,
    },
    label: {
      string: "",
    },
  },
  answers: [
    {
      value: "",
      label: "",
    },
    {
      value: "",
      label: "",
    },
    {
      value: "",
      label: "",
    },
    {
      value: "",
      label: "",
    },
  ],
};
