import {
  CAT_BREED_OPTION,
  DOG_BREED_OPTION,
  GENDER_OPTION,
  KIND_OPTION,
  NEUTERED_OPTION,
} from '@/utils/constants/entry-data';
import { useEffect, useRef, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import FileImage from '../file-image/file-image';
import FileInput from '../file-input/file-input';
import Form from '@/components/common/Form';
import Radio from '@/components/common/radio/radio';
import styles from './entry-form.module.scss';
import { PetDetailsData } from '@/types/my-page/pet/detsils';
import Button from '@/components/common/button/button';

interface EntryFormType {
  onSubmit: (data: FieldValues) => Promise<void>;
  defaultData?: PetDetailsData;
  buttonText: string;
}

export default function EntryForm({ onSubmit, defaultData, buttonText }: EntryFormType) {
  const [speciesOPtion, setSpeciesOption] = useState<string[]>();
  const [selectDisabled, setSelectDisabled] = useState<boolean>();
  const methods = useForm<FieldValues>({
    defaultValues: {
      imageId: null,
      sex: '암컷',
      isNeutered: true,
      name: '',
      birthDate: '',
      adoptionDate: '',
      type: '',
      species: '',
      weight: 0,
      ...defaultData,
    },
    mode: 'onBlur',
  });
  const { control, handleSubmit, watch, setValue, formState } = methods;
  const buttonClassCondition = formState.isValid ? 'primary' : 'disabled';

  const formSubmit: SubmitHandler<FieldValues> = async (data) => {
    onSubmit(data);
  };

  const type = watch('type');
  const prevType = useRef();

  useEffect(() => {
    prevType.current = type;
  }, []);

  useEffect(() => {
    const isDog = type === '강아지';
    const isCat = type === '고양이';
    setSpeciesOption(isDog ? DOG_BREED_OPTION : isCat ? CAT_BREED_OPTION : DOG_BREED_OPTION);
    setSelectDisabled(type === '');
    if (prevType.current !== type) {
      setValue('species', '');
      prevType.current = type;
    }
  }, [type, prevType]);
  return (
    <Form onSubmit={handleSubmit(formSubmit)} methods={methods}>
      <div className={styles.fileBox}>
        <FileImage imageValue={watch('imageId')} imageUrl={defaultData?.url} watchType={watch('type')} />
        <FileInput name="imageId" id="file" control={control} />
      </div>
      <ul className={styles.listContainer}>
        <li className={styles.nameInputBox}>
          <Form.Label htmlFor="name">이름</Form.Label>
          <Form.MainInput name="name" />
        </li>
        <li className={styles.sexInputBox}>
          <Form.Label htmlFor="sex">성별</Form.Label>
          <Radio options={GENDER_OPTION} control={control} name="sex" />
        </li>
        <li className={styles.birthInputBox}>
          <Form.Label htmlFor="birthDate">생일</Form.Label>
          <Form.DateInput name="birthDate" control={control} />
        </li>
        <li className={styles.adoptionInputBox}>
          <Form.Label htmlFor="adoptionDate">입양일</Form.Label>
          <Form.DateInput name="adoptionDate" control={control} />
        </li>
        <li className={styles.kindInputBox}>
          <Form.Label htmlFor="type">종류</Form.Label>
          <Form.SelectInput name="type" options={KIND_OPTION} control={control} placeholder="종류를 선택해주세요" />
        </li>
        <li className={styles.breedInputBox}>
          <Form.Label htmlFor="species">품종</Form.Label>
          <Form.SelectInput
            name="species"
            options={speciesOPtion!}
            control={control}
            placeholder="품종을 선택해주세요"
            disabled={selectDisabled}
          />
        </li>
        <li className={styles.weightInputBox}>
          <Form.Label htmlFor="무게">무게</Form.Label>
          <Form.WeightInput name="weight" />
        </li>
        <li className={styles.isNeuteredInputBox}>
          <Form.Label htmlFor="isNeutered">중성화</Form.Label>
          <Radio options={NEUTERED_OPTION} control={control} name="isNeutered" />
        </li>
      </ul>
      <div className={styles.buttonBox}>
        <Button type="submit" className={buttonClassCondition} round>
          {buttonText}
        </Button>
      </div>
    </Form>
  );
}
