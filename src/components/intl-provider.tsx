"use client";

import {
  type AbstractIntlMessages,
  NextIntlClientProvider,
  useLocale,
} from "next-intl";
import { useEffect, useState } from "react";
import i18n from "~/i18n";

export default function IntlProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = useLocale();

  const [messages, setMessages] = useState({} as AbstractIntlMessages);
  useEffect(() => {
    void (async function () {
      const { messages } = await i18n({ locale });
      if (!messages) throw new Error("no messages");

      setMessages(messages);
    })();
  }, [locale]);

  if (Object.values(messages).length === 0) {
    return null;
  }

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}
