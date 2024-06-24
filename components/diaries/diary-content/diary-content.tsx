import styles from './diary-content.module.scss';
import Profile from '../diary-content/profile';
import Content from '../diary-content/content';
import Response from '../diary-content/response';
import Kebab from '../diary-content/kebab';
import ContentImage from '../diary-content/content-image';
import DiarySkeleton from '../../skeleton/diary/diary-list/';
import { useDiaries } from '@/hooks/queries/diary/use-diary-query';
import { motion } from 'framer-motion';
import { horizontalVariants } from '@/components/framer';
import { useRouter } from 'next/router';

interface DiaryContentProps {
  date: string;
}

const DiaryContent: React.FC<DiaryContentProps> = ({ date }) => {
  const { data, isError, isLoading } = useDiaries(date);

  const router = useRouter();

  if (isLoading) return <DiarySkeleton />;
  if (!data || data.length === 0) return <></>;
  if (isError) return <p>error</p>;

  return (
    <>
      {data?.map((diary, index) => {
        const handleClick = () => router.push(`/diaries/${diary.diaryId}`);

        return (
          <motion.div
            custom={index}
            variants={horizontalVariants}
            initial="hidden"
            animate="visible"
            key={diary.diaryId}
            className={styles.diaryContent}
            onClick={handleClick}
          >
            <div className={styles.leftContainer}>
              <Profile author={diary.author} authorImage={diary.authorImage} petImages={diary.petImages} />
              <Content content={diary.content} />
              <Response
                commentCount={diary.commentCount}
                favoriteCount={diary.favoriteCount}
                favoriteState={diary.favoriteState}
              />
            </div>
            <div className={styles.rightContainer}>
              {diary.isMyDiary && <Kebab diaryId={diary.diaryId} />}
              <ContentImage contentImage={diary.contentImage} />
            </div>
          </motion.div>
        );
      })}
    </>
  );
};

export default DiaryContent;
