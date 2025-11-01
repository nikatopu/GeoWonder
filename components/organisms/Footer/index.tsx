"use client";

import Paragraph from "@/components/atoms/Paragraph";
import { useAppContext } from "@/lib/AppContext";
import React from "react";
import {
  faTiktok,
  faFacebook,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import style from "./Footer.module.scss";
import { motion } from "framer-motion";

export default function Footer() {
  const { facebookUrl, instagramUrl, tiktokUrl } = useAppContext();

  return (
    <motion.footer
      className={style.container}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      viewport={{ once: true }}
    >
      <Paragraph>
        © {new Date().getFullYear()} GeoWonder. All rights reserved.
      </Paragraph>

      <div className={style.socials}>
        <a href={instagramUrl} target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faInstagram} color="black" />
        </a>
        <a href={facebookUrl} target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faFacebook} color="black" />
        </a>
        <a href={tiktokUrl} target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faTiktok} color="black" />
        </a>
      </div>
    </motion.footer>
  );
}
