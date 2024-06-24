export const horizontalVariants = {
  hidden: {
    opacity: 0,
    x: '80px',
  },
  visible: (index: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: index * 0.2,
      type: 'spring',
      mass: 0.8,
      damping: 13,
      duration: 0.5,
    },
  }),
};
