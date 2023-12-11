"use client";

import { type Session } from "next-auth";
import { createContext, useContext } from "react";

/**
 * Since we encrypt parts of our session data in the database, and since the
 * regular `SessionProvider` from `next-auth` does not provide the decrypted
 * session, we need to create our own provider and hook to access the decrypted
 * session on the client without leaking the regarding secret key.
 */
const DecryptedSessionContext = createContext<Session | null>(null);

export function DecryptedSessionProvider({
  session,
  children,
}: {
  session: Session | null;
  children: React.ReactNode;
}) {
  return (
    <DecryptedSessionContext.Provider value={session}>
      {children}
    </DecryptedSessionContext.Provider>
  );
}

export function useDecryptedSession() {
  return useContext(DecryptedSessionContext);
}
