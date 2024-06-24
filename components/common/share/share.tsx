import ShareModal from '@/components/start-pet/finish/share-modal/share-modal';
import { ModalType } from '@/hooks/use-modal';
import { AnimatePresence } from 'framer-motion';

interface ShareType extends ModalType {
  code: string;
}

export default function Share({ Modal, handleModal, code, isOpen }: ShareType) {
  const closeModal = () => {
    handleModal(false);
  };
  return (
    <AnimatePresence>
      {isOpen && (
        <Modal>
          <ShareModal closeModal={closeModal} code={code} />
        </Modal>
      )}
    </AnimatePresence>
  );
}
