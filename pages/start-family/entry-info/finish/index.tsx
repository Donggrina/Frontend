import SubTitle from '@/components/common/title/sub-title/sub-title';
import Title from '@/components/common/title/title';
import Hyperlink from '@/components/common/button/hyperlink';
import styles from './index.module.scss';
import SwitchScreen from '@/components/framer/switch-screen/switch-screen';

export default function EntryFinish() {
  return (
    <SwitchScreen>
      <section className={styles.section}>
        <div>
          <SubTitle>가족등록하기</SubTitle>
          <Title>가족등록 완료</Title>
        </div>
        <div className={styles.linkBox}>
          <Hyperlink className="primary" href="/start-pet" round>
            반려동물 등록하기
          </Hyperlink>
        </div>
      </section>
    </SwitchScreen>
  );
}
