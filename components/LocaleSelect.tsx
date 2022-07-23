import { useRouter } from "next/router";
import Link from "next/link";
import { Locale } from "@/utils/i18n";
import Image from "next/future/image";

const LocaleSelect = () => {
  const { locale } = useRouter();

  return (
    <div className="grid grid-rows-1 grid-flow-col gap-2">
      {Object.values(Locale).map((l) => (
        <Link key={`locale-${l}`} href="" passHref locale={l}>
          <a
            className={`border-2 ${
              l === locale ? "border-white" : "border-transparent"
            }`}
          >
            <Image src={`/flags/${l}.svg`} width={30} height={20} />
          </a>
        </Link>
      ))}
    </div>
  );
};

export default LocaleSelect;
