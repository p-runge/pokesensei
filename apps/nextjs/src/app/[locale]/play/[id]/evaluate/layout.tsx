import IntlProvider from "~/components/intl-provider";
import MainLayout from "~/components/main-layout";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <IntlProvider>
      <MainLayout>{children}</MainLayout>
    </IntlProvider>
  );
}
