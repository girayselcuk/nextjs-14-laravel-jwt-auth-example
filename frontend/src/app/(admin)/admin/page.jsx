import { useAuth } from "@/hooks/useAuth";
import React from "react";

export default async function Page() {
	const { name, surname } = await useAuth.fromServer();

	return <div>Welcome, {name + " " + surname} 👋</div>;
}
