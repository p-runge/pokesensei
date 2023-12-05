import { useLocale } from "next-intl";
import Image from "next/image";
import { LOCALES } from "~/i18n";
import { cn } from "~/server/utils/cn";
import Link from "./link";

const LocaleSelect = () => {
  const activeLocale = useLocale();

  return (
    <div className="grid grid-flow-col grid-rows-1 gap-2">
      {LOCALES.map((locale) => (
        <Link
          href="/"
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
