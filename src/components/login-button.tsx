"use client";

import { signIn } from "next-auth/react";

const LoginButton = () => {
  return (
    <button
      className="rounded-[3px] bg-[#5865F2] px-4 py-2 text-[14px] text-white hover:bg-[#515DDF]"
      onClick={() => signIn("discord")}
    >
      Sign in with Discord
    </button>
  );
};

export default LoginButton;
