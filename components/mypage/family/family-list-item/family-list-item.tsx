import Image from 'next/image';
import styles from './family-list-item.module.scss';
import ExpulsionSVG from '@/public/images/mypage/minus-circle.svg';
import OwnerSVG from '@/public/images/mypage/owner.svg';
import useModal from '@/hooks/use-modal';
import DeleteMemberModal from './delete-member-modal/delete-member-modal';

interface FamilyListItemType {
  membersValue: {
    profileImageUrl: string;
    nickname: string;
    membersCount: number;
    id: number;
    owner: number;
    index: number;
  };
}

export default function FamilyListItem({ membersValue }: FamilyListItemType) {
  const { owner, id, nickname, membersCount, profileImageUrl, index } = membersValue;
  const [Modal, handleModal] = useModal();
  const ownerCheck = owner === Number(localStorage.getItem('userId'));
  const deleteModalValue = {
    id: id,
    nickname: nickname,
  };
  const listClass = membersCount === 1 ? `${styles.onlyOne} ${styles.familyList}` : styles.familyList;
  const handleOpen = () => {
    handleModal(true);
  };
  return (
    <>
      <li className={listClass}>
        <div className={styles.profileBox}>
          <div className={styles.imgBox}>
            <Image src={profileImageUrl} alt="프로필 이미지" fill priority sizes="100%" />
            {index === 0 && (
              <div className={styles.svgBox} aria-label="모임장">
                <OwnerSVG />
              </div>
            )}
          </div>
          <p>{nickname}</p>
        </div>

        {ownerCheck && index !== 0 && (
          <button className={styles.ExpulsionButton} type="button" title={`${nickname} 추방하기`} onClick={handleOpen}>
            <ExpulsionSVG />
          </button>
        )}
      </li>
      <DeleteMemberModal Modal={Modal} handleModal={handleModal} deleteModalValue={deleteModalValue} />
    </>
  );
}
