import styles from './404.module.scss';
import Button from '@/components/common/button/button';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { useEffect } from 'react';

export default function Page404() {
  const router = useRouter();
  const handleBack = () => {
    router.back();
  };
  const pathVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        duration: 1.5,
        ease: 'easeInOut',
      },
    },
  };
  useEffect(() => {
    if (router.route === '/404') router.replace('/404');
  }, []);
  return (
    <article className={styles.page404}>
      <section>
        <div className={styles.textBox}>
          <p>!</p>
          <span>404</span>
        </div>
        <div className={styles.mainTextBox}>
          <svg width="206" height="116" viewBox="0 0 206 116" fill="none" xmlns="http://www.w3.org/2000/svg">
            <motion.path
              d="M164.284 84.188C166.069 84.188 198.882 85.7748 202.951 101.95C204.736 109.055 157.74 106.095 157.74 106.095"
              fill="#8FCC93"
              initial="hidden"
              animate="visible"
              variants={pathVariants}
            />
            <motion.path
              d="M164.284 84.188C166.069 84.188 198.882 85.7748 202.951 101.95C204.736 109.055 157.74 106.095 157.74 106.095"
              stroke="#DADADA"
              stroke-width="5"
              stroke-linecap="round"
              stroke-linejoin="round"
              initial="hidden"
              animate="visible"
              variants={pathVariants}
            />
            <motion.path
              d="M7.73301 59.0129C9.04174 47.4555 12.0399 35.9217 16.3468 25.0985C19.583 16.9514 32.9082 20.5276 29.6483 28.7694C25.8411 38.3848 22.7239 48.8291 21.558 59.155C20.5586 67.8467 6.75741 67.8231 7.75681 59.0129H7.73301Z"
              fill="white"
              stroke="#DADADA"
              stroke-width="5"
              stroke-linecap="round"
              stroke-linejoin="round"
              initial="hidden"
              animate="visible"
              variants={pathVariants}
            />
            <motion.path
              d="M78.9811 106.166L169.046 106.758C169.046 106.758 173.424 89.2091 168.665 89.2091C163.906 89.2091 149.867 87.6696 149.867 87.6696L129.784 80.6357L123.097 69.3862L94.9715 41.7241C93.9483 42.8136 92.9251 43.8556 91.9495 44.874L85.382 47.1239C82.2173 48.3791 25.6563 47.1239 25.6563 47.1239C5.35909 51.529 3.43168 71.1387 3.43168 71.1387C2.45608 81.2041 2.71783 89.7538 8.6904 98.6824C7.92896 97.5219 5.59704 100.435 5.26391 101.003C3.76482 103.703 3.64584 108.985 7.02474 110.429C12.569 112.798 54.615 112.395 54.615 112.395L79.1953 112.774V109.624C80.7896 93.8273 61.7535 97.7824 61.7535 97.7824C60.9682 82.7909 38.7436 78.0542 34.7936 78.0542"
              fill="white"
              initial="hidden"
              animate="visible"
              variants={pathVariants}
            />
            <motion.path
              d="M78.9811 106.166L169.046 106.758C169.046 106.758 173.424 89.2091 168.665 89.2091C163.906 89.2091 149.867 87.6696 149.867 87.6696L129.784 80.6357L123.097 69.3862L94.9714 41.7241C93.9483 42.8136 92.9251 43.8556 91.9495 44.874L85.382 47.1239C82.2173 48.3791 25.6563 47.1239 25.6563 47.1239C5.35909 51.529 3.43168 71.1387 3.43168 71.1387C2.45608 81.2041 2.71783 89.7538 8.6904 98.6824C7.92896 97.5219 5.59704 100.435 5.26391 101.003C3.76482 103.703 3.64584 108.985 7.02474 110.429C12.569 112.798 54.615 112.395 54.615 112.395L79.1953 112.774V109.624C80.7896 93.8273 61.7535 97.7824 61.7535 97.7824C60.9682 82.7909 38.7436 78.0542 34.7936 78.0542"
              stroke="#DADADA"
              stroke-width="5"
              stroke-linecap="round"
              stroke-linejoin="round"
              initial="hidden"
              animate="visible"
              variants={pathVariants}
            />
            <motion.path
              d="M143.467 14.9148C161.314 16.0989 165.478 38.0059 166.667 47.4792C167.857 56.9525 161.314 69.9783 161.314 69.9783L162.741 89.1855L139.422 86.4145L119.077 75.8992L91.9746 44.8741C91.9746 44.8741 125.621 13.7306 143.467 14.9148Z"
              fill="white"
              stroke="#DADADA"
              stroke-width="5"
              stroke-linecap="round"
              stroke-linejoin="round"
              initial="hidden"
              animate="visible"
              variants={pathVariants}
            />
            <motion.path
              d="M137.516 15.5067C137.516 15.5067 161.311 1.88882 172.613 3.07298C179.99 3.85453 158.598 39.8768 158.598 39.8768"
              fill="white"
              initial="hidden"
              animate="visible"
              variants={pathVariants}
            />
            <motion.path
              d="M137.516 15.5067C137.516 15.5067 161.311 1.88882 172.613 3.07298C179.99 3.85453 158.598 39.8768 158.598 39.8768"
              stroke="#DADADA"
              stroke-width="5"
              stroke-linecap="round"
              stroke-linejoin="round"
              initial="hidden"
              animate="visible"
              variants={pathVariants}
            />
            <motion.path
              d="M127.781 80.304C127.972 78.9778 127.662 77.4857 126.853 76.1358L102.773 36.94C101.107 34.2401 97.9423 33.1507 95.7055 34.5006L93.1594 36.04C90.9227 37.4136 90.4468 40.7056 92.1125 43.4055L112.219 76.1595C116.264 76.3016 122.07 77.1542 127.781 80.304Z"
              fill="#8FCC93"
              stroke="#8FCC93"
              stroke-width="5"
              stroke-linecap="round"
              stroke-linejoin="round"
              initial="hidden"
              animate="visible"
              variants={pathVariants}
            />
            <motion.path
              d="M149.41 69.9779L156.549 64.0571"
              stroke="#DADADA"
              stroke-width="5"
              stroke-linecap="round"
              stroke-linejoin="round"
              initial="hidden"
              animate="visible"
              variants={pathVariants}
            />
            <motion.path
              d="M182.722 105.503C182.722 105.503 182.127 88.333 191.05 87.1489C191.05 87.1489 177.963 75.8993 165.471 80.0439C165.471 80.0439 157.142 88.9251 162.496 105.503H182.722Z"
              fill="#8FCC93"
              stroke="#DADADA"
              stroke-width="5"
              stroke-linecap="round"
              stroke-linejoin="round"
              initial="hidden"
              animate="visible"
              variants={pathVariants}
            />
          </svg>
          <p>페이지를 찾지 못했습니다.</p>
        </div>
        <div className={styles.buttonBox}>
          <Button onClick={handleBack} type="button" className="primary" round>
            이전 페이지로 돌아가기
          </Button>
        </div>
      </section>
    </article>
  );
}
