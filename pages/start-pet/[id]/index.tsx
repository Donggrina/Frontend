import ModifyPetForm from '@/components/common/modify-pet-form/modify-pet-form';
import SwitchScreen from '@/components/framer/switch-screen/switch-screen';

export default function PetEntryModify() {
  return (
    <SwitchScreen>
      <ModifyPetForm routeUrl="/start-pet/finish" />
    </SwitchScreen>
  );
}
