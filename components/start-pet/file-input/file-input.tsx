import { Controller, FieldValues, UseFormReturn } from 'react-hook-form';
import FileButtonSVG from '@/public/images/start-pet/fileButton.svg';
import styles from './file-input.module.scss';
import { useRef } from 'react';
import useModal from '@/hooks/use-modal';
import ImageModal from '../image-modal/image-modal';

interface FileInputType {
  id: string;
  name: string;
  control: UseFormReturn<FieldValues>['control'];
}

export default function FileInput({ id, name, control }: FileInputType) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [Modal, handleModal, isOpen] = useModal();

  const handleButtonClick = () => {
    handleModal(true);
  };
  return (
    <>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <>
            <button className={styles.fileButton} type="button" onClick={handleButtonClick} title="프로필 이미지 변경">
              <input
                className={styles.fileInput}
                type="file"
                accept="image/*"
                id={id}
                onChange={(e) => {
                  field.onChange(e.target.files);
                  handleModal(false);
                }}
                ref={(e) => {
                  field.ref(e);
                  fileInputRef.current = e;
                }}
              />
              <FileButtonSVG />
            </button>
            <ImageModal
              Modal={Modal}
              handleModal={handleModal}
              fileInputRef={fileInputRef}
              field={field}
              isOpen={isOpen}
            />
          </>
        )}
      />
    </>
  );
}
