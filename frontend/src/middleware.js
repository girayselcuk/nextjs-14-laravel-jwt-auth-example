import { NextResponse } from "next/server";
import { isAuthPages } from "./helpers/auth";

export function middleware(request) {
	const { url, nextUrl, cookies } = request;

	const { value: token } = cookies.get("token") ?? { value: null };

	const isAuthPageRequested = isAuthPages(nextUrl.pathname);

	if (isAuthPageRequested) {
		if (!token) {
			return NextResponse.next();
		} else {
			return NextResponse.redirect(new URL(`/`, url));
		}
	}

	if (!token) {
		return NextResponse.redirect(new URL(`/login`, url));
	} else {
		return NextResponse.next();
	}
}

export const config = {
	matcher: ["/admin/:path*", "/login", "/register"],
};
