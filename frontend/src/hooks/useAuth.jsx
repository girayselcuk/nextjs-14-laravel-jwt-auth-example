import React from "react";

const getUser = async () => {
	const cookies = require("next/headers").cookies;
	const { value: token } = cookies().get("token") ?? { value: null };
	const response = await fetch(process.env.API_URL + "/me", {
		method: "GET",
		headers: {
			Accept: "application/json",
			Authorization: `Bearer ${token}`,
		},
	});

	const result = await response.json();
	return result;
};

// server side

const fromServer = async () => {
	const userData = await getUser();
	return userData;
};

// client

export function useAuth() {
	const [user, setUser] = React.useState({});

	const getUserData = async () => {
		const userData = await getUser();
		setUser(userData);
	};

	React.useEffect(() => {
		getUserData();
	}, []);

	return user;
}

useAuth.fromServer = fromServer;
