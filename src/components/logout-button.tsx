"use client";

import { signOut } from "next-auth/react";
import Button from "./button";
import { useTranslations } from "next-intl";

const LogoutButton = () => {
  const t = useTranslations();

  return <Button onClick={() => signOut()}>{t("action_sign_out")}</Button>;
};

export default LogoutButton;
