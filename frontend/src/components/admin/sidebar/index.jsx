import React from "react";
import styles from "./index.module.css";
import { SidebarMenu, SidebarMenuItem } from "../sidebar-menu";
import { sidebarMenuItems } from "@/data/admin/sidebar-menu-items";
export default function Sidebar() {
	return (
		<aside className={styles.sidebar}>
			<SidebarMenu>
				{sidebarMenuItems.map((item, index) => (
					<SidebarMenuItem
						key={index}
						label={item.label}
						href={item.href}
						icon={item.icon}
					/>
				))}
			</SidebarMenu>
		</aside>
	);
}
