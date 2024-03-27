"use client";

import { signIn } from "next-auth/react";
import { useTranslations } from "next-intl";

const LoginButton = () => {
  const t = useTranslations();

  return (
    <button
      className="rounded-[3px] bg-[#5865F2] px-4 py-2 text-xs text-white hover:bg-[#515DDF] sm:text-[14px]"
      onClick={() => signIn("discord")}
    >
      {t("action_sign_in_discord")}
    </button>
  );
};

export default LoginButton;
