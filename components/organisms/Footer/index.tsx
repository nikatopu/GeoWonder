import Paragraph from "@/components/atoms/Paragraph";
import React from "react";

const footerStyles: React.CSSProperties = {
  padding: "2rem 1rem",
  backgroundColor: "#f5f5f5",
  borderTop: "1px solid #ddd",
  textAlign: "center",
};

export default function Footer() {
  return (
    <footer style={footerStyles}>
      <Paragraph>
        © {new Date().getFullYear()} GeoWonder. All rights reserved.
      </Paragraph>
    </footer>
  );
}
