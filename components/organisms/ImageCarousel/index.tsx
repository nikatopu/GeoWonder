"use client";

import React, { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { EmblaCarouselType, EmblaOptionsType } from "embla-carousel";
import Image from "next/image";
import styles from "./ImageCarousel.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

type PropType = {
  slides: string[];
  options?: EmblaOptionsType;
};

// --- Helper Components for Buttons and Dots ---
const PrevButton = ({
  enabled,
  onClick,
}: {
  enabled: boolean;
  onClick: () => void;
}) => (
  <button
    className={`${styles.emblaButton} ${styles.emblaButtonPrev}`}
    onClick={onClick}
    disabled={!enabled}
  >
    <FontAwesomeIcon icon={faChevronLeft} />
  </button>
);

const NextButton = ({
  enabled,
  onClick,
}: {
  enabled: boolean;
  onClick: () => void;
}) => (
  <button
    className={`${styles.emblaButton} ${styles.emblaButtonNext}`}
    onClick={onClick}
    disabled={!enabled}
  >
    <FontAwesomeIcon icon={faChevronRight} />
  </button>
);

const Dots = ({
  items,
  selectedIndex,
  onClick,
}: {
  items: any[];
  selectedIndex: number;
  onClick: (index: number) => void;
}) => (
  <div className={styles.emblaDots}>
    {items.map((_, index) => (
      <button
        key={index}
        className={`${styles.emblaDot} ${
          index === selectedIndex ? styles["emblaDot--selected"] : ""
        }`}
        type="button"
        onClick={() => onClick(index)}
      />
    ))}
  </div>
);
// --- End Helper Components ---

const ImageCarousel = (props: PropType) => {
  const { slides, options } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel(options);
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(
    () => emblaApi && emblaApi.scrollPrev(),
    [emblaApi]
  );
  const scrollNext = useCallback(
    () => emblaApi && emblaApi.scrollNext(),
    [emblaApi]
  );
  const scrollTo = useCallback(
    (index: number) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi]
  );

  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setPrevBtnEnabled(emblaApi.canScrollPrev());
    setNextBtnEnabled(emblaApi.canScrollNext());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect(emblaApi);
    emblaApi.on("reInit", onSelect);
    emblaApi.on("select", onSelect);
  }, [emblaApi, onSelect]);

  return (
    <div className={styles.embla}>
      <div className={styles.emblaViewport} ref={emblaRef}>
        <div className={styles.emblaContainer}>
          {slides.map((imageUrl, index) => (
            <div className={styles.emblaSlide} key={index}>
              <Image
                src={imageUrl}
                alt={`Tour image ${index + 1}`}
                fill
                style={{ objectFit: "cover" }}
              />
            </div>
          ))}
        </div>
      </div>

      <PrevButton onClick={scrollPrev} enabled={prevBtnEnabled} />
      <NextButton onClick={scrollNext} enabled={nextBtnEnabled} />
      <Dots items={slides} selectedIndex={selectedIndex} onClick={scrollTo} />
    </div>
  );
};

export default ImageCarousel;
