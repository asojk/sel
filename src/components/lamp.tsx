import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

export function Lamp({ contentHeight = false }) {
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
	const scale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1]);
	const y = useTransform(scrollYProgress, [0, 0.5], [50, 0]);

	return (
		<div className='relative h-full w-full'>
			<motion.div
				transition={transition}
				ref={targetRef}
				className='z-0 h-full w-full bg-white bg-cover bg-center dark:bg-p-dark'
				style={{
					height: contentHeight ? 'auto' : '100vh',
					opacity,
					scale,
					y,
				}}>
				<motion.div className='relative flex items-center justify-center w-full h-full' transition={transition}>
					<LampGradient />

					<div className='relative z-10'>
						<LampContent />
					</div>
				</motion.div>
			</motion.div>

		</div>
	);
}

const LampContent = () => (
	<div className='relative z-50 flex w-full flex-col'>
		<motion.h1
			initial={{ opacity: 0.5, y: 0 }}
			whileInView={{ opacity: 1, y: -80 }}
			transition={{
				delay: 0.5,
				duration: 1,
				ease: 'easeOut',
			}}
			className='relative w-full text-center'>
			<LampText />
		</motion.h1>
		<motion.div
			initial={{ opacity: 0.5, y: 50 }}
			whileInView={{ opacity: 1, y: -20 }}
			transition={{
				delay: 1.2,
				duration: 0.8,
				ease: 'easeOut',
			}}
			className='relative z-[999] flex flex-col items-center pt-4'>
			<motion.button
				whileHover={{ scale: 1.015 }}
				whileTap={{ scale: 0.985 }}
				className='mt-4 w-64 rounded-lg bg-p py-4 font-semibold uppercase text-white dark:bg-a'>
				Compare
			</motion.button>

			<p className='mt-3 text-center text-n-9 dark:text-n-3'>Our Prices // Traditional Options</p>
		</motion.div>
	</div>
);

const LampGradient = () => (
	<div className='absolute left-0 right-0 top-0 z-0 flex  w-full flex-col items-center justify-center overflow-hidden rounded-md bg-white dark:bg-p-dark min-h-[50vh]'>
		<div className='relative isolate z-0 flex w-full flex-1 scale-y-125 items-center justify-center'>
			<motion.div
				initial={{ opacity: 0, width: '30vw' }}
				whileInView={{ opacity: 1, width: '60vw' }}
				transition={{
					delay: 0.65,
					duration: 0.8,
					ease: 'easeOut',
				}}
				style={{
					backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
				}}
				className='bg-gradient-conic absolute inset-auto right-1/2 h-14 sm:h-28 md:h-56 w-full sm:w-3/4 md:w-[60vw] overflow-visible from-s-dark via-transparent to-transparent text-p [--conic-position:from_70deg_at_center_top]'>
				<div className='absolute bottom-0 left-0 z-20 h-40 w-[100%] bg-white [mask-image:linear-gradient(to_top,white,transparent)] dark:bg-p-dark' />
				<div className='absolute bottom-0 left-0 z-20 h-[100%] w-40 bg-white [mask-image:linear-gradient(to_right,white,transparent)] dark:bg-p-dark' />
			</motion.div>
			<motion.div
				initial={{ opacity: 0, width: '30vw' }}
				whileInView={{ opacity: 1, width: '60vw' }}
				transition={{
					delay: 0.65,
					duration: 0.8,
					ease: 'easeOut',
				}}
				style={{
					backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
				}}
				className='bg-gradient-conic absolute inset-auto left-1/2 h-56 w-[60vw] from-transparent via-transparent to-s-dark text-white [--conic-position:from_290deg_at_center_top]'>
				<div className='absolute bottom-0 right-0 z-20 h-[100%] w-40 bg-white [mask-image:linear-gradient(to_left,white,transparent)] dark:bg-p-dark' />
				<div className='absolute bottom-0 right-0 z-20 h-40 w-[100%] bg-white [mask-image:linear-gradient(to_top,white,transparent)] dark:bg-p-dark' />
			</motion.div>
			<div className='absolute top-1/2 w-full scale-x-150 bg-p-dark blur-2xl'></div>
			<div className='absolute top-1/2 w-full scale-x-150 bg-white blur-2xl'></div>
			<div className='absolute top-1/2 z-50 h-48 w-full bg-transparent opacity-10 backdrop-blur-md'></div>
			<div className='absolute inset-auto z-50 h-36 w-[50vw] lg:w-[70vw] rounded-full bg-s-dark opacity-50 blur-3xl'></div>
			<motion.div
				initial={{ width: '12vw' }}
				whileInView={{ width: '30vw' }}
				transition={{
					delay: 0.65,
					duration: 0.8,
					ease: 'easeOut',
				}}
				className='absolute inset-auto z-30 h-36 w-64 -translate-y-[6rem] rounded-full bg-s blur-2xl'></motion.div>
			<motion.div
				initial={{ width: '30vw' }}
				whileInView={{ width: '60vw' }}
				transition={{
					delay: 0.65,
					duration: 0.8,
					ease: 'easeOut',
				}}
				className='absolute inset-auto z-50 h-0.5 w-[60vw] -translate-y-[7rem] bg-s'></motion.div>

			<div className='absolute inset-auto z-40 h-44 w-full -translate-y-[12.5rem] bg-white dark:bg-p-dark'></div>
		</div>
	</div>
);

const LampText = () => (
	<div className='font-black tracking-tight pb-8 text-4xl md:text-6xl'>
		<h1 className='p-2 text-transparent bg-clip-text bg-gradient-to-b dark:from-s dark:to-white from-s-2 to-black'>
			Standing out <br /> shouldn't mean <br /> overspending.
		</h1>
	</div>
);

/*
				<Link to="/pricing">
				<motion.button
					whileHover={{ scale: 1.015 }}
					whileTap={{ scale: 0.985 }}
					className="mt-8 w-64 rounded-lg bg-p py-4 font-semibold uppercase text-white dark:bg-a">
					Compare
				</motion.button>
			</Link>
	*/
