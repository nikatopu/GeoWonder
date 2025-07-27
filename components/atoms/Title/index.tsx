import React, { JSX } from "react";
import styles from "./Title.module.scss";

type HeadingProps = {
  level: 1 | 2 | 3 | 4 | 5 | 6;
  children: React.ReactNode;
  className?: string;
};

const Heading = ({ level, children, className }: HeadingProps) => {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;
  const combinedClassName = `${styles.heading} ${styles[`level${level}`]} ${
    className || ""
  }`;

  return <Tag className={combinedClassName}>{children}</Tag>;
};

export default Heading;
