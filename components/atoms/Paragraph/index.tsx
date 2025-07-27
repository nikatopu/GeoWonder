import React from "react";
import styles from "./Paragraph.module.scss";

type ParagraphProps = {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
};

const Paragraph = ({ children, className, style }: ParagraphProps) => {
  const combinedClassName = `${styles.paragraph} ${className || ""}`;
  return (
    <p className={combinedClassName} style={style}>
      {children}
    </p>
  );
};

export default Paragraph;
