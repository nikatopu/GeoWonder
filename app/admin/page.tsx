import Link from "next/link";
import Heading from "@/components/atoms/Title";
import Paragraph from "@/components/atoms/Paragraph";
import styles from "./Dashboard.module.scss";

export default function AdminDashboardPage() {
  return (
    <div>
      <Heading level={1}>Admin Dashboard</Heading>
      <Paragraph>Select a section to manage your website's content.</Paragraph>
      <div className={styles.grid}>
        <Link href="/admin/articles" className={styles.card}>
          <Heading level={3}>Manage Articles</Heading>
          <Paragraph>
            Create, edit, and delete blog posts and journal entries.
          </Paragraph>
        </Link>
        <Link href="/admin/tours" className={styles.card}>
          <Heading level={3}>Manage Tours</Heading>
          <Paragraph>
            Add new tour packages, update details, and manage photos.
          </Paragraph>
        </Link>
        <Link href="/admin/gallery" className={styles.card}>
          <Heading level={3}>Manage Gallery</Heading>
          <Paragraph>
            Upload and organize photos for the main gallery page.
          </Paragraph>
        </Link>
      </div>
    </div>
  );
}
