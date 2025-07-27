import React from "react";
import styles from "./Button.module.scss";
import Link from "next/link";

// Define the base props that both button and anchor tags can have
type BaseProps = {
  children: React.ReactNode;
  className?: string;
};

// Use conditional types to make 'href' required for 'a' and optional for 'button'
type ButtonAsButton = BaseProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseProps> & {
    as?: "button";
  };

type ButtonAsLink = BaseProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof BaseProps> & {
    as: "a";
    href: string; // href is required for links
  };

type ButtonProps = ButtonAsButton | ButtonAsLink;

const Button = (props: ButtonProps) => {
  const { as = "button", className, ...rest } = props;
  const combinedClassName = `${styles.button} ${className || ""}`;

  if (as === "a") {
    // If it's a link, we need to handle the href specifically
    const { href, ...anchorProps } = rest as ButtonAsLink;
    // Check if it's an external link
    const isExternal =
      href.startsWith("http") ||
      href.startsWith("tel:") ||
      href.startsWith("mailto:");

    if (isExternal) {
      return (
        <a href={href} className={combinedClassName} {...anchorProps}>
          {props.children}
        </a>
      );
    }
    // For internal Next.js links
    return (
      <Link href={href} className={combinedClassName} {...anchorProps}>
        {props.children}
      </Link>
    );
  }

  // Otherwise, render a button
  return (
    <button className={combinedClassName} {...(rest as ButtonAsButton)}>
      {props.children}
    </button>
  );
};

export default Button;
