import React from "react";
import styles from "./Button.module.scss";
import Link from "next/link";

type BaseProps = {
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary"; // New variant prop
  icon?: React.ReactNode; // New icon prop
};

type ButtonAsButton = BaseProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseProps> & {
    as?: "button";
  };

type ButtonAsLink = BaseProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof BaseProps> & {
    as: "a";
    href: string;
  };

type ButtonProps = ButtonAsButton | ButtonAsLink;

const Button = (props: ButtonProps) => {
  // Destructure new props, with 'primary' as the default variant
  const {
    as = "button",
    className,
    variant = "primary",
    icon,
    children,
    ...rest
  } = props;

  // Combine base class, variant class, and any custom class
  const combinedClassName = `${styles.button} ${styles[variant]} ${
    className || ""
  }`;

  const content = (
    <>
      {icon && <span className={styles.icon}>{icon}</span>}
      {children}
    </>
  );

  if (as === "a") {
    const { href, ...anchorProps } = rest as ButtonAsLink;
    const isExternal =
      href.startsWith("http") ||
      href.startsWith("tel:") ||
      href.startsWith("mailto:");

    if (isExternal) {
      return (
        <a href={href} className={combinedClassName} {...anchorProps}>
          {content}
        </a>
      );
    }
    return (
      <Link href={href} className={combinedClassName} {...anchorProps}>
        {content}
      </Link>
    );
  }

  return (
    <button className={combinedClassName} {...(rest as ButtonAsButton)}>
      {content}
    </button>
  );
};

export default Button;
