import { IconDashboard } from "@tabler/icons-react";
import { IconWriting } from "@tabler/icons-react";
import { IconUsers } from "@tabler/icons-react";
import { IconSettings } from "@tabler/icons-react";
export const sidebarMenuItems = [
	{
		href: "/admin",
		label: "Anasayfa",
		icon: <IconDashboard />,
	},
	{
		href: "/admin/poetry",
		label: "Şiirler",
		icon: <IconWriting />,
	},
	{
		href: "/admin/poets",
		label: "Şairler",
		icon: <IconUsers />,
	},
	{
		href: "/admin/settings",
		label: "Ayarlar",
		icon: <IconSettings />,
	},
];
