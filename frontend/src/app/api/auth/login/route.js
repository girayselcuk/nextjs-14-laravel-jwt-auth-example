import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request) {
	const cookieStore = cookies();
	const data = await request.json();

	const response = await fetch(process.env.API_URL + "/login", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	});

	const result = await response.json();

	if (result.status) {
		cookieStore.set("token", result.token, {
			path: "/",
			expires: new Date(Date.now() + result.expires_in * 1000),
		});
	}

	const { status, message } = result;

	return NextResponse.json({ status, message });
}
