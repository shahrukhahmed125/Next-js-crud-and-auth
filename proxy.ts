import { auth } from "./auth";

export async function proxy(request: Request) {
  return await auth(request as never);
}

export const config = {
  matcher: ["/products/:path*"],
};
