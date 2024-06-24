import ModifyPetForm from '@/components/common/modify-pet-form/modify-pet-form';
import SwitchScreen from '@/components/framer/switch-screen/switch-screen';

export default function MypagePetModify() {
  return (
    <SwitchScreen>
      <ModifyPetForm routeUrl="/mypage/pet" />
    </SwitchScreen>
  );
}
