import Link from "next/link";
import React from "react";

const headerStyles: React.CSSProperties = {
  padding: "1rem",
  backgroundColor: "#fff",
  borderBottom: "1px solid #ddd",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const navStyles: React.CSSProperties = {
  display: "flex",
  gap: "1.5rem",
};

const logoStyles: React.CSSProperties = {
  fontSize: "1.5rem",
  fontWeight: "bold",
  textDecoration: "none",
  color: "#333",
};

export default function Header() {
  return (
    <header style={headerStyles}>
      <Link href="/" style={logoStyles}>
        GeoWonder
      </Link>
      <nav style={navStyles}>
        <Link href="/">Home</Link>
        <Link href="/tours">Tours</Link>
        <Link href="/gallery">Gallery</Link>
        <Link href="/articles">Articles</Link>
        <Link href="/contact">Contact</Link>
      </nav>
    </header>
  );
};
