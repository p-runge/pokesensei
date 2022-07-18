import { QuestionWithAnswers } from "@/server/utils/question";
import Link from "next/link";
import { useState } from "react";
import Question from "./Question";

const Quiz: React.FC<{ data: QuestionWithAnswers[] }> = ({ data }) => {
  const [activeQuestion, updateActiveQuestion] = useState(0);

  const [history, updateHistory] = useState([] as (boolean | undefined)[]);

  return (
    <div>
      {/* progress bar */}
      <p className="mb-2">
        {(activeQuestion >= data.length && "Finished!") ||
          `Question ${activeQuestion + 1} / ${data.length}`}
      </p>
      <div className="flex h-4 rounded-lg">
        {/* segment */}
        {[...Array(data.length)].map((_, i) => (
          <div
            key={`progress-bar-segment-${i}`}
            className={`flex-grow border-r-2 last:border-r-0 first:rounded-l-lg last:rounded-r-lg border-gray-800 ${
              (history[i] !== undefined &&
                ((history[i] && "bg-success") || "bg-error")) ||
              "bg-gray-400"
            }`}
          />
        ))}
      </div>

      <div className="pb-6" />

      {(data[activeQuestion] && (
        <Question
          data={data[activeQuestion]}
          onAnswer={(answer, isCorrect) => {
            updateHistory(history.concat(isCorrect));
            updateActiveQuestion(activeQuestion + 1);
          }}
        />
      )) || (
        <>
          <p>{`You answered ${history.filter((item) => item).length} out of ${
            data.length
          } questions correctly.`}</p>
          <p>{`That's an accuracy of ${Math.round(
            (100 / data.length) * history.filter((item) => item).length
          )}%`}</p>

          <div className="pb-6" />

          <Link href="/" passHref>
            <a className="btn-primary">Home</a>
          </Link>
        </>
      )}
    </div>
  );
};

export default Quiz;
