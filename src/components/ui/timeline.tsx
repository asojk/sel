import { motion } from 'motion/react'
import useIntersectionObserver from '../../hooks/useIntersectionObserver'
import { useRef } from 'react'

export const TimeLine = () => {
	const ref = useRef<HTMLDivElement>(null)
	const entry = useIntersectionObserver(ref, {
		threshold: 0.5,
	})
	const inView = !!entry?.isIntersecting

	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.2,
				delayChildren: 0.2,
			},
		},
	}

	const itemVariants = {
		hidden: { opacity: 0, y: 20 },
		visible: {
			opacity: 1,
			y: 0,
			transition: {
				duration: 0.5,
				ease: 'easeOut',
			},
		},
	}

	const item2Variants = {
		hidden: { opacity: 0, y: 20 },
		visible: {
			opacity: 1,
			y: 0,
			transition: {
				duration: 0.5,
				ease: 'easeOut',
				delay: 2.7,
			},
		},
	}

	return (
		<section className="flex items-center justify-center w-full lg:subpixel-antialiased">

			<div className="flex flex-col items-center justify-center w-2/3 py-10 space-y-8 lg:space-y-16">
				<motion.div
					className="grid w-full max-w-4xl grid-cols-3 gap-4 px-4 md:gap-8"
					ref={ref}
					variants={containerVariants}
					initial="hidden"
					animate={inView ? 'visible' : 'hidden'}>
					{/* Step 1 */}
					<motion.div className="flex flex-col items-center space-y-2 text-center" variants={itemVariants}>
						<p className="text-5xl font-light text-n-900 dark:text-white">1</p>
						<p className="text-md text-n-9 dark:text-n-3 lg:text-lg">Meet</p>
					</motion.div>
					{/* Arrow 1→2 */}
					<motion.div className="flex items-center justify-center -mt-12" variants={itemVariants}>
						<CTAArrow className="rotate-12 scale-x-[-1] transform" />
					</motion.div>
					{/* Step 2 */}
					<motion.div className="flex flex-col items-center space-y-2 text-center" variants={itemVariants}>
						<p className="text-5xl font-light text-n-900 dark:text-white">2</p>
						<p className="text-md text-n-9 dark:text-n-3 lg:text-lg">Design</p>
					</motion.div>
					{/* Empty Cell */}
					<div className="hidden"></div>
					{/* Arrow 2→3 */}
					<motion.div className="flex items-center justify-center" variants={itemVariants}>
						<div className="hidden" />
					</motion.div>
					{/* Feedback Step */}
					<motion.div className="flex flex-col items-center space-y-2 text-center" variants={itemVariants}>
						<p className="font-light text-a dark:text-s-dark">
							<FeedbackArrow />
						</p>
						<p className="text-md text-n-9 dark:text-n-3 lg:text-lg">Feedback</p>
					</motion.div>
					{/* Empty Cell */}
					<div className="hidden"></div>
					{/* Empty Cell */}
					<div className="hidden"></div>
					{/* Down Arrow */}
					<motion.div className="flex items-center justify-center -mr-12" variants={itemVariants}>
						<CTAArrow className="-rotate-45 scale-y-[-1] transform" />
					</motion.div>
					{/* Step 4 (Deploy) */}
					<motion.div className="flex flex-col items-center space-y-2 text-center" variants={item2Variants}>
						<p className="text-5xl font-light text-n-900 dark:text-white">4</p>
						<p className="text-md text-n-9 dark:text-n-3 lg:text-lg">Deploy</p>
					</motion.div>
					{/* Arrow 4←3 */}
					<motion.div className="flex items-center justify-center -mb-12" variants={item2Variants}>
						<CTAArrow className="rotate-45 scale-y-[-1] transform" />
					</motion.div>
					{/* Step 3 (Iterate) */}
					<motion.div className="flex flex-col items-center space-y-2 text-center" variants={itemVariants}>
						<p className="text-5xl font-light text-n-900 dark:text-white">3</p>
						<p className="text-md text-n-9 dark:text-n-3 lg:text-lg">Iterate</p>
					</motion.div>
				</motion.div>
			</div>
		</section>
	)
}

// ... (CTAArrow and FeedbackArrow components remain the same)

const CTAArrow = ({ className = '' }: { className?: string }) => (
	<div className={`text-a-dark dark:text-s ${className}`}>
		<motion.svg
			width="95"
			height="62"
			viewBox="0 0 95 62"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			className="scale-40 sm:scale-65"
			initial={{ scale: 0.7 }}
			animate={{ scale: 0.75 }}
			transition={{
				repeat: Infinity,
				repeatType: 'mirror',
				duration: 2,
				ease: 'easeOut',
			}}>
			<path
				d="M14.7705 15.8619C33.2146 15.2843 72.0772 22.1597 79.9754 54.2825"
				stroke="currentColor"
				strokeWidth="3"
			/>
			<path
				d="M17.7987 7.81217C18.0393 11.5987 16.4421 15.8467 15.5055 19.282C15.2179 20.3369 14.9203 21.3791 14.5871 22.4078C14.4728 22.7608 14.074 22.8153 13.9187 23.136C13.5641 23.8683 12.0906 22.7958 11.7114 22.5416C8.63713 20.4812 5.49156 18.3863 2.58664 15.9321C1.05261 14.6361 2.32549 14.1125 3.42136 13.0646C4.37585 12.152 5.13317 11.3811 6.22467 10.7447C8.97946 9.13838 12.7454 8.32946 15.8379 8.01289"
				stroke="currentColor"
				strokeWidth="3"
				strokeLinecap="round"
			/>
		</motion.svg>
	</div>
)

const FeedbackArrow = ({ className = '' }) => (
	<div className={`text-a-dark dark:text-s ${className}`}>
		<motion.svg
			width="62"
			height="62"
			viewBox="0 0 95 95"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			className="scale-40 sm:scale-65"
			initial={{ rotate: 0 }}
			animate={{ rotate: 360 }}
			transition={{
				duration: 8,
				repeat: Infinity,
				ease: 'linear',
			}}>
			{/* Main circular path */}
			<path
				d="M 47.5 15 
          A 32.5 32.5 0 1 1 25 25"
				stroke="currentColor"
				strokeWidth="3"
				fill="none"
			/>

			{/* Arrow head - styled similar to the CTA arrow */}
			<path
				d="M 25 25
          C 24 24 23.5 23.5 22 22
          L 27 23
          L 26 28
          L 25 25"
				stroke="currentColor"
				strokeWidth="5"
				strokeLinecap="round"
				strokeLinejoin="round"
				fill="none"
			/>
		</motion.svg>
	</div>
)
