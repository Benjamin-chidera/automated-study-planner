import 'server-only'

import { cookies } from "next/headers";
import { decrypt } from "./session";

export const getAuthUser = async () => {
  const cookieStore = await cookies();
  const session = cookieStore.get("session")?.value;

  if (session) {
    const user = await decrypt(session);
    return user;
  }
};
