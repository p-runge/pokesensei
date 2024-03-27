import MainLayout from "~/components/main-layout";
import Content from "./_components/content";

//! This page is only used to create a quiz and redirect to the new quiz's play page.
export default async function Page() {
  return (
    <MainLayout center fullScreen>
      <Content />
    </MainLayout>
  );
}
