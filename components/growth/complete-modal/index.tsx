import React from 'react';
import styles from './complete-modal.module.scss';
import Button from '@/components/common/button/button';

interface CompleteModalProps {
  closeModal: () => void;
  text: string;
}
export default function CompleteModal({ closeModal, text }: CompleteModalProps) {
  return (
    <div className={styles.box}>
      <p className={styles.text}>{text}</p>
      <div className={styles.buttonBox}>
        <Button className="primary" type="button" onClick={closeModal} rightRound leftRound>
          닫기
        </Button>
      </div>
    </div>
  );
}
