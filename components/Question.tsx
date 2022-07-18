import { QuestionType, QuestionWithAnswers } from "@/server/utils/question";
import { trpc } from "@/utils/trpc";
import { useTranslation } from "next-i18next";
import Image from "next/future/image";
import { useState } from "react";
import Button from "./Button";
import Skeleton from "./Skeleton";

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

const Question: React.FC<{
  data: QuestionWithAnswers | undefined;
}> = ({ data }) => {
  const { t } = useTranslation("common");

  const {
    data: answerData,
    isLoading: answerIsLoading,
    mutate: mutateAnswer,
  } = trpc.useMutation(["answer-question"]);

  const [selectedAnswer, changeSelectedAnswer] = useState(
    undefined as string | undefined
  );

  const validationTime = 500;

  const selectAnswer = (answer: string) => {
    changeSelectedAnswer(answer);

    if (data) {
      setTimeout(() => {
        mutateAnswer({
          type: data.question.type,
          additionalData: data.question.additionalData,
          answer,
        });
      }, validationTime);
    }
  };

  return (
    <div className="grid gap-4 w-[1200px] m-auto max-w-full mb-12">
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
                ((!answerIsLoading &&
                  answerData === undefined &&
                  "bg-secondary hover:bg-secondary-dark") ||
                  (answerData === true && "bg-green-600 hover:bg-green-600") ||
                  "bg-red-600 hover:bg-red-600")) ||
              "bg-primary"
            }`}
            onClick={() => selectAnswer(answer.value)}
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
