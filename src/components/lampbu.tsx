import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';


export function LampSmall({ contentHeight = false }) {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start end', 'end start'],
  });

  const transition = {
    type: 'spring',
    stiffness: 70,
    damping: 20,
    mass: 1.5,
    restDelta: 0.005,
  };

  const opacity = useTransform(scrollYProgress, [0, 0.5], [0.2, 1]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.9, 1]);
  const y = useTransform(scrollYProgress, [0, 0.5], [20, 0]);

  return (
    <div className='relative w-full pt-24'>
      <motion.div
        transition={transition}
        ref={targetRef}
        className='z-0 w-full bg-white bg-cover bg-center dark:bg-p-dark'
        style={{
          height: contentHeight ? 'auto' : '80vh',
          opacity,
          scale,
          y,
        }}>


        <motion.div className='relative flex items-center justify-center w-full h-full' transition={transition}>
          <LampGradientSmall />
          <div className='relative z-10'>
            <LampContentSmall />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

const LampContentSmall = () => (
  <div className='relative z-50 flex w-full flex-col px-4'>
    <motion.h1
      initial={{ opacity: 0.5, y: 0 }}
      whileInView={{ opacity: 1, y: -40 }}
      transition={{
        delay: 0.5,
        duration: 0.8,
        ease: 'easeOut',
      }}
      className='relative w-full text-a-dark dark:text-white text-center font-black tracking-tight pb-8 text-4xl md:text-6xl'>
      Standing out <br /> shouldn't mean <br /> overspending.
    </motion.h1>
    <motion.div
      initial={{ opacity: 0.5, y: 20 }}
      whileInView={{ opacity: 1, y: -10 }}
      transition={{
        delay: 1,
        duration: 0.6,
        ease: 'easeOut',
      }}
      className='relative z-[999] flex flex-col items-center pt-4'>
      <motion.button
        whileHover={{ scale: 1.015 }}
        whileTap={{ scale: 0.985 }}
        className='mt-4 w-48 rounded-lg bg-p py-3 font-semibold uppercase text-white text-sm dark:bg-a'>
        Compare
      </motion.button>
      <p className='mt-2 text-center text-xs text-n-9 dark:text-n-3'>Our Prices // Traditional Options</p>
    </motion.div>
  </div>
);

const LampGradientSmall = () => (
  <div className='absolute left-0 right-0 top-0 z-0 flex w-full flex-col items-center justify-center overflow-hidden rounded-md bg-white dark:bg-p-dark min-h-[40vh]'>
    <div className='relative isolate z-0 flex w-full flex-1 scale-y-110 items-center justify-center'>
      <motion.div
        initial={{ opacity: 0, width: '40vw' }}
        whileInView={{ opacity: 1, width: '80vw' }}
        transition={{
          delay: 0.5,
          duration: 0.6,
          ease: 'easeOut',
        }}
        style={{
          backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
        }}
        className='bg-gradient-conic absolute inset-auto right-1/2 h-28 w-full overflow-visible from-s-dark via-transparent to-transparent text-p [--conic-position:from_70deg_at_center_top]'>
        <div className='absolute bottom-0 left-0 z-20 h-20 w-[100%] bg-white [mask-image:linear-gradient(to_top,white,transparent)] dark:bg-p-dark' />
        <div className='absolute bottom-0 left-0 z-20 h-[100%] w-20 bg-white [mask-image:linear-gradient(to_right,white,transparent)] dark:bg-p-dark' />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, width: '40vw' }}
        whileInView={{ opacity: 1, width: '80vw' }}
        transition={{
          delay: 0.5,
          duration: 0.6,
          ease: 'easeOut',
        }}
        style={{
          backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
        }}
        className='bg-gradient-conic absolute inset-auto left-1/2 h-28 w-full from-transparent via-transparent to-s-dark text-white [--conic-position:from_290deg_at_center_top]'>
        <div className='absolute bottom-0 right-0 z-20 h-[100%] w-20 bg-white [mask-image:linear-gradient(to_left,white,transparent)] dark:bg-p-dark' />
        <div className='absolute bottom-0 right-0 z-20 h-20 w-[100%] bg-white [mask-image:linear-gradient(to_top,white,transparent)] dark:bg-p-dark' />
      </motion.div>
			<div className='absolute top-1/2 w-full scale-x-150 bg-p-dark blur-2xl'></div>
			<div className='absolute top-1/2 w-full scale-x-150 bg-white blur-2xl'></div>
      <div className='absolute top-1/2 z-50 h-24 w-full bg-transparent opacity-10 backdrop-blur-md'></div>
      <div className='absolute inset-auto z-50 h-20 w-[70vw] rounded-full bg-s-dark opacity-50 blur-2xl'></div>
      <motion.div
        initial={{ width: '20vw' }}
        whileInView={{ width: '40vw' }}
        transition={{
          delay: 0.5,
          duration: 0.6,
          ease: 'easeOut',
        }}
        className='absolute inset-auto z-30 h-20 w-40 -translate-y-[3rem] rounded-full bg-s blur-xl'></motion.div>
      <motion.div
        initial={{ width: '40vw' }}
        whileInView={{ width: '80vw' }}
        transition={{
          delay: 0.5,
          duration: 0.6,
          ease: 'easeOut',
        }}
        className='absolute inset-auto z-50 h-0.5 w-[80vw] -translate-y-[3rem] bg-s'></motion.div>
      <div className='absolute inset-auto z-40 h-24 w-full -translate-y-[6rem] bg-white dark:bg-p-dark'></div>
    </div>
  </div>
);