import LinkList from '@/components/start-family/link-list/link-list';
import Title from '@/components/common/title/title';
import SubTitle from '@/components/common/title/sub-title/sub-title';
import TitleText from '@/components/common/title/title-text/title-text';
import styles from './index.module.scss';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { setCookie } from 'cookies-next';
import SwitchScreen from '@/components/framer/switch-screen/switch-screen';

export default function StartFamily() {
  const {
    query: { accessToken, refreshToken, isFamily },
    isReady,
  } = useRouter();

  useEffect(() => {
    if (!isReady) return;
    if (accessToken) {
      setCookie('accessToken', accessToken);
    }
    if (refreshToken) {
      setCookie('refreshToken', refreshToken);
    }
    if (isFamily) {
      setCookie('isFamily', isFamily);
    }
  }, [isReady]);

  return (
    <SwitchScreen>
      <section className={styles.section}>
        <div className={styles.titleBox}>
          <SubTitle>너! 내 가족이 되라!</SubTitle>
          <Title>가족만들기</Title>
          <TitleText>
            가족과 관련된 소개 문구
            <br />
            ex. 동그리나는 가족, 친구,연인과 함께 사용할 수 있는 플랫폼이에요. 동그리나에서 같이 사용할 가족을
            만들어보세요.
          </TitleText>
        </div>
        <LinkList />
      </section>
    </SwitchScreen>
  );
}
