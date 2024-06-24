import { RefObject } from 'react';
import styles from './image-modal.module.scss';
import Button from '@/components/common/button/button';
import CloseSVG from '@/public/images/pets/plus-circle.svg';
import { ControllerRenderProps, FieldValues } from 'react-hook-form';
import { ModalType } from '@/hooks/use-modal';
import { AnimatePresence } from 'framer-motion';

interface ImageModalType extends ModalType {
  fileInputRef: RefObject<HTMLInputElement>;
  field: ControllerRenderProps<FieldValues, string>;
}

export default function ImageModal({ Modal, handleModal, fileInputRef, field, isOpen }: ImageModalType) {
  const handleClose = () => {
    handleModal(false);
  };
  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  const handleInitialization = () => {
    field.onChange(null);
    handleModal(false);
  };
  return (
    <AnimatePresence>
      {isOpen && (
        <Modal>
          <div className={styles.modalContainer}>
            <p>프로필 사진을 변경하시겠습니까?</p>
            <div className={styles.buttonBox}>
              <Button type="button" className="default" onClick={handleInitialization} leftRound>
                이미지 초기화 하기
              </Button>
              <Button type="button" className="primary" onClick={handleButtonClick} rightRound>
                이미지 변경하기
              </Button>
            </div>
            <button className={styles.modalCloseButton} onClick={handleClose} type="button" title="모달 닫기">
              <CloseSVG />
            </button>
          </div>
        </Modal>
      )}
    </AnimatePresence>
  );
}
