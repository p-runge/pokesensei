import IntlProvider from "~/components/intl-provider";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <IntlProvider>{children}</IntlProvider>;
}
