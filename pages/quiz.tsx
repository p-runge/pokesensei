import FullLayout from "@/components/FullLayout";
import { trpc } from "@/utils/trpc";
import type { NextPage } from "next";
import { useState } from "react";

export enum QuestionType {
  TYPE_OF_POKEMON = "TYPE_OF_POKEMON",
}

const Quiz: NextPage = () => {
  const [query] = useState(
    trpc.useQuery([
      "get-question-by-type",
      {
        type: QuestionType.TYPE_OF_POKEMON,
      },
    ])
  );
  const { data } = query;

  return (
    <FullLayout>
      {!data ? (
        <div>Loading...</div>
      ) : (
        // wrapper
        <div className="flex flex-col w-[1200px] m-auto max-w-full">
          {/* question */}
          <div className="p-4 w-full bg-gray-700 rounded-lg">
            <span className="capitalize">{data.question}</span>
          </div>

          {/* answers */}
          <div className="grid grid-cols-2 mt-4 gap-4">
            {data.answers.map((answer) => (
              <button
                key={answer}
                type="button"
                className="p-4 w-full bg-primary rounded-lg"
              >
                <span className="capitalize">{answer}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </FullLayout>
  );
};

export default Quiz;
