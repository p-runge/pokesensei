"use client";

import { useState } from "react";
import Image from "next/image";
import { signOut } from "next-auth/react";
import { useTranslations } from "next-intl";
import { useClickOutside } from "@mantine/hooks";
import { cn } from "~/server/utils/cn";
import Button from "./button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { useDecryptedSession } from "./decrypted-session-provider";
import Link from "./link";

export default function Dropdown() {
  const t = useTranslations();
  const [isOpen, setIsOpen] = useState(false);

  const session = useDecryptedSession();

  const [button, setButton] = useState<HTMLButtonElement | null>(null);

  useClickOutside(() => isOpen && setIsOpen(false), undefined, [button]);

  return (
    <div className="relative inline-block text-left">
      <div>
        <Button
          ref={setButton}
          type="button"
          className="inline-flex items-center gap-2"
          aria-expanded="true"
          aria-haspopup="true"
          onClick={() => setIsOpen(!isOpen)}
        >
          {session?.user && (
            <>
              <Image
                src={session.user.image ?? ""}
                alt=""
                width={24}
                height={24}
                className="rounded-full"
                priority
              />
              <span className="hidden sm:inline-block">
                {session.user.name}
              </span>
            </>
          )}
          <svg
            className="-mx-1 h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </Button>
      </div>

      {/* overlay */}
      <div
        className={cn(
          !isOpen ? "scale-95 opacity-0 ease-out" : "ease-in",
          "absolute right-0 z-10 mt-2 origin-top-right transform rounded bg-gray-700 shadow-lg ring-1 ring-gray-500 duration-100 focus:outline-none",
        )}
        role="menu"
        aria-orientation="vertical"
        tabIndex={-1}
      >
        <div className="py-1" role="none">
          <Link
            href="/profile"
            className="block w-full whitespace-nowrap rounded-none bg-gray-700 px-4 py-2 text-left text-sm text-white hover:bg-gray-800 hover:no-underline"
            role="menuitem"
            tabIndex={-1}
          >
            Profile
          </Link>
          <button
            type="button"
            className="block w-full whitespace-nowrap rounded-none bg-gray-700 px-4 py-2 text-left text-sm text-white hover:bg-gray-800"
            role="menuitem"
            tabIndex={-1}
            onClick={() => signOut()}
          >
            {t("action_sign_out")}
            <FontAwesomeIcon icon={faRightFromBracket} className="ml-3" />
          </button>
        </div>
      </div>
    </div>
  );
}
