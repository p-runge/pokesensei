import { auth } from "@acme/auth";

export const runtime = "edge";

const handler = auth();
export { handler as GET, handler as POST };
