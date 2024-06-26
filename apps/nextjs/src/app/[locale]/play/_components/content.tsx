"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { QuestionType } from "@prisma/client";
import { useLocale } from "next-intl";

import Loader from "~/components/loader";
import { useRouter } from "~/navigation";
import { POKEMON_BY_GEN } from "~/server/utils/pokemon";
import { api } from "~/trpc/react";

export default function Content() {
  const locale = useLocale();
  const router = useRouter();
  const searchParams = useSearchParams();

  const { data: id } = api.quiz.create.useQuery({
    questions: 5,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    language: locale as any,
    filters: {
      generations: searchParams
        .getAll("generations")
        .map((v) => parseInt(v))
        .filter((v) => {
          return !isNaN(v) && v >= 1 && v <= POKEMON_BY_GEN.length;
        }),
      questionTypes: searchParams.getAll("questionTypes").filter((v) => {
        return Object.values(QuestionType).includes(v as QuestionType);
      }) as QuestionType[],
    },
  });

  useEffect(() => {
    if (id) {
      router.replace(`/play/${id}`);
    }
  }, [id, router]);

  return (
    <div className="flex grow items-center justify-center">
      <Loader />
    </div>
  );
}
