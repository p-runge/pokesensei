import { redirect } from "~/navigation";
import { getServerAuthSession } from "~/server/auth";

export default async function NeedsAuth({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerAuthSession();
  if (!session) {
    redirect("/");
  }

  return <>{children}</>;
}
