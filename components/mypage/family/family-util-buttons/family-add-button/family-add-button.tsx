import MyFamilyApi from '@/api/my/groups';
import Button from '@/components/common/button/button';
import Share from '@/components/common/share/share';
import useModal from '@/hooks/use-modal';
import { useState } from 'react';

export default function FamilyAddButton() {
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
    <>
      <Button type="button" className="primary" round onClick={openModal}>
        가족 추가
      </Button>
      <Share Modal={Modal} handleModal={handleModal} code={code} isOpen={isOpen} />
    </>
  );
}
