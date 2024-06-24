import styles from './index.module.scss';
import LoginTop from '@/components/login/login-top/login-top';
import LoginButtons from '@/components/login/login-buttons/login-buttons';
import SwitchScreen from '@/components/framer/switch-screen/switch-screen';

export default function Login() {
  return (
    <SwitchScreen>
      <section className={styles.section}>
        <LoginTop />
        <LoginButtons />
      </section>
    </SwitchScreen>
  );
}
