import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import styles from './create.module.scss';
import PetRadio from '@/components/calendar-monthly/pet-radio';
import { GROWTH_CATEGORY, GROWTH_CATEGORY_ICON } from '@/utils/constants/growth';
import { GrowthDetailsData, GrowthDetailsContent } from '@/types/growth/details';
import classNames from 'classnames';
import CategoryInputs from '../../../components/growth/category-inputs';
import usePetsQuery from '@/hooks/queries/calendar/use-pets-query';
import { useCreateGrotwthMutation } from '@/hooks/queries/growth/use-post-growth-query';
import useCalenderDateStore from '@/store/calendar.store';
import { convertToLocalDate } from '@/utils/convert-local-date';
import { useRouter } from 'next/router';
import useModal from '@/hooks/use-modal';
import CompleteModal from '../../../components/growth/complete-modal';
import Image from 'next/image';
import MemoItem from '@/components/diaries/jihye/diary-edit-memo';
import ImageSkeleton from '@/components/skeleton/image/';
import { AnimatePresence } from 'framer-motion';

export default function CreateGrowth() {
  const [Modal, handleModal, isOpen] = useModal();
  const router = useRouter();
  const { data: pets, isLoading } = usePetsQuery();
  const createGrowthMutation = useCreateGrotwthMutation();

  const year = useCalenderDateStore.use.year().toString();
  const month = (useCalenderDateStore.use.month() + 1).toString();
  const date = useCalenderDateStore.use.date().toString();
  const localDate = convertToLocalDate({ year, month, day: date });
  const content: GrowthDetailsContent = {
    food: '',
    snack: '',
    abnormalSymptom: '',
    hospitalName: '',
    symptom: '',
    diagnosis: '',
    medicationMethod: '',
    price: null,
    memo: '',
  };

  const [selectedCategory, setSelectedCategory] = useState(GROWTH_CATEGORY[0]);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<GrowthDetailsData>({
    mode: 'onBlur',
    defaultValues: {
      date: localDate,
      category: GROWTH_CATEGORY[0],
    },
  });
  const openModal = () => {
    handleModal(true);
  };
  const closeModal = () => {
    handleModal(false);
    router.push('/growth');
  };
  const handleCategoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedCategory(event.target.value);
  };

  const getCategoryClassName = (category: string) => {
    switch (category) {
      case '간식':
        return 'snack';
      case '이상 증상':
        return 'abnormalSymptom';
      case '병원 기록':
        return 'hospital';
      default:
        return 'food';
    }
  };

  const onSubmit: SubmitHandler<GrowthDetailsData> = (data) => {
    console.log(data);
    createGrowthMutation.mutate(data, {
      onSuccess: () => {
        openModal();
      },
      onError: (error) => {
        console.error('Error:', error);
      },
    });
  };
  return (
    <>
      <div className={styles.wrapper}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.petSelector}>
            반려동물 선택
            <div className={styles.petLabelContainer}>
              {isLoading ? (
                <ImageSkeleton />
              ) : (
                pets.map((pet, i) => (
                  <PetRadio key={i} register={register} petName={pet.name} petImage={pet.imageUrl} />
                ))
              )}
            </div>
            {errors.petName && <p className={styles.error}>{errors.petName.message}</p>}
          </div>
          <div className={styles.division}></div>
          <MemoItem register={register} fieldName="content.memo" />
          <div className={styles.categorySelectorOuter}>
            <div className={styles.categorySelectorInner}>
              {GROWTH_CATEGORY.map((category) => (
                <label key={category} className={styles.categoryLabel}>
                  <input
                    {...register('category')}
                    value={category}
                    className={styles.categoryInput}
                    type="radio"
                    checked={selectedCategory === category}
                    onChange={handleCategoryChange}
                  />
                  <div className={`${styles.categoryIcon} ${styles[getCategoryClassName(category)]}`}>
                    <Image src={GROWTH_CATEGORY_ICON[category]} alt="카테고리 아이콘" width={56} height={56} />
                  </div>
                  <p className={styles.categoryName}>{category}</p>
                </label>
              ))}
            </div>
          </div>
          <CategoryInputs
            defaultValue={content}
            errors={errors}
            selectedCategory={selectedCategory}
            register={register}
          />
          <button
            className={classNames(styles.submit, {
              [styles.disabled]: !isValid,
            })}
          >
            등록하기
          </button>
        </form>
      </div>
      <AnimatePresence>
        {isOpen && (
          <Modal>
            <CompleteModal closeModal={closeModal} text="성장 기록이 등록되었습니다." />
          </Modal>
        )}
      </AnimatePresence>
    </>
  );
}
