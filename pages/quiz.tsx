import FullLayout from "@/components/FullLayout";
import { QuestionType } from "@/server/router";
import { trpc } from "@/utils/trpc";
import type { NextPage } from "next";

const Quiz: NextPage = () => {
  const { data } = trpc.useQuery([
    "get-question-by-type",
    {
      type: "TYPE_OF_POKEMON" as QuestionType,
    },
  ]);

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
