import AddPetForm from '@/components/common/add-pet-form/add-pet-form';
import SwitchScreen from '@/components/framer/switch-screen/switch-screen';

export default function PetAddPage() {
  return (
    <SwitchScreen>
      <AddPetForm routeUrl="/mypage/pet" />
    </SwitchScreen>
  );
}
