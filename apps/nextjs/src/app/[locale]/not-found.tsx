import { useTranslations } from "next-intl";

import MainLayout from "~/components/main-layout";

export default function NotFoundPage() {
  const t = useTranslations();
  return (
    <MainLayout>
      <h1 className="mb-2 text-3xl font-bold">{t("page_not_found_title")}</h1>
      <p className="">{t("page_not_found_copy")}</p>
    </MainLayout>
  );
}
