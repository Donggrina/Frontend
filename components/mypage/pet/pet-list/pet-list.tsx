import { useGetPetsAllQuery } from '@/hooks/queries/my/pets/useGetPetsQueries';
import { PetData } from '@/types/my-page/pet';
import PetListItem from '../pet-list-item/pet-list-item';
import FamilySkeleton from '@/components/skeleton/mypage/family/family-skeleton';
import { motion } from 'framer-motion';
import { horizontalVariants } from '@/components/framer';
import styles from './pet-list.module.scss';

export default function PetList() {
  const { data, isLoading } = useGetPetsAllQuery();

  if (isLoading) return <FamilySkeleton />;
  if (!data) return null;
  return (
    <ul>
      {data.data.map((petData: PetData, index: number) => {
        const listClass = data.data.length === 1 ? `${styles.onlyOne} ${styles.petList}` : styles.petList;
        return (
          <motion.li
            className={listClass}
            variants={horizontalVariants}
            initial="hidden"
            animate="visible"
            custom={index}
            key={petData.petId}
          >
            <PetListItem {...petData} />
          </motion.li>
        );
      })}
    </ul>
  );
}
