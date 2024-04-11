import { auth } from "@acme/auth";

import { redirect } from "~/navigation";

export default async function NeedsAuth({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session) {
    redirect("/");
  }

  return <>{children}</>;
}
