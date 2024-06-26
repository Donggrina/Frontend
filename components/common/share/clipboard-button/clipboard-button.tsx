import { onCopy } from '@/utils/clipboard';
import ClipboardSVG from '@/public/images/share/Copy_alt.svg';
import styles from './clipboard-button.module.scss';

interface ClipboardType {
  code: string;
  onClick: () => void;
}

export default function ClipboardButton({ code, onClick }: ClipboardType) {
  const handleClick = async () => {
    try {
      await onCopy(code);
      onClick();
    } catch {
      console.log('복사 실패');
    }
  };
  return (
    <div className={styles.ClipboardButtonBox}>
      <button type="button" onClick={handleClick} title="가족코드 복사하기">
        <ClipboardSVG />
      </button>
      <span>클립보드</span>
    </div>
  );
}
