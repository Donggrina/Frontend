import styles from './create.module.scss';
import { useEffect, useState } from 'react';
import useModal from '@/hooks/use-modal';
import CalendarModal from '@/components/calendar-monthly/calendar-modal';
import { SubmitHandler, useForm } from 'react-hook-form';
import PetRadio from '@/components/calendar-monthly/pet-radio';
import getDateTimeFrontend from '@/utils/get-date-time-frontend';
import { DateTime, IFormInput } from '@/types/calendar';
import getDateTimeBackend from '@/utils/get-date-time-backend';
import usePetsQuery from '@/hooks/queries/calendar/use-pets-query';
import useTodoPostMutation from '@/hooks/queries/calendar/use-todo-post-mutation';
import Button from '@/components/common/button/button';
import CalendarTodoPostSuccess from '@/components/calendar-monthly/calendar-todo-post-success';
import CalendarCategory from '@/components/calendar-monthly/calendar-category';
import ImageSkeleton from '@/components/skeleton/image/';

export default function Create() {
  const { data: pets, isLoading } = usePetsQuery();
  const postMutation = useTodoPostMutation();

  const {
    reset,
    setValue,
    trigger,
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<IFormInput>();

  const [dateTime, setDateTime] = useState<DateTime>({
    year: null,
    month: null,
    date: null,
    ampm: null,
    hour: null,
    minute: null,
  });

  const [DateTimeModal, handleDateTimeModal] = useModal();
  const [SuccessModal, handleSuccessModal] = useModal();
  const handleCloseDateTimeModal = () => {
    handleDateTimeModal(false);
  };

  useEffect(() => {
    if (!watch('dateTime')) return;
    trigger('dateTime');
  }, [watch('dateTime')]);

  const updateDateTime = (newDateTime: DateTime) => {
    setDateTime((prevDateTime) => ({
      ...prevDateTime,
      ...newDateTime,
    }));
  };

  useEffect(() => {
    setValue('dateTime', getDateTimeFrontend(dateTime));
    if (errors.dateTime) trigger('dateTime');
  }, [dateTime]);

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    postMutation.mutate(
      { ...data, dateTime: getDateTimeBackend(data.dateTime) },
      {
        onSuccess: () => {
          handleSuccessModal(true);
          reset();
        },
      },
    );
  };

  return (
    <div className={styles.outer}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register('title', { required: '*제목을 입력해주세요.' })}
          className={styles.title}
          id="title"
          type="text"
          placeholder="제목"
        />
        {errors.title && <p className={styles.error}>{errors.title.message}</p>}

        <textarea
          {...register('memo', { required: '*내용을 입력해주세요.' })}
          className={styles.memo}
          id="memo"
          placeholder={`메모\n어떤 일정인지 자세하게 기록하실 수 있어요!`}
        />
        {errors.memo && <p className={styles.error}>{errors.memo.message}</p>}

        <div className={styles.division}></div>
        <div className={styles.petSelector}>
          반려동물 선택
          <div className={styles.petLabelContainer}>
            {isLoading ? (
              <ImageSkeleton />
            ) : (
              pets.map((pet, i) => <PetRadio key={i} register={register} petName={pet.name} petImage={pet.imageUrl} />)
            )}
          </div>
          {errors.petName && <p className={styles.error}>{errors.petName.message}</p>}
        </div>

        <div className={styles.categorySelectorOuter}>
          <div className={styles.categorySelectorInner}>
            <CalendarCategory register={register} />
          </div>
          {errors.category && <p className={styles.error}>{errors.category.message}</p>}
        </div>

        <div className={styles.todoDate}>
          <button type="button" onClick={handleDateTimeModal.bind(null, true)} className={styles.todoDateText}>
            날짜 / 시간
          </button>
          <div className={styles.todoDateSelector}>
            <input
              {...register('dateTime', {
                validate: (value) => !!value || '*날짜를 선택해주세요.',
              })}
              type="text"
              id="dateTime"
              placeholder="YYYY-MM-DD 오전/오후 00:00"
              className={styles.input}
              readOnly
            />
          </div>
        </div>
        {errors.dateTime && <p className={styles.error}>{errors.dateTime.message}</p>}

        <div className={styles.submit}>
          <Button round className={isValid ? 'primary' : 'disabled'}>
            등록하기
          </Button>
        </div>
      </form>
      <DateTimeModal>
        <CalendarModal updateDateTime={updateDateTime} onClose={handleCloseDateTimeModal} />
      </DateTimeModal>
      <SuccessModal>
        <CalendarTodoPostSuccess />
      </SuccessModal>
    </div>
  );
}
