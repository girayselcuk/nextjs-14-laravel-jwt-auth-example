"use client";
import {
	Box,
	Button,
	Checkbox,
	Group,
	PasswordInput,
	Stack,
	Text,
	TextInput,
	Title,
} from "@mantine/core";
import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginFormValidation } from "@/validations/auth/loginFormValidation";
import Link from "next/link";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
export default function LoginForm() {
	const router = useRouter();

	// React Hook Form

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(loginFormValidation),
	});

	// Request

	const loginRequest = async (data) => {
		const response = await fetch(
			process.env.NEXT_PUBLIC_FRONTEND_URL + "/api/auth/login",
			{
				method: "POST",
				body: JSON.stringify(data),
			}
		);

		return await response.json();
	};

	// React Query

	const { isPending, mutateAsync } = useMutation({
		mutationFn: loginRequest,
	});

	// HandleSubmit

	const submit = async (data) => {
		const { status, message } = await mutateAsync(data);

		if (status) {
			toast.success(message, { onClose: () => router.push("/admin") });
		} else {
			toast.error(message);
		}
	};

	return (
		<Box
			component="form"
			onSubmit={handleSubmit(submit)}
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
						Login
					</Title>
					<Text
						size="sm"
						c="gray"
					>
						Enter your personal details and continue.
					</Text>
				</Stack>
				<Stack>
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
					<Group
						align="center"
						justify="space-between"
					>
						<Checkbox
							label="Remember me"
							color="dark"
						/>
						<Text
							size="sm"
							td="underline"
						>
							Forgot your password?
						</Text>
					</Group>
					<Button
						type="submit"
						color="dark"
						aria-label="Giriş Yap"
						loading={isPending}
					>
						Login
					</Button>
					<Text
						size="sm"
						c="gray"
						ta="center"
					>
						Don't you have an account?{" "}
						<Link href="/register">
							<strong>Register</strong>
						</Link>
					</Text>
				</Stack>
			</Stack>
		</Box>
	);
}
