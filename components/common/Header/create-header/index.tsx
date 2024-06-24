import Image from 'next/image';
import styles from '../Header.module.scss';
import useModal from '@/hooks/use-modal';
import WarningModal from '../warning-modal';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface HeaderProps {
  // handleCreateClick?: () => void;
  headerName?: string;
}

export default function CreateHeader({ headerName }: HeaderProps) {
  const router = useRouter();
  const [Modal, handleModal, isOpen] = useModal();
  const handleOpen = () => {
    if (headerName) {
      handleModal(true);
    } else {
      router.back();
    }
  };

  return (
    <>
      <header className={styles.header}>
        <button className={`${styles.leftIcon} ${styles.backIcon}`} onClick={handleOpen}>
          <Image src="/images/header/arrow-left-black.svg" alt="뒤로 가기" width={20} height={20} />
        </button>
        {headerName ? (
          <div className={`${styles.imageBox} ${styles.headerName}`}>{headerName}</div>
        ) : (
          <div className={styles.imageBox}>
            <Link href="/family">
              <Image src="/images/header/logo.svg" alt="로고" fill />
            </Link>
          </div>
        )}
        {/* <button className={`${styles.rightIcon} ${styles.createButton}`} onClick={handleCreateClick}>
          등록
        </button> */}
      </header>
      <WarningModal Modal={Modal} handleModal={handleModal} isOpen={isOpen} />
    </>
  );
}
