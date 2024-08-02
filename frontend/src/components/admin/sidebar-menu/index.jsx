"use client";

import { Box, Group, Stack, Text } from "@mantine/core";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import styles from "./index.module.css";

function SidebarMenu({ children }) {
	return (
		<Box
			component="nav"
			className={styles.sidebarMenu}
		>
			{children}
		</Box>
	);
}

function SidebarMenuItem({ href, icon, label }) {
	const pathname = usePathname();

	const isActive = pathname === href ? styles.active : "";

	return (
		<Link
			href={href}
			className={`${styles.sidebarMenuItem} ${isActive}`}
		>
			{icon}
			{label}
		</Link>
	);
}

export { SidebarMenu, SidebarMenuItem };
