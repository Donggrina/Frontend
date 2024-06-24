import { PetData } from '@/types/my-page/pet';
import Image from 'next/image';
import styles from './pet-list-item.module.scss';
import ArrowSVG from '@/public/images/mypage/chevron-left.svg';
import Link from 'next/link';

export default function PetListItem({ imageUrl, name, petId }: PetData) {
  return (
    <>
      <div className={styles.petProfile}>
        <div className={styles.imgBox}>
          <Image src={imageUrl} alt="반려동물 프로필" fill priority sizes="100%" />
        </div>
        <p>{name}</p>
      </div>
      <Link href={`/mypage/pet/${petId}`} title="반려동물 수정하기로 이동" className={styles.linkButton}>
        <ArrowSVG />
      </Link>
    </>
  );
}
