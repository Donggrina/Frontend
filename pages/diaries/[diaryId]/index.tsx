import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import styles from './diary-id.module.scss';
import { useDiaryQuery } from '@/hooks/queries/diary/use-diary-query';
import Profile from '@/components/diaries/diary-content/profile';
import { WEATHER_TYPES } from '@/lib/constants/diaries-constants';
import Image from 'next/image';
import Response from '@/components/diaries/diary-content/response';
import useCommentPostMutation from '@/hooks/queries/diary/use-comment-post-mutation';
import DropdownMenu from '@/components/kebab/kebab';
import useToggle from '@/hooks/use-toggle';
import DiaryComment from '@/components/diaries/diary-content/comment/diary-comment';
import DiaryCommentForm from '@/components/diaries/diary-content/comment/diary-comment-form';
import useDiaryMutation from '@/hooks/queries/diary/use-diary-mutation';
import { useRouter } from 'next/router';
import disintegrateDateTime from '@/utils/disintegrate-date-time';
import DiaryImages from '@/components/diaries/diary-images';
import StoryListItemSkeleton from '@/components/skeleton/story/item/story-list-item-skeleton';
import StoryCommentListSkeleton from '@/components/skeleton/story/comment/list/story-comment-list-skeleton';

export async function getServerSideProps(context: GetServerSidePropsContext & { params: { diaryId: string } }) {
  const { diaryId } = context.params;
  return { props: { diaryId } };
}

export default function DiaryById({ diaryId }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();

  const diaryQuery = useDiaryQuery(diaryId);
  const commentMutation = useCommentPostMutation(diaryId);
  const diaryMutation = useDiaryMutation(diaryId);

  const handleEdit = () => router.push(`/diaries/${diaryId}/edit`);
  const handleDeleteDiary = () => diaryMutation.mutate(undefined, { onSuccess: () => router.push('/diaries') });

  const { isToggle: isOpen, handleCloseToggle: onCloseToggle, handleOpenToggle: onOpenToggle } = useToggle();

  const weatherIcon = diaryQuery.data && WEATHER_TYPES.find((weather) => weather.label === diaryQuery.data.weather);

  const { year, month, date, day } = disintegrateDateTime(diaryQuery.data && diaryQuery.data.date);
  return (
    <main className={styles.outer}>
      <div className={styles.inner}>
        <section className={styles.dateKebab}>
          <p className={styles.date}>
            <span>
              {year}년 {month}월 {date}일 {day}
            </span>
          </p>
          {diaryQuery.data?.isMyDiary && (
            <div className={styles.kebab}>
              <DropdownMenu value={{ isOpen, onCloseToggle, onOpenToggle }}>
                <DropdownMenu.Kebab />
                <div style={{ position: 'relative', right: '16px' }}>
                  <DropdownMenu.Content>
                    <DropdownMenu.Item onClick={handleEdit}>수정</DropdownMenu.Item>
                    <DropdownMenu.Item onClick={handleDeleteDiary}>삭제</DropdownMenu.Item>
                  </DropdownMenu.Content>
                </div>
              </DropdownMenu>
            </div>
          )}
        </section>

        {diaryQuery.isLoading ? (
          <div>
            <StoryListItemSkeleton />
            <StoryCommentListSkeleton />
          </div>
        ) : diaryQuery.isError ? (
          <p>Error: {diaryQuery.error.message}</p>
        ) : diaryQuery.data ? (
          <>
            <section className={styles.profiles}>
              <Profile
                author={diaryQuery.data.author}
                authorImage={diaryQuery.data.authorImage}
                petImages={diaryQuery.data.petImages}
              />
              {weatherIcon && <Image src={weatherIcon.selectedIcon} alt={weatherIcon.label} width={24} height={24} />}
            </section>

            {!!diaryQuery.data.contentImages.length && <DiaryImages images={diaryQuery.data.contentImages} />}

            <section className={styles.content}>{diaryQuery.data.content}</section>

            <Response
              commentCount={diaryQuery.data.comments.length}
              favoriteCount={diaryQuery.data.favoriteCount}
              favoriteState={diaryQuery.data.favoriteState}
            />

            <div className={styles.line}></div>

            <div>
              {diaryQuery.data.comments.map((comment) => (
                <DiaryComment key={comment.commentId} comment={comment} diaryId={diaryId} />
              ))}
            </div>
          </>
        ) : null}
      </div>

      <DiaryCommentForm mutateFn={commentMutation.mutate} placeholder="댓글 입력..." />
    </main>
  );
}
