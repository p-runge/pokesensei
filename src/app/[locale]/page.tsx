import Image from "next/image";
import Link from "~/components/link";
import { getTranslations } from "next-intl/server";
import MainLayout from "~/components/main-layout";

export default async function Page() {
  const t = await getTranslations();

  return (
    <MainLayout center>
      <div className="flex flex-col items-center justify-center gap-6">
        {/* add margin to have space for overlapping beta badge */}
        <h1 className="relative mx-6">
          <Image
            src="/logo-150h.png"
            width={594}
            height={150}
            alt="PokéSensei"
            priority
          />
          <span className="absolute -right-6 bottom-0 -rotate-12 rounded-full border-4 border-red-500 bg-gray-100 px-3 text-3xl text-red-500 dark:bg-gray-700">
            Beta
          </span>
        </h1>
        <p className="text-center text-xl">{t("page_home_copy")}</p>
        <Link href="/play" variant="primary" className="text-2xl">
          {t("page_home_quick_start_button")}
        </Link>
        <Link href="/setup">{t("page_home_custom_game_button")}</Link>
      </div>
    </MainLayout>
  );
}
