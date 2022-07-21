import { QuestionWithAnswers } from "@/server/utils/question";
import { useTranslation } from "next-i18next";
import { useEffect, useState } from "react";
import { EvaluatedQuestionData } from "./EvaluatedQuestion";
import Question from "./Question";

const Quiz: React.FC<{
  data: QuestionWithAnswers[];
  onFinish: (evaluatedQuestions: EvaluatedQuestionData[]) => void;
}> = ({ data, onFinish }) => {
  const { t } = useTranslation();

  const [activeQuestion, updateActiveQuestion] = useState(0);
  const [history, updateHistory] = useState([...Array(data.length)] as (
    | EvaluatedQuestionData
    | undefined
  )[]);

  useEffect(() => {
    if (activeQuestion >= data.length) {
      onFinish(history as EvaluatedQuestionData[]);
    }
  }, [activeQuestion, data.length, onFinish, history]);

  return (
    <div>
      {/* progress bar */}
      <p className="mb-2">
        {(activeQuestion >= data.length && t("quiz_finished")) ||
          t("quiz_question_counter", {
            current: activeQuestion + 1,
            max: data.length,
          })}
      </p>
      <div className="flex h-4 rounded-lg">
        {/* segment */}
        {history.map((item, i) => (
          <div
            key={`progress-bar-segment-${i}`}
            className={`flex-grow border-r-2 last:border-r-0 first:rounded-l-lg last:rounded-r-lg border-gray-800 ${
              (item === undefined && "bg-gray-400") ||
              (item &&
                item.correctAnswers.includes(item.givenAnswer) &&
                "bg-success") ||
              "bg-error"
            }`}
          />
        ))}
      </div>

      <div className="pb-6" />

      {data[activeQuestion] && (
        <Question
          data={data[activeQuestion]}
          onAnswer={(evaluatedQuestion) => {
            const newHistory = history;
            newHistory[activeQuestion] = evaluatedQuestion;
            updateHistory(newHistory);
            updateActiveQuestion(activeQuestion + 1);
          }}
        />
      )}
    </div>
  );
};

export default Quiz;
