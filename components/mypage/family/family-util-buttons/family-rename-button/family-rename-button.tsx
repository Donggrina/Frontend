import Button from '@/components/common/button/button';
import RenameModal from './rename-modal/rename-modal';
import useModal from '@/hooks/use-modal';

interface RenameType {
  name: string;
}

export default function FamilyRenameButton({ name }: RenameType) {
  const [Modal, handleModal, isOpen] = useModal();
  const handleOpen = () => {
    handleModal(true);
  };
  return (
    <>
      <Button type="button" className="secondary" round onClick={handleOpen}>
        가족 이름 변경
      </Button>
      <RenameModal isOpen={isOpen} Modal={Modal} handleModal={handleModal} name={name} />
    </>
  );
}
