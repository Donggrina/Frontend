import Image from 'next/image';
import styles from './pet-checkbox.module.scss';
import { UseFormRegister, FieldValues } from 'react-hook-form';
import { DiaryData } from './diary-create/diary-create';

interface PetCheckboxProps {
  register: UseFormRegister<DiaryData & FieldValues>;
  petId: number;
  petName: string;
  petImage: string;
  selectedPets: number[];
  onTogglePet: (petId: number) => void;
}

const PetCheckbox: React.FC<PetCheckboxProps> = ({ register, petId, petName, petImage, selectedPets, onTogglePet }) => {
  const isSelected = selectedPets.includes(petId);

  return (
    <label className={styles.petLabel}>
      <div className={styles.petImageContainer}>
        <input
          {...register('pets', {
            validate: (selected: number[]) => selected.length > 0 || '*반려동물을 선택해주세요.',
          })}
          value={petId}
          className={styles.petInput}
          type="checkbox"
          checked={isSelected}
          onChange={() => onTogglePet(petId)}
        />
        <Image className={styles.petImage} src={petImage} alt="반려동물 프로필 사진" fill />
        {isSelected && (
          <Image
            src="/images/calendar/check-circle.svg"
            alt="체크 표시"
            width={20}
            height={20}
            className={styles.check}
          />
        )}
      </div>
      <p className={styles.petName}>{petName}</p>
    </label>
  );
};

export default PetCheckbox;
