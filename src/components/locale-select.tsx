"use client";

import { useLocale } from "next-intl";
import Image from "next/image";
import { LOCALES } from "~/i18n";
import { cn } from "~/server/utils/cn";
import Link from "./link";
import { usePathname } from "~/navigation";

const LocaleSelect = () => {
  const activeLocale = useLocale();
  const pathname = usePathname();

  return (
    <div className="grid grid-flow-col grid-rows-1 gap-2">
      {LOCALES.map((locale) => (
        <Link
          key={locale}
          href={pathname}
          locale={locale}
          className={cn(
            "border-2",
            locale === activeLocale ? "border-white" : "border-transparent",
          )}
        >
          <Image
            src={`/flags/${locale}.svg`}
            alt={locale}
            width={30}
            height={20}
          />
        </Link>
      ))}
    </div>
  );
};

export default LocaleSelect;
