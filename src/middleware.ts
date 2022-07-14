import { nanoid } from "nanoid";
// eslint-disable-next-line @next/next/no-server-import-in-page
import { NextResponse, type NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  if (req.cookies.get("poll-cookie")) return;
  const response = NextResponse.next();

  const random = nanoid();

  response.cookies.set("poll-cookie", random, { sameSite: "strict" });
  return response;
}
