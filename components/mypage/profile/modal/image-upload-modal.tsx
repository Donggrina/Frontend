import React, { RefObject } from 'react';
import Button from '@/components/common/button/button';
import styles from './image-upload-modal.module.scss';
import { useUpdateProfile } from '@/hooks/queries/my/user/mutation';
import { AnimatePresence } from 'framer-motion';
import { ModalType } from '@/hooks/use-modal';
import CloseSVG from '@/public/images/pets/plus-circle.svg';

interface ModalImageProps extends ModalType {
  uploadRef: RefObject<HTMLInputElement>;
  onPreview: () => void;
  imageId: number | null;
  nickname: string;
}

export default function ImageUploadModal(props: ModalImageProps) {
  const handleUpload = async () => props.uploadRef.current!.click();
  const handleClose = () => {
    props.handleModal(false);
  };
  const profileMutation = useUpdateProfile();
  const handleResetImage = () =>
    profileMutation.mutate({ imageId: null, nickname: props.nickname }, { onSuccess: () => props.handleModal(false) });

  return (
    <AnimatePresence>
      {props.isOpen && (
        <props.Modal>
          <div className={styles['modal-box']}>
            <p className={styles['modal-text']}>프로필 사진을 변경하시겠습니까?</p>
            <div className={styles['modal-button-layout']}>
              <Button className="default" onClick={handleResetImage} leftRound>
                이미지 초기화 하기
              </Button>
              <Button className="primary" onClick={handleUpload} rightRound>
                이미지 변경하기
              </Button>
            </div>
            <input
              type="file"
              id="profile"
              accept="image/*"
              className={styles['profile-input']}
              ref={props.uploadRef}
              onChange={props.onPreview}
            />
            <button className={styles['modal-close-button']} type="button" onClick={handleClose} title="모달 닫기">
              <CloseSVG />
            </button>
          </div>
        </props.Modal>
      )}
    </AnimatePresence>
  );
}
