import ModalPortal from '@/components/common/modal/modal-portal';
import { PropsWithChildren, ReactNode, useState } from 'react';

export interface ModalType {
  Modal: ({ children }: PropsWithChildren) => ReactNode;
  handleModal: (isOpen: boolean) => void;
  isOpen: boolean;
}

/**
 * @returns {Array}
 * - 모달에 띄울 요소를 Modal 컴포넌트의 children으로 전달해주세요.
 * - handleModal에 불리언 값을 전달해서 Modal 컴포넌트를 열고 닫으세요.
 */
export default function useModal(): [
  Modal: ({ children }: PropsWithChildren) => ReactNode,
  (isOpen: boolean) => void,
  isOpen: boolean,
] {
  const [isOpen, setIsOpen] = useState(false);

  const handleModal = (isOpen: boolean) => {
    setIsOpen(isOpen);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const Modal = ({ children }: PropsWithChildren) => (
    <>{isOpen && <ModalPortal onClose={handleClose}>{children}</ModalPortal>}</>
  );

  return [Modal, handleModal, isOpen];
}
