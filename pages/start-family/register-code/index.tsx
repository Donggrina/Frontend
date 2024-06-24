import Title from '@/components/common/title/title';
import SubTitle from '@/components/common/title/sub-title/sub-title';
import styles from './index.module.scss';
import Form from '@/components/common/Form';
import MyFamilyApi from '@/api/my/groups';
import { useRouter } from 'next/router';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import Button from '@/components/common/button/button';
import axios from 'axios';
import myPageApiInstance from '@/api/my/user';
import SwitchScreen from '@/components/framer/switch-screen/switch-screen';
export default function RegisterCode() {
  const myProfile = myPageApiInstance;
  const myFamilyApi = new MyFamilyApi();
  const router = useRouter();
  const methods = useForm<FieldValues>({
    mode: 'onBlur',
  });
  const { handleSubmit, formState } = methods;
  const buttonClassCondition = formState.isSubmitting ? 'disabled' : 'primary';
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      await myFamilyApi.myFamilyAddMember(data).then(async () => {
        const response = await myProfile.getProfile();
        localStorage.setItem('userId', response.id.toString());
        router.replace('/family');
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error.response!.data);
      }
    }
  };
  return (
    <SwitchScreen>
      <section className={styles.section}>
        <div className={styles.titleBox}>
          <SubTitle>가족등록하기</SubTitle>
          <Title>가족등록신청서</Title>
        </div>
        <Form onSubmit={handleSubmit(onSubmit)} methods={methods}>
          <ul className={styles.formList}>
            <li className={styles.nameInput}>
              <Form.Label htmlFor="code">가족 참여 코드를 알려주세요!</Form.Label>
              <Form.MainInput name="code" />
            </li>
            <li>
              <Form.Label htmlFor="nickname">가족 내 본인의 이름을 입력해주세요.</Form.Label>
              <p className={styles.inputDescription}>
                가족 별칭은 우리가족 내에서 닉네임 대신 사용이 됩니다.
                <br /> ex. 별이맘, 오리대빵, 첫째딸
              </p>
              <Form.MainInput name="nickname" />
            </li>
          </ul>
          <div className={styles.buttonBox}>
            <Button type="submit" className={buttonClassCondition} round disabled={formState.isSubmitting}>
              가족 등록하기
            </Button>
          </div>
        </Form>
      </section>
    </SwitchScreen>
  );
}
