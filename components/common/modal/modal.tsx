import styles from './modal.module.scss';
import { MouseEvent, ReactNode } from 'react';

export interface ModalCommonProps {
  children?: ReactNode;
  onClose: () => void;
}

export default function Modal({ children, onClose }: ModalCommonProps) {
  const handleClose = () => {
    onClose();
  };

  const handleClick = (e: MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div className={styles.outer} onClick={handleClose}>
      <div className={styles.inner} onClick={handleClick}>
        {children}
      </div>
    </div>
  );
}
