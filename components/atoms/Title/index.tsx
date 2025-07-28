import React, { JSX } from "react";
import styles from "./Title.module.scss";

type TitleProps = {
  level: 1 | 2 | 3 | 4 | 5 | 6;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
};

const Title = ({ level, children, className, style }: TitleProps) => {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;
  const combinedClassName = `${styles.heading} ${styles[`level${level}`]} ${
    className || ""
  }`;

  return <Tag className={combinedClassName} style={style}>{children}</Tag>;
};

export default Title;
