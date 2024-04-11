import { useTranslations } from "next-intl";

import { signIn } from "@acme/auth";

const LoginButton = () => {
  const t = useTranslations();

  return (
    <form>
      <button
        className="rounded-[3px] bg-[#5865F2] px-4 py-2 text-xs text-white hover:bg-[#515DDF] sm:text-[14px]"
        formAction={async () => {
          "use server";
          console.log("before signin");
          await signIn("discord");
          console.log("after signin");
        }}
      >
        {t("action_sign_in_discord")}
      </button>
    </form>
  );
};

export default LoginButton;
