"use client";

import {
	Box,
	Button,
	Group,
	PasswordInput,
	Stack,
	Text,
	TextInput,
	Title,
} from "@mantine/core";
import React from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerFormValidation } from "@/validations/auth/registerFormValidation";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
export default function RegisterForm() {
	const router = useRouter();
	// React Hook Form
	const {
		handleSubmit,
		register,
		formState: { errors },
		reset,
	} = useForm({
		resolver: yupResolver(registerFormValidation),
	});

	// Request

	const registerRequest = async (data) => {
		const response = await fetch(
			process.env.NEXT_PUBLIC_FRONTEND_URL + "/api/auth/register",
			{
				method: "POST",
				body: JSON.stringify(data),
			}
		);

		return await response.json();
	};

	// React Query

	const { isPending, mutateAsync } = useMutation({
		mutationFn: registerRequest,
	});

	// HandleSubmit

	const submit = async (data) => {
		const { status, message, user } = await mutateAsync(data);
		if (status) {
			toast.success(message + " " + user.name, {
				onClose: () => router.push("/login"),
			});
			reset();
		} else {
			toast.error(message);
		}
	};

	return (
		<Box
			onSubmit={handleSubmit(submit)}
			component="form"
			w={370}
		>
			<Stack gap="lg">
				<Stack
					gap="xs"
					ta="center"
				>
					<Title
						order={3}
						fw={600}
					>
						Register
					</Title>
					<Text
						size="sm"
						c="gray"
					>
						Please enter your details to register
					</Text>
				</Stack>
				<Stack>
					<Group grow>
						<TextInput
							{...register("name")}
							label="Name"
							placeholder="Name"
							error={errors.name?.message}
						/>
						<TextInput
							{...register("surname")}
							label="Surname"
							placeholder="Surname"
							error={errors.surname?.message}
						/>
					</Group>
					<TextInput
						{...register("email")}
						label="Email Adresi"
						placeholder="hello@example.com"
						type="email"
						error={errors.email?.message}
					/>
					<PasswordInput
						{...register("password")}
						label="Password"
						placeholder="Password"
						error={errors.password?.message}
					/>

					<Button
						color="dark"
						type="submit"
						loading={isPending}
					>
						Register
					</Button>
					<Text
						size="sm"
						c="gray"
						ta="center"
					>
						Do you have an account?{" "}
						<Link href="/login">
							<strong>Login</strong>
						</Link>
					</Text>
				</Stack>
			</Stack>
		</Box>
	);
}
