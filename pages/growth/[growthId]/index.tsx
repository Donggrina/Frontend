import React, { useEffect, useState } from 'react';
import styles from './growth-detail.module.scss';
import DropdownMenu from '@/components/kebab/kebab';
import useToggle from '@/hooks/use-toggle';
import { GetServerSidePropsContext } from 'next';
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher';
import { useGetGrowthDetailQuery } from '@/hooks/queries/growth/use-get-growth-queries';
import CalendarTodoProfile from '@/components/calendar-monthly/calendar-todo-profile';
import { useDeleteGrowthMutation } from '@/hooks/queries/growth/use-post-growth-query';
import { useRouter } from 'next/router';
import useModal from '@/hooks/use-modal';
import Image from 'next/image';
import CompleteModal from '../../../components/growth/complete-modal';
import { GrowthDetailsContent, GrowthDetailsData } from '@/types/growth/details';
import { GROWTH_CATEGORY_IMAGES, GROWTH_MEMO_IMAGES } from '@/utils/constants/growth';
import Content from '../../../components/growth/content';
import { AnimatePresence } from 'framer-motion';

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const {
    params: { growthId },
  } = context as Params;

  return { props: { growthId } };
}

interface GrowthDetailPageProps {
  growthId: number;
}

export default function GrowthDetailPage({ growthId }: GrowthDetailPageProps) {
  const { isToggle: isOpen, handleCloseToggle: onCloseToggle, handleOpenToggle: onOpenToggle } = useToggle();
  const { data: growthDatas } = useGetGrowthDetailQuery(growthId);
  const deleteMutation = useDeleteGrowthMutation();
  const router = useRouter();
  const [Modal, handleModal, isModalOpen] = useModal();

  const [category, setCategory] = useState<string>('');
  const [nickname, setNickname] = useState<string>('');
  const [writerProfileImageUrl, setWriterProfileImageUrl] = useState<string>('');
  const [petProfileImageUrl, setPetProfileImageUrl] = useState<string>('');
  const [content, setContent] = useState<GrowthDetailsContent>({
    food: '',
    snack: '',
    abnormalSymptom: '',
    hospitalName: '',
    symptom: '',
    diagnosis: '',
    medicationMethod: '',
    price: null,
    memo: '',
  });
  const [isMine, setIsMine] = useState<boolean>(false);
  const [petName, setPetName] = useState<string>('');

  useEffect(() => {
    if (growthDatas) {
      const { category, nickname, writerProfileImageUrl, petProfileImageUrl, content, isMine, petName } =
        growthDatas.data as GrowthDetailsData;

      setCategory(category);
      setNickname(nickname);
      setWriterProfileImageUrl(writerProfileImageUrl);
      setPetProfileImageUrl(petProfileImageUrl);
      setContent(content);
      setIsMine(isMine);
      setPetName(petName);
    }
  }, [growthDatas]);
  const imageUrl = GROWTH_CATEGORY_IMAGES[category];
  const memoUrl = GROWTH_MEMO_IMAGES[category];
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
    <main className={styles.outer}>
      <div className={styles.inner}>
        <div className={styles.headerContainer}>
          <div>
            <Image src={imageUrl} alt="카테고리 아이콘 이미지" width={66} height={66} />
          </div>
          <div className={styles.headerText}>
            <p className={`${styles.category} ${getCategoryColor(category)}`}>{category}</p>
            <div className={styles.profiles}>
              <CalendarTodoProfile src={writerProfileImageUrl} name={nickname} />
              <CalendarTodoProfile src={petProfileImageUrl} name={petName} />
            </div>
          </div>
          {isMine ? (
            <div className={styles.kebab}>
              <DropdownMenu value={{ isOpen, onCloseToggle, onOpenToggle }}>
                <DropdownMenu.Kebab />
                <DropdownMenu.Content>
                  <DropdownMenu.Item onClick={handleEditClick}>수정</DropdownMenu.Item>
                  <DropdownMenu.Item onClick={handleDeleteClick}>삭제</DropdownMenu.Item>
                </DropdownMenu.Content>
              </DropdownMenu>
            </div>
          ) : null}
        </div>
        <Content category={category} content={content} />
        <div className={styles.memoContainer}>
          <Image src={memoUrl} alt="메모 아이콘" width={20} height={20} />
          <section className={styles.memo}>{content.memo}</section>
        </div>
      </div>
      <AnimatePresence>
        {isModalOpen && (
          <Modal>
            <CompleteModal closeModal={closeModal} text="성장 기록이 삭제되었습니다." />
          </Modal>
        )}
      </AnimatePresence>
    </main>
  );
}
