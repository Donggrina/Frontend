import Hyperlink from '@/components/common/button/hyperlink';
import Button from '@/components/common/button/button';
import useModal from '@/hooks/use-modal';
import MyFamilyApi from '@/api/my/groups';
import { useState } from 'react';
import Share from '@/components/common/share/share';

export default function PetsLinkList() {
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
      <li>
        <Hyperlink className="secondary" href="/start-pet" round>
          반려동물 추가하기
        </Hyperlink>
      </li>
      <li>
        <Button type="button" className="primary" round onClick={openModal}>
          가족 초대하기
        </Button>
      </li>
      <li>
        <Hyperlink className="tertiary" href="/family" round>
          다음에 초대하기
        </Hyperlink>
      </li>
      <Share Modal={Modal} handleModal={handleModal} code={code} isOpen={isOpen} />
    </>
  );
}
