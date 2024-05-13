import Image from "next/image";
import { redirect } from "next/navigation";
import { getFormatter, getLocale, getTranslations } from "next-intl/server";

import type { QuestionType, User } from "@acme/db";
import { auth } from "@acme/auth";
import { db } from "@acme/db";

import BlurredText from "~/components/blurred-text";
import MainLayout from "~/components/main-layout";
import NeedsAuth from "~/components/needs-auth";
import { decrypt } from "~/server/utils/crypto";
import QuizHistoryList from "./_components/quiz-history-list";

export default async function ProfilePage() {
  const t = await getTranslations();

  const locale = await getLocale();
  const { number } = await getFormatter();

  const session = await auth();
  if (!session) {
    return redirect("/");
  }
  const userId = session.user.id;

  const encryptedUser = await db.user.findUniqueOrThrow({
    where: {
      id: userId,
    },
  });

  const user: User = {
    ...encryptedUser,
    name: encryptedUser.name && decrypt(encryptedUser.name),
    email: encryptedUser.email && decrypt(encryptedUser.email),
    image: encryptedUser.image && decrypt(encryptedUser.image),
  };

  const accounts = await db.account.findMany({
    where: {
      userId: user.id,
    },
  });
  const providers = accounts.map((account) => account.provider);

  // find the question type that the user answered the most
  const allQuestionsAnswered = await db.question.findMany({
    where: {
      answers: {
        some: {
          isChosen: true,
        },
      },
      quiz: {
        userId,
      },
    },
    select: {
      type: true,
    },
  });

  const typeAmounts = allQuestionsAnswered.reduce(
    (acc, question) => {
      // increment the amount of the question type
      acc[question.type] = (acc[question.type] ?? 0) + 1;
      return acc;
    },
    {} as Record<QuestionType, number>,
  );

  const typeWithHighestAmount = Object.entries(typeAmounts).reduce(
    (acc, [type, amount]) => {
      if (amount > acc.amount) {
        return { type, amount };
      }
      return acc;
    },
    { type: "", amount: 0 },
  ).type as QuestionType | "";

  return (
    <NeedsAuth>
      <MainLayout>
        <div className="grid grid-cols-1 gap-8">
          {/* meta infos about user */}
          <section>
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
              <Detail label={t("user_created_at")}>
                {user.createdAt.toLocaleDateString(locale, {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </Detail>
              <Detail label={t("user_providers")}>
                {/* capitalize */}
                {providers
                  .map(
                    (provider) =>
                      provider.charAt(0).toUpperCase() + provider.slice(1),
                  )
                  .join(", ")}
              </Detail>
              <Detail label={t("user_email")}>
                <BlurredText text={user.email ?? ""} />
              </Detail>
            </div>
          </section>

          {/* stats and co */}
          <section>
            <h2 className="mb-3 text-3xl">{t("page_profile_section_stats")}</h2>

            {/* general stats */}
            <div className="mb-3 flex gap-16">
              <Detail label={t("page_profile_stats_total_questions_answered")}>
                {number(allQuestionsAnswered.length)}
              </Detail>
              {typeWithHighestAmount && (
                <Detail label={t("page_profile_stats_favorite_question_type")}>
                  {`${t(`question_type_${typeWithHighestAmount.toLowerCase()}`)} (${number(typeAmounts[typeWithHighestAmount])})`}
                </Detail>
              )}
            </div>

            {/* more detailed stats */}
            <div className="grid grid-cols-4 gap-3 text-center">
              <div className="col-span-2">
                <QuizHistoryList />
              </div>
            </div>
          </section>
        </div>
      </MainLayout>
    </NeedsAuth>
  );
}

function Detail({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col">
      <span className="text-sm font-light italic text-gray-400">{label}:</span>
      <span className="text-lg">{children}</span>
    </div>
  );
}
