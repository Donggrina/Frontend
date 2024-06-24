import { GrowthDetailsData, GrowthDetailsContent } from '@/types/growth/details';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import styles from './category-inputs.module.scss';

interface CategoryInputsProps {
  selectedCategory: string;
  register: UseFormRegister<GrowthDetailsData>;
  errors: FieldErrors<GrowthDetailsData>;
  defaultValue: GrowthDetailsContent;
}

export default function CategoryInputs({ defaultValue, errors, selectedCategory, register }: CategoryInputsProps) {
  const { food, snack, abnormalSymptom, hospitalName, symptom, diagnosis, medicationMethod, price } = defaultValue;
  const formatInputValue = (value: string): string => {
    return value.replace(/[^0-9]/g, '');
  };
  const updateInputValue = (input: HTMLInputElement, value: string) => {
    input.value = value;
  };
  const handlePriceInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const formattedValue = formatInputValue(value);
    if (value !== formattedValue) {
      updateInputValue(e.target, formattedValue);
    }
  };
  switch (selectedCategory) {
    case '간식':
      return (
        <div className={styles.inputGroup}>
          <label className={styles.label}>간식*</label>
          <input
            {...register('content.snack', { required: '*내용을 입력해주세요.' })}
            placeholder="간식의 이름을 입력해주세요"
            className={styles.input}
            defaultValue={snack}
          />
          {errors.content?.snack && <p className={styles.error}>{errors.content.snack.message}</p>}
        </div>
      );
    case '이상 증상':
      return (
        <div className={styles.inputGroup}>
          <label className={styles.label}>이상 증상*</label>
          <input
            {...register('content.abnormalSymptom', { required: '*내용을 입력해주세요.' })}
            placeholder="이상 증상을 입력해주세요"
            className={styles.input}
            defaultValue={abnormalSymptom}
          />
          {errors.content?.abnormalSymptom && <p className={styles.error}>{errors.content.abnormalSymptom.message}</p>}
        </div>
      );
    case '병원 기록':
      return (
        <div className={styles.wrapper}>
          <div className={styles.inputGroup}>
            <label className={styles.label}>병원명</label>
            <input
              {...register('content.hospitalName')}
              placeholder="병원의 이름을 입력해주세요"
              className={styles.input}
              defaultValue={hospitalName}
            />
          </div>
          <div className={styles.inputGroup}>
            <label className={styles.label}>증상*</label>
            <input
              {...register('content.symptom', { required: '*내용을 입력해주세요.' })}
              placeholder="증상을 입력해주세요"
              className={styles.input}
              defaultValue={symptom}
            />
            {errors.content?.symptom && <p className={styles.error}>{errors.content.symptom.message}</p>}
          </div>
          <div className={styles.inputGroup}>
            <label className={styles.label}>진료 내용</label>
            <input
              {...register('content.diagnosis')}
              placeholder="진료 내용을 입력해주세요"
              className={styles.input}
              defaultValue={diagnosis}
            />
          </div>
          <div className={styles.inputGroup}>
            <label className={styles.label}>복용 방법</label>
            <input
              {...register('content.medicationMethod')}
              placeholder="복용 방법을 입력해주세요"
              className={styles.input}
              defaultValue={medicationMethod}
            />
          </div>
          <div className={styles.inputGroup}>
            <label className={styles.label}>금액</label>
            <input
              {...register('content.price')}
              placeholder="1,000 ₩"
              className={styles.input}
              onInput={handlePriceInput}
              defaultValue={price as number}
            />
          </div>
        </div>
      );
    default:
      return (
        <div className={styles.inputGroup}>
          <label className={styles.label}>사료*</label>
          <input
            {...register('content.food', { required: '*내용을 입력해주세요.' })}
            placeholder="사료의 이름을 입력해주세요"
            className={styles.input}
            defaultValue={food}
          />
          {errors.content?.food && <p className={styles.error}>{errors.content.food.message}</p>}
        </div>
      );
  }
}
