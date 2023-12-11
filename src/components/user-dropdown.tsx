"use client";

import { useState } from "react";
import { cn } from "~/server/utils/cn";
import Button from "./button";
import Link from "./link";
import Image from "next/image";
import { useSession } from "next-auth/react";

export default function Dropdown() {
  const [isOpen, setIsOpen] = useState(false);

  const session = useSession();

  return (
    <div className="relative inline-block text-left">
      <div>
        <Button
          type="button"
          className="inline-flex items-center gap-1"
          id="menu-button"
          aria-expanded="true"
          aria-haspopup="true"
          onClick={() => setIsOpen(!isOpen)}
        >
          <Image
            src={session.data?.user?.image ?? "/avatar.png"}
            alt=""
            width={20}
            height={20}
            className="rounded-full"
          />
          <svg
            className="-mr-1 h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fill-rule="evenodd"
              d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
              clip-rule="evenodd"
            />
          </svg>
        </Button>
      </div>

      <div
        className={cn(
          !isOpen ? "scale-95 opacity-0 ease-out" : "ease-in",
          "absolute right-0 z-10 mt-2 w-56 origin-top-right transform rounded-md bg-primary shadow-lg duration-100 focus:outline-none",
        )}
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="menu-button"
        tabIndex={-1}
      >
        <div className="py-1" role="none">
          {/* <!-- Active: "bg-gray-100 text-gray-900", Not Active: "text-gray-700" --> */}
          <Link
            href="#"
            variant="primary"
            className="block w-full rounded-none px-4 py-2 text-left text-sm"
            role="menuitem"
            tabIndex={-1}
          >
            Profile
          </Link>
          <Button
            className="block w-full rounded-none px-4 py-2 text-left text-sm"
            role="menuitem"
            tabIndex={-1}
          >
            Sign out
          </Button>
        </div>
      </div>
    </div>
  );
}
