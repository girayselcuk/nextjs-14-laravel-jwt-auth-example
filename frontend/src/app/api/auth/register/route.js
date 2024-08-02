import { NextResponse } from "next/server";

export async function POST(request) {
	const data = await request.json();

	try {
		const response = await fetch(process.env.API_URL + "/register", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		});

		const result = await response.json();

		return NextResponse.json(result);
	} catch (error) {
		return new Response("Beklenmeyen bir sunucu hatası meydana geldi.", {
			status: 500,
		});
	}
}
