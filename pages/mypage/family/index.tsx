import AddFamily from '@/components/mypage/family/add-family/add-family';
import styles from './index.module.scss';
import FamilyList from '@/components/mypage/family/family-list/family-list';
import FamilyUtilButtons from '@/components/mypage/family/family-util-buttons/family-util-buttons';
import Script from 'next/script';
import { useGetFamilyAllQuery } from '@/hooks/queries/my/family/useGetFamilyQueries';

export default function MypageFamily() {
  const { data } = useGetFamilyAllQuery();
  if (!data) return null;
  return (
    <>
      <section className={styles.section}>
        <div className={styles.familyContainer}>
          <AddFamily />
          <FamilyList data={data} />
        </div>
        <FamilyUtilButtons data={data} />
      </section>
      <Script
        src="https://t1.kakaocdn.net/kakao_js_sdk/2.7.2/kakao.min.js"
        integrity={process.env.NEXT_PUBLIC_KAKAO_INTEGRITY_VALUE}
        crossOrigin="anonymous"
      ></Script>
    </>
  );
}
