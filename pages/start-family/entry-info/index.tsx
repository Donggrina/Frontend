import Title from '@/components/common/title/title';
import SubTitle from '@/components/common/title/sub-title/sub-title';
import Form from '@/components/common/Form';
import Button from '@/components/common/button/button';
import styles from './index.module.scss';
import axios from 'axios';
import { useRouter } from 'next/router';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import MyFamilyApi from '@/api/my/groups';
import myPageApiInstance from '@/api/my/user';
import { setCookie } from 'cookies-next';
import SwitchScreen from '@/components/framer/switch-screen/switch-screen';

export default function CreateFamily() {
  const myProfile = myPageApiInstance;
  const myFamilyApi = new MyFamilyApi();
  const router = useRouter();
  const methods = useForm<FieldValues>({
    mode: 'onBlur',
  });
  const { handleSubmit, formState, setError } = methods;
  const buttonClassCondition = formState.isValid ? 'primary' : 'disabled';
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      await myFamilyApi.myFamilyCreate(data).then(async () => {
        const response = await myProfile.getProfile();
        localStorage.setItem('userId', response.id.toString());
        setCookie('isFamily', true);
        router.replace('/start-family/entry-info/finish');
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError('name', {
          type: 'duplication',
          message: error.response!.data.message,
        });
      }
    }
  };

  return (
    <SwitchScreen>
      <section style={{ padding: '126px 24px 0 24px' }}>
        <div>
          <SubTitle>가족등록하기</SubTitle>
          <Title>가족신청서</Title>
        </div>
        <Form onSubmit={handleSubmit(onSubmit)} methods={methods}>
          <ul className={styles.formList}>
            <li className={styles.nameInput}>
              <Form.Label htmlFor="name">가족의 이름을 알려주세요!</Form.Label>
              <Form.MainInput name="name" />
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
