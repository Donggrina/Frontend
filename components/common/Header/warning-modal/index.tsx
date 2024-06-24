import Button from '@/components/common/button/button';
import styles from '../../../mypage/family/family-util-buttons/family-delete-button/delete-modal/delete-modal.module.scss';
import { useRouter } from 'next/router';
import { AnimatePresence } from 'framer-motion';
import { ModalType } from '@/hooks/use-modal';

export default function WarningModal({ Modal, handleModal, isOpen }: ModalType) {
  const router = useRouter();
  const handleClose = () => {
    handleModal(false);
  };
  const handleDelete = async () => {
    router.back();
  };
  return (
    <AnimatePresence>
      {isOpen && (
        <Modal>
          <div className={styles.textBox}>
            <strong>잠깐만요!</strong>
            <p>
              작성중인 내용은 저장되지 않습니다.
              <br /> 작성을 종료하시겠습니까?
            </p>
          </div>
          <div className={styles.buttonBox}>
            <Button type="button" className="default" onClick={handleDelete} leftRound>
              작성 종료
            </Button>
            <Button type="button" className="primary" onClick={handleClose} rightRound>
              계속 작성
            </Button>
          </div>
        </Modal>
      )}
    </AnimatePresence>
  );
}
