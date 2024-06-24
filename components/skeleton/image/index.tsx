import React from 'react';
import styles from './image.module.scss';

const ImageSkeleton = () => {
  const skeletonItems = Array.from({ length: 3 });

  return (
    <div className={styles.skeletonContainer}>
      {skeletonItems.map((_, index) => (
        <div key={index} className={styles.skeletonImage}>
          <div className={styles.skeletonProfile}></div>
          <div className={styles.skeletonName}></div>
        </div>
      ))}
    </div>
  );
};

export default ImageSkeleton;
