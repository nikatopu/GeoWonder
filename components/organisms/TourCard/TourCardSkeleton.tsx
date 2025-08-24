import React from "react";
import styles from "./TourCardSkeleton.module.scss";

const TourCardSkeleton = () => {
  return (
    <div className={styles.skeletonCard}>
      <div className={styles.imagePlaceholder} />
      <div className={styles.content}>
        <div className={styles.title} />
        <div className={styles.line1} />
        <div className={styles.line2} />
      </div>
    </div>
  );
};

export default TourCardSkeleton;
