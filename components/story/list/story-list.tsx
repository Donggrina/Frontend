import StoryItem from '@/components/story/item/story-item';
import { StoryData } from '@/types/story';
import styles from './story-list.module.scss';
import { motion } from 'framer-motion';
import { horizontalVariants } from '@/components/framer';

interface StoryListProps {
  data: StoryData[];
}

export default function StoryList(props: StoryListProps) {
  return (
    <ul className={styles.wrapper}>
      {props.data.map((page) =>
        page.response.map((story, index) => {
          return (
            <motion.li
              key={story.diaryId}
              custom={index}
              variants={horizontalVariants}
              initial="hidden"
              animate="visible"
            >
              <StoryItem {...story} />
            </motion.li>
          );
        }),
      )}
    </ul>
  );
}
