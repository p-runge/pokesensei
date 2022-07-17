import { QuestionWithAnswers } from "@/server/utils/question";
import { useTranslation } from "next-i18next";
import Image from "next/future/image";
import Skeleton from "./Skeleton";

export enum QuestionType {
  TYPE_OF_POKEMON = "TYPE_OF_POKEMON",
  NAME_OF_POKEMON_BY_IMAGE = "NAME_OF_POKEMON_BY_IMAGE",
}

interface Props {
  data: QuestionWithAnswers | undefined;
}

const skeletonData: QuestionWithAnswers = {
  question: {
    string: "",
  },
  answers: ["", "", "", ""],
};

const Question: React.FC<Props> = ({ data }) => {
  const { t } = useTranslation("common");

  return (
    <div className="flex flex-col w-[1200px] m-auto max-w-full">
      {/* question */}
      <div className="flex flex-col justify-center items-center p-4 w-full bg-gray-700 rounded-lg">
        <Skeleton isLoading={!data} width="w-6/12">
          {data && (
            <>
              <span>{t(data.question.string, data.question.params)}</span>
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
      <div className="grid grid-cols-2 mt-4 gap-4">
        {(data || skeletonData).answers.map((answer, i) => (
          <button
            // eslint-disable-next-line react/no-array-index-key
            key={`${answer}${i}`}
            type="button"
            className="p-4 w-full bg-primary rounded-lg"
          >
            <Skeleton isLoading={!data} width="w-6/12">
              <span>{answer}</span>
            </Skeleton>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Question;
