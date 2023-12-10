import { NextIntlClientProvider, useLocale } from "next-intl";
import i18n from "~/i18n";

export default async function IntlProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = useLocale();

  const { messages } = await i18n({ locale });

  if (!messages || Object.values(messages).length === 0) {
    return null;
  }

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}
