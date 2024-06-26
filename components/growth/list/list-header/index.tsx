import React from 'react';
import styles from './list-header.module.scss';
import Profile from '../../profile';
import CategoryIcon from '@/public/images/growth/categroy-icon.svg';
import DropdownMenu from '@/components/kebab/kebab';
import useToggle from '@/hooks/use-toggle';
import { useDeleteGrowthMutation } from '@/hooks/queries/growth/use-post-growth-query';
import { useRouter } from 'next/router';
import CompleteModal from '@/pages/growth/create/complete-modal';
import useModal from '@/hooks/use-modal';
import { GROWTH_CATEGORY_IMAGES } from '@/utils/constants/growth';
import Image from 'next/image';

interface ListHeaderProps {
  category: string;
  writerImage: string;
  petImage: string;
  nickname: string;
  isMine: boolean;
  petName: string;
  id: number;
}

export default function ListHeader({
  id: growthId,
  petName,
  isMine,
  nickname,
  category,
  writerImage,
  petImage,
}: ListHeaderProps) {
  const router = useRouter();
  const [Modal, handleModal] = useModal();

  const { isToggle: isOpen, handleCloseToggle: onCloseToggle, handleOpenToggle: onOpenToggle } = useToggle();
  const deleteMutation = useDeleteGrowthMutation();
  const getCategoryColor = (category: string) => {
    switch (category) {
      case '간식':
        return styles.snack;
      case '이상 증상':
        return styles.abnormalSymptom;
      case '병원 기록':
        return styles.hospital;
      default:
        return styles.food;
    }
  };
  const imageUrl = GROWTH_CATEGORY_IMAGES[category];
  const openModal = () => {
    handleModal(true);
  };
  const closeModal = () => {
    handleModal(false);
    router.push('/growth');
  };
  const handleEditClick = () => {
    router.push(`/growth/${growthId}/edit`);
  };
  const handleDeleteClick = () => {
    deleteMutation.mutate(growthId, {
      onSuccess: () => openModal(),
    });
  };
  return (
    <>
      <div className={styles.headerContainer}>
        <div className={styles.wrapper}>
          <Image src={imageUrl} alt="카테고리 아이콘" width={46} height={46} />
          <div className={styles.subHeader}>
            <div className={`${styles.categoryName} ${getCategoryColor(category)}`}>{category}</div>
            <div className={styles.profileContainer}>
              <Profile name={nickname} image={writerImage} />
              <Profile name={petName} className={styles.lastProfile} image={petImage} />
            </div>
          </div>
        </div>
        {isMine ? (
          <DropdownMenu value={{ isOpen, onOpenToggle, onCloseToggle }}>
            <DropdownMenu.Kebab />
            <DropdownMenu.Content>
              <DropdownMenu.Item onClick={handleEditClick}>수정</DropdownMenu.Item>
              <DropdownMenu.Item onClick={handleDeleteClick}>삭제</DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu>
        ) : null}
      </div>
      <Modal>
        <CompleteModal closeModal={closeModal} text="성장 기록이 삭제되었습니다." />
      </Modal>
    </>
  );
}
