import React from 'react';
import styles from './family-growth-empty.module.scss';
import Image from 'next/image';
import Link from 'next/link';

export default function FamilyGrowthEmpty() {
  return (
    <Link href="/" className={styles.wrapper}>
      <div className={styles['link-button']}>
        <Image src="images/family/add-black-icon.svg" alt="" width="20" height="20" />
      </div>
      <span>
        성장기록
        <br />
        작성하기
      </span>
    </Link>
  );
}
