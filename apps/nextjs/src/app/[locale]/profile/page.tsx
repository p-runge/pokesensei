import Image from "next/image";
import { redirect } from "next/navigation";
import { getTranslations } from "next-intl/server";

import { auth } from "@acme/auth";
import { db } from "@acme/db";

import MainLayout from "~/components/main-layout";
import NeedsAuth from "~/components/needs-auth";
import QuizHistoryList from "./_components/quiz-history-list";

export default async function ProfilePage() {
  const t = await getTranslations();

  const session = await auth();
  if (!session) {
    return redirect("/");
  }
  const user = session.user;

  const accounts = await db.account.findMany({
    where: {
      userId: user.id,
    },
  });
  const providers = accounts.map((account) => account.provider);

  return (
    <NeedsAuth>
      <MainLayout>
        {/* meta infos about user */}
        <div className="mb-6">
          <span className="mb-2 flex items-center gap-2">
            {/* user image */}
            {user.image && (
              <Image
                src={user.image}
                alt="user profile image"
                width={48}
                height={48}
                className="rounded-full"
              />
            )}
            <h1 className="text-6xl">
              {t("page_profile_title", {
                username: user.name,
              })}
            </h1>
          </span>
          <div className="flex gap-16">
            <div className="flex flex-col">
              <span className="text-sm font-light italic text-gray-400">
                {t("user_providers")}:
              </span>
              <span className="text-lg capitalize">{providers.join(", ")}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-light italic text-gray-400">
                {t("user_email")}:
              </span>
              <span className="text-lg">{user.email}</span>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-4 text-center">
          {/* placeholder col */}
          <div />
          <div className="col-span-2">
            <QuizHistoryList />
          </div>
        </div>
      </MainLayout>
    </NeedsAuth>
  );
}
