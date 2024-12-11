import { DarkModeToggle } from './components/ui/toggles';
import { Lamp } from './components/lamp';
import WaveScrollAnimation from './components/ui/animated-text';
import { ExpandableCardDemo } from './components/ui/expand-cards';
import { motion } from 'motion/react';
import { useTheme } from './constants/theme-context';
import { LampSmall } from './components/lampbu';
//import { Nav } from './components/navig8';
import { Vision } from './components/Vision';
import { Footer } from './components/ui/Footer';

const App = () => {
	const { theme } = useTheme();
	return (
		<div className={`${theme} min-h-screen w-full overflow-x-hidden bg-white bg-cover bg-center dark:bg-p-dark`}>

			<div className='fixed right-6 top-6 z-[999]'>
				<DarkModeToggle />
			</div>

			<main className=''>
				<div className='hero'>
					<div className='hidden md:block'>
						<Lamp />
					</div>
					<div className='md:hidden'>
						<LampSmall />
					</div>
					<motion.div
						initial={{ opacity: 0, y: -5 }}
						whileInView={{ opacity: 1, y: 10 }}
						transition={{
							duration: 0.3,
							ease: 'easeOut',
						}}
						layoutScroll
						className='flex itext-center tems-center justify-center w-full'>
						<p className='font-semibold uppercase text-black text-center dark:text-white'>Our Mission is Simple</p>
					</motion.div>
					<div className='relative flex items-start h-[50vh] justify-center w-full mx-auto z-10'>
						<WaveScrollAnimation />
						<div className='grid-background'></div>
					</div>
				</div>
				<div className='relative pb-24 z-50'>
					<ExpandableCardDemo />
					<div className='grid-background'></div>
				</div>

				<div className='relative'>
					<Vision />
					<div className='grid-background-z'></div>
				</div>

				<div className='relative mx-auto items-center flex max-w-5xl px-4'>
					<motion.p
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.8, ease: 'easeOut' }}
						className='my-12 py-12 text-3xl leading-relaxed text-n-9 dark:text-n-1'>
						We want to empower small businesses & individual professionals through honest, low-cost design.
					</motion.p>
					<div className='bg-conic/[in_hsl_longer_hue] from-red-600 to-red-600 size-24 rounded-full'></div>
					<div className='bg-radial-[at_25%_25%] from-white to-zinc-900 to-75% size-24 rounded-full'></div>

					<motion.article
						className='pt-12'
						initial={{ opacity: 0, y: 75 }}
						animate={{
							opacity: 1,
							y: 0,
							transition: { delay: 0.5, duration: 1, ease: 'easeInOut' },
						}}
						onUpdate={latest => console.log(latest.opacity)}>
						<div className='empowerment-text'>Non mollit consequat quis. Magna esse ex elit eiusmod laboris. Fugiat aute aliquip tempor. Culpa est anim aliquip est labore.</div>
					</motion.article>
					<div className='grid-background-z'></div>
				</div>

				<div className='relative'>
					<Footer />
				</div>
			</main>
		</div>
	);
};

export default App;
