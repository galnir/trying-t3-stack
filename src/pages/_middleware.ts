import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import { nanoid } from "nanoid";

export function middleware(req: NextRequest, event: NextFetchEvent) {
  if (req.cookies.get("poll-cookie")) return;

  const random = nanoid();

  const res = NextResponse.next();
  res.cookies.set("poll-cookie", random, { sameSite: "strict" });

  return res;
}
