import type { AppProps } from 'next/app';
import '@/styles/globals.css';
import { Header } from '@/components/common/Header';
import { useRouter } from 'next/router';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  const isLoginPage = () => {
    return router.pathname === '/login';
  };
  const isLandingPage = () => {
    return (router.pathname = '/landing');
  };
  const is404Page = () => {
    return (router.pathname = '/404');
  };

  return (
    <div id="__wrap">
      <main id="__container">
        {(!isLoginPage() || !is404Page() || !isLandingPage()) && <Header />}
        <Component {...pageProps} />
      </main>
    </div>
  );
}
