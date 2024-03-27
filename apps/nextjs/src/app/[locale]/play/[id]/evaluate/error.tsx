"use client";

import { useTranslations } from "next-intl";

export default function Loading() {
  const t = useTranslations();

  return (
    <div className="flex grow items-center justify-center">
      <p className="text-2xl">{t("error_no_data")}</p>
    </div>
  );
}
