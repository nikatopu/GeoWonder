import Link from "next/link";
import styles from "./AdminLayout.module.scss";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.layout}>
      <aside className={styles.sidebar}>
        <h2 className={styles.sidebarTitle}>GeoWonder</h2>
        <nav className={styles.sidebarNav}>
          <Link href="/admin">Dashboard</Link>
          <Link href="/admin/articles">Manage Articles</Link>
          <Link href="/admin/tours">Manage Tours</Link>
          <Link href="/admin/gallery">Manage Gallery</Link>
          <Link href="/admin/settings">Site Settings</Link>
        </nav>
      </aside>
      <main className={styles.mainContent}>{children}</main>
    </div>
  );
}
