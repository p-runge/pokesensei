"use client";

import { api } from "~/trpc/react";
import { useLocale } from "next-intl";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { QuestionType } from "@prisma/client";
import type { LanguageIso } from "~/server/utils/api";
import { useRouter } from "~/navigation";
import Loader from "~/components/loader";
import { POKEMON_BY_GEN } from "~/server/utils/pokemon";

//! This page is only used to create a quiz and redirect to the new quiz's play page.
export default function Page() {
  const locale = useLocale();
  const router = useRouter();
  const searchParams = useSearchParams();

  const { data: id } = api.quiz.create.useQuery({
    questions: 5,
    language: locale as LanguageIso,
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
  }, [id]);

  return (
    <div className="flex grow items-center justify-center">
      <Loader />
    </div>
  );
}
