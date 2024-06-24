import styles from './edit.module.scss';
import { useEffect, useState } from 'react';
import useModal from '@/hooks/use-modal';
import CalendarModal from '@/components/calendar-monthly/calendar-modal';
import { SubmitHandler, useForm } from 'react-hook-form';
import PetRadio from '@/components/calendar-monthly/pet-radio';
import getDateTimeFrontend from '@/utils/get-date-time-frontend';
import classNames from 'classnames';
import { fetchTodoById } from '@/api/calendar/request';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher';
import disintegrateDateTime from '@/utils/disintegrate-date-time';
import { DateTime, IFormInput } from '@/types/calendar';
import getDateTimeBackend from '@/utils/get-date-time-backend';
import usePetsQuery from '@/hooks/queries/calendar/use-pets-query';
import useTodoPutMutation from '@/hooks/queries/calendar/use-todo-put-mutation';
import { useRouter } from 'next/router';
import CalendarCategory from '@/components/calendar-monthly/calendar-category';
import { AnimatePresence } from 'framer-motion';

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const {
    params: { calendarId },
    req: {
      cookies: { accessToken },
    },
  } = context as Params;

  const data = await fetchTodoById(calendarId, accessToken);

  return { props: { todo: data } };
}

export default function Edit({ todo }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { id, title, memo, petName: initPetName, category: initCategory, dateTime: initDateTime } = todo;
  const { data: pets } = usePetsQuery();
  const putMutation = useTodoPutMutation();
  const router = useRouter();

  const { year, month, date, ampm, hour, minute } = disintegrateDateTime(initDateTime);

  const {
    setValue,
    trigger,
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<IFormInput>();

  const [dateTime, setDateTime] = useState<DateTime>({
    year,
    month,
    date,
    ampm,
    hour,
    minute,
  });

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
    putMutation.mutate(
      { data: { ...data, dateTime: getDateTimeBackend(data.dateTime) }, id },
      {
        onSuccess: () => router.push(`/calendar/${todo.id}`),
      },
    );
  };

  const [Modal, handleModal, isOpen] = useModal();

  const handleCloseModal = () => {
    handleModal(false);
    trigger('dateTime');
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
          defaultValue={title}
        />
        {errors.title && <p className={styles.error}>{errors.title.message}</p>}

        <textarea
          {...register('memo', { required: '*내용을 입력해주세요.' })}
          className={styles.memo}
          id="memo"
          placeholder={`메모\n어떤 일정인지 자세하게 기록하실 수 있어요!`}
          defaultValue={memo}
        />
        {errors.memo && <p className={styles.error}>{errors.memo.message}</p>}

        <div className={styles.division}></div>
        <div className={styles.petSelector}>
          반려동물 선택
          <div className={styles.petLabelContainer}>
            {pets.map((pet, i) => (
              <PetRadio
                key={i}
                register={register}
                petName={pet.name}
                petImage={pet.imageUrl}
                defaultPet={initPetName}
              />
            ))}
          </div>
          {errors.petName && <p className={styles.error}>{errors.petName.message}</p>}
        </div>

        <div className={styles.categorySelectorOuter}>
          <div className={styles.categorySelectorInner}>
            <CalendarCategory register={register} initCategory={initCategory} />
          </div>
          {errors.category && <p className={styles.error}>{errors.category.message}</p>}
        </div>

        <div className={styles.todoDate}>
          <button type="button" onClick={handleModal.bind(null, true)} className={styles.todoDateText}>
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

        <button
          className={classNames(styles.submit, {
            [styles.disabled]: !isValid,
          })}
        >
          수정하기
        </button>
      </form>
      <AnimatePresence>
        {isOpen && (
          <Modal>
            <CalendarModal updateDateTime={updateDateTime} onClose={handleCloseModal} />
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
}
