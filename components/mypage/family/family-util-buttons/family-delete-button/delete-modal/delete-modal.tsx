import Button from '@/components/common/button/button';
import styles from './delete-modal.module.scss';
import MyFamilyApi from '@/api/my/groups';
import { useRouter } from 'next/router';
import { deleteCookie } from 'cookies-next';
import { AnimatePresence } from 'framer-motion';
import { ModalType } from '@/hooks/use-modal';

export default function DeleteModal({ Modal, handleModal, isOpen }: ModalType) {
  const myFamilyApi = new MyFamilyApi();
  const router = useRouter();
  const handleClose = () => {
    handleModal(false);
  };
  const handleDelete = async () => {
    try {
      await myFamilyApi.myFamilyDelete();
      deleteCookie('accessToken');
      deleteCookie('refreshToken');
      router.push('/');
    } catch {
      console.log('에러');
    }
  };
  return (
    <AnimatePresence>
      {isOpen && (
        <Modal>
          <div className={styles.textBox}>
            <strong>정말 폐쇄하실건가요?</strong>
            <p>
              반려동물 정보와 기록들은
              <br /> 자동으로 삭제되어 복구할 수 없습니다.
            </p>
          </div>
          <div className={styles.buttonBox}>
            <Button type="button" className="default" onClick={handleDelete} leftRound>
              예
            </Button>
            <Button type="button" className="primary" onClick={handleClose} rightRound>
              아니오
            </Button>
          </div>
        </Modal>
      )}
    </AnimatePresence>
  );
}
