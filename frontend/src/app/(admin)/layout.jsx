import { Box } from "@mantine/core";
import styles from "./layout.module.css";
import Header from "@/components/admin/header";
import Sidebar from "@/components/admin/sidebar";
import Main from "@/components/admin/main";
import Footer from "@/components/admin/footer";
export default function AdminLayout({ children }) {
	return (
		<Box
			component="div"
			className={styles.adminLayout}
		>
			<Header />
			<Sidebar />
			<Main>{children}</Main>
			<Footer />
		</Box>
	);
}
