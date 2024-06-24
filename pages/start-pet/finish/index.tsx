import Title from '@/components/common/title/title';
import styles from './index.module.scss';
import PetsList from '@/components/start-pet/finish/pets-list/pets-list';
import PetsLinkList from '@/components/start-pet/finish/pets-link-list/pets-link-list';
import Script from 'next/script';
import SwitchScreen from '@/components/framer/switch-screen/switch-screen';

export default function FinishPet() {
  return (
    <SwitchScreen>
      <section className={styles.section}>
        <div>
          <Title>반려동물 등록 완료</Title>
          <PetsList />
          <p className={styles.petsInfoText}>가족 초대와 관련된 안내 문구</p>
          <ul className={styles.linkList}>
            <PetsLinkList />
          </ul>
        </div>
        <Script
          src="https://t1.kakaocdn.net/kakao_js_sdk/2.7.2/kakao.min.js"
          integrity={process.env.NEXT_PUBLIC_KAKAO_INTEGRITY_VALUE}
          crossOrigin="anonymous"
        ></Script>
      </section>
    </SwitchScreen>
  );
}
