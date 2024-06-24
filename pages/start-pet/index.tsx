import AddPetForm from '@/components/common/add-pet-form/add-pet-form';
import SwitchScreen from '@/components/framer/switch-screen/switch-screen';

export default function StartPet() {
  return (
    <SwitchScreen>
      <AddPetForm routeUrl="/start-pet/finish" />
    </SwitchScreen>
  );
}
