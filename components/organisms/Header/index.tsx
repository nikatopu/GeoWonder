"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import styles from "./Header.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Make sure this is imported
import { faXmark } from "@fortawesome/free-solid-svg-icons"; // Import the 'X' icon
import Image from "next/image";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/tours", label: "Tours" },
  { href: "/gallery", label: "Gallery" },
  { href: "/articles", label: "Articles" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <header className={styles.header}>
        <Link href="/" className={styles.logo} onClick={closeMenu}>
          <Image
            src="/geowonder-text-only.png"
            alt="GeoWonder Logo"
            width={199}
            height={25.5}
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className={styles.desktopNav}>
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Burger Button for Mobile */}
        <button
          className={styles.burgerButton}
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <div />
          <div />
          <div />
        </button>
      </header>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className={styles.mobileMenu}>
          {/* --- THIS IS THE NEW BUTTON --- */}
          <button
            className={styles.closeButton}
            onClick={closeMenu} // Reuses the existing closeMenu function
            aria-label="Close menu"
          >
            <FontAwesomeIcon icon={faXmark} />
          </button>
          {/* ----------------------------- */}

          <nav className={styles.mobileNav}>
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} onClick={closeMenu}>
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </>
  );
}
