import { motion } from 'framer-motion';
import { PropsWithChildren } from 'react';

export default function SwitchScreen({ children }: PropsWithChildren) {
  const animate = {
    hidden: {
      x: '100px',
      opacity: 0,
    },
    visible: {
      x: 0,
      opacity: 1,
    },
    exit: {
      x: '-100px',
      opacity: 0,
    },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={animate}
      transition={{ duration: 0.2, ease: 'easeInOut' }}
    >
      {children}
    </motion.div>
  );
}
