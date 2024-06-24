import Button from '@/components/common/button/button';
import useModal from '@/hooks/use-modal';
import DeleteModal from './delete-modal/delete-modal';

export default function FamilyDeleteButton() {
  const [Modal, handleModal, isOpen] = useModal();
  const handleOpen = () => {
    handleModal(true);
  };
  return (
    <>
      <Button type="button" className="tertiary" round onClick={handleOpen}>
        가족 폐쇄
      </Button>
      <DeleteModal isOpen={isOpen} Modal={Modal} handleModal={handleModal} />
    </>
  );
}
