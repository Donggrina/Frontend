import type { AppProps } from 'next/app';
import '@/styles/globals.css';
import { isNav } from '@/utils/is-nav';
import { useRouter } from 'next/router';
import Nav from '@/components/common/nav/nav';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState, useRef } from 'react';
import usePullReload from '@/hooks/use-pull-to-refresh';
import Spinner from '@/components/spinner/spinner';
import Header from '@/components/common/Header';
import { AnimatePresence } from 'framer-motion';

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Kakao: any;
  }
}

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [queryClient] = useState(() => new QueryClient());
  const containerRef = useRef(null);
  const isDragging = usePullReload({ queryClient, containerRef });

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <div id="__wrap">
          <main id="__container" ref={containerRef}>
            <Header router={router} />
            {isDragging && <Spinner />}
            <AnimatePresence mode="wait">
              <div key={router.route}>
                <Component {...pageProps} key={router.route} />
              </div>
            </AnimatePresence>
            {isNav(router) && <Nav />}
          </main>
        </div>
      </QueryClientProvider>
    </>
  );
}
