"use client";

import Image from "next/image";

export default function DarkModeToggle() {
  return (
    <label className="flex cursor-pointer items-center gap-3">
      <span className="relative">
        <Image
          src="/images/electric.png"
          alt="light"
          width={20}
          height={20}
          className="absolute left-[2px] top-[2px] rounded-l-full bg-[#e5c600] p-1 font-medium text-white"
        />
        <Image
          src="/images/dark.png"
          alt="light"
          width={20}
          height={20}
          className="absolute right-[2px] top-[2px] rounded-r-full bg-[#463e3e] p-1 font-medium text-white"
        />
        <input
          type="checkbox"
          value=""
          defaultChecked
          className="peer sr-only"
        />
        <div className="peer h-6 w-11 rounded-full border-2 border-gray-400 outline-none after:absolute after:start-0 after:top-0 after:h-6 after:w-6 after:rounded-full after:bg-gray-300 after:ring-2 after:ring-gray-400 after:transition-all after:content-[''] peer-checked:after:translate-x-5"></div>
      </span>
    </label>
  );
}
