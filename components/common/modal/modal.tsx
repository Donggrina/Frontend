import { motion } from 'framer-motion';
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
    <motion.div
      key="outer"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={styles.outer}
      onClick={handleClose}
    >
      <motion.div
        key="inner"
        initial={{ scale: 0, x: '-50%', y: '-50%' }}
        animate={{ scale: 1, x: '-50%', y: '-50%' }}
        exit={{ scale: 0, x: '-50%', y: '-50%' }}
        className={styles.inner}
        onClick={handleClick}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
