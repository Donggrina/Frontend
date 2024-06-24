import { horizontalVariants } from '@/components/framer';
import FamilyListItem from '../family-list-item/family-list-item';
import { Member, MyPageDetails } from '@/types/my-page/family';
import { motion } from 'framer-motion';
import styles from './family-list.module.scss';

export default function FamilyList({ data }: MyPageDetails) {
  if (!data) return null;
  const owner = data.members[0].id;
  return (
    <ul>
      {data.members.map((membersData: Member, index) => {
        const membersValue = {
          index: index,
          owner: owner,
          ...membersData,
        };
        const listClass = data.membersCount === 1 ? `${styles.onlyOne} ${styles.familyList}` : styles.familyList;
        return (
          <motion.li
            className={listClass}
            variants={horizontalVariants}
            initial="hidden"
            animate="visible"
            key={membersData.id}
            custom={index}
          >
            <FamilyListItem membersValue={membersValue} />
          </motion.li>
        );
      })}
    </ul>
  );
}
