import React from "react";

const footerStyles: React.CSSProperties = {
  padding: "2rem 1rem",
  backgroundColor: "#f5f5f5",
  borderTop: "1px solid #ddd",
  textAlign: "center",
  marginTop: "2rem",
};

export default function Footer() {
  return (
    <footer style={footerStyles}>
      <p>© {new Date().getFullYear()} GeoWonder. All rights reserved.</p>
    </footer>
  );
}
