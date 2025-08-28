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

export default function Footer() {
  const { facebookURL, instagramURL, tiktokURL } = useAppContext();

  return (
    <footer className={style.container}>
      <Paragraph>
        © {new Date().getFullYear()} GeoWonder. All rights reserved.
      </Paragraph>

      <div className={style.socials}>
        <a href={instagramURL} target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faInstagram} color="black" scale={2.5} />
        </a>
        <a href={facebookURL} target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faFacebook} color="black" scale={2.5} />
        </a>
        <a href={tiktokURL} target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faTiktok} color="black" scale={2.5} />
        </a>
      </div>
    </footer>
  );
}
