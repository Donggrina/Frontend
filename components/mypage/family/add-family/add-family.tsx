import useModal from '@/hooks/use-modal';
import styles from './add-family.module.scss';
import Share from '@/components/common/share/share';
import { useState } from 'react';
import MyFamilyApi from '@/api/my/groups';
import OpenSVG from '@/public/images/mypage/plus-circle.svg';

export default function AddFamily() {
  const myFamilyApi = new MyFamilyApi();
  const [Modal, handleModal, isOpen] = useModal();
  const [code, setCode] = useState('');
  const handleGetCode = async () => {
    try {
      const response = await myFamilyApi.myFamilyCode();
      setCode(response.data.code);
    } catch {
      console.log('에러');
    }
  };
  const openModal = () => {
    handleModal(true);
    handleGetCode();
  };
  return (
    <div className={styles.addFamilyBox}>
      <h2>가족관리</h2>
      <button className={styles.openModal} onClick={openModal} title="가족 초대 모달 열기">
        <OpenSVG />
      </button>
      <Share Modal={Modal} handleModal={handleModal} code={code} isOpen={isOpen} />
    </div>
  );
}
