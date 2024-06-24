import SwitchScreen from '@/components/framer/switch-screen/switch-screen';
import styles from './index.module.scss';
import AddPet from '@/components/mypage/pet/add-pet/add-pet';
import PetList from '@/components/mypage/pet/pet-list/pet-list';

export default function MypagePet() {
  return (
    <SwitchScreen>
      <section className={styles.section}>
        <div className={styles.container}>
          <AddPet />
          <PetList />
        </div>
      </section>
    </SwitchScreen>
  );
}
