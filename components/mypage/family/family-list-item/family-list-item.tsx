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
    id: number;
    owner: number;
    index: number;
  };
}

export default function FamilyListItem({ membersValue }: FamilyListItemType) {
  const { owner, id, nickname, profileImageUrl, index } = membersValue;
  const [Modal, handleModal, isOpen] = useModal();
  const ownerCheck = owner === Number(localStorage.getItem('userId'));
  const deleteModalValue = {
    id: id,
    nickname: nickname,
  };
  const handleOpen = () => {
    handleModal(true);
  };
  return (
    <>
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
      <DeleteMemberModal Modal={Modal} handleModal={handleModal} deleteModalValue={deleteModalValue} isOpen={isOpen} />
    </>
  );
}
