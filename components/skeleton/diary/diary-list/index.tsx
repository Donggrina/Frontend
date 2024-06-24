import React from 'react';
import styles from './diary-skeleton.module.scss';

const DiarySkeleton = () => {
  const skeletonItems = Array.from({ length: 3 });

  return (
    <>
      {skeletonItems.map((_, index) => (
        <div key={index} className={styles.skeletonContainer}>
          <div className={styles.skeletonLeft}>
            <div className={styles.skeletonHeader}></div>
            <div className={styles.skeletonContent}></div>
            <div className={styles.skeletonBody}></div>
          </div>
          <div className={styles.skeletonRight}>
            <div className={styles.skeletonImage}></div>
          </div>
        </div>
      ))}
    </>
  );
};

export default DiarySkeleton;
