"use client";

import { api } from "~/trpc/react";
import { useLocale } from "next-intl";
import type { LanguageIso } from "~/server/utils/api";
import { useEffect } from "react";
import { useRouter } from "~/navigation";
import Loader from "~/components/loader";

//! This page is only used to create a quiz and redirect to the new quiz's play page.
export default function Page() {
  const locale = useLocale();
  const router = useRouter();

  const { data: id } = api.quiz.create.useQuery({
    questions: 5,
    language: locale as LanguageIso,
  });

  useEffect(() => {
    if (id) {
      router.push(`/play/${id}`);
    }
  }, [id]);

  return (
    <div className="flex grow items-center justify-center">
      <Loader />
    </div>
  );
}
