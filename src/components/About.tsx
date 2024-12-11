import { TimeLine } from './ui/timeline'
import { Profile } from './ui/Profile'

import { motion } from 'motion/react'
import { useState } from 'react'
import Modal from './ui/modal'

export const About = () => {
	const [isOpen, setIsOpen] = useState(false)
	const closeModal = () => setIsOpen(false)
	const openModal = () => setIsOpen(true)
	return (
		<>
			<div className="relative bg-B px-content-padding pb-8 pt-12 antialiased dark:bg-B-dark md:pt-14 lg:pb-12 lg:pt-20 lg:subpixel-antialiased">

					<h1 className="H1">About Us</h1>
					<div className="grid grid-cols-1 md:grid-cols-2">
						<section className="relative w-full px-content-padding py-12">
							<div className="prose text-center md:text-start">
								<h2 className="H2">Our Mission</h2>
								<p className="Description prose text-left">
									At Selynt, we empower small businesses to thrive in a market dominated by larger corporations. We
									specialize in crafting beautiful, streamlined websites and polished brand identities, focusing on
									clarity, simplicity, and affordability—because we believe that standing out shouldn’t mean
									overspending.
								</p>
							</div>
						</section>
						<section className="relative w-full px-content-padding py-4 md:py-8">
							<div className="prose text-center md:text-start">
								<h2 className="H2">Our Vision</h2>
								<p className="Description prose text-left">
									Our mission is built on the principles of simplicity, clarity, and affordability. “Selynt” is a
									mixture of “salience” - making your business noteworthy - and “lint” - to refine every detail of code
									and language syntax. Cut the clutter and amplify what matters.
								</p>
							</div>
						</section>
					</div>



					<div className="px-content-padding py-12">
						<TimeLine />
					</div>



					<Profile />



					<section className="flex w-full cursor-default flex-col gap-8 px-4 py-6 antialiased md:flex-row lg:py-12 lg:subpixel-antialiased">
						<div className="mx-auto flex max-w-2xl flex-col items-start py-4 text-left md:px-4 lg:px-0">
							<h2 className="H3">Why Us?</h2>
							<h2 className="H2 text-3xl sm:text-4xl md:text-5xl">
								Websites & Branding
								<br className="hidden sm:block" />
								<span className="text-a dark:text-n-1"> Without the BS</span>
							</h2>
						</div>

						<motion.button
							initial={{ opacity: 0, y: 8 }}
							animate={{
								opacity: 1,
								y: 0,
								transition: {
									delay: 1.125,
									duration: 0.5,
									ease: 'easeInOut',
								},
							}}
							exit={{ opacity: 0, y: 8 }}
							whileHover={{ scale: 1.1 }}
							whileTap={{ scale: 0.9 }}
							className="absolute bottom-4 right-8 mx-auto rounded-full bg-a-dark px-4 py-2 text-white shadow-lg"
							onClick={openModal}>
							<span className="">Let's Talk</span>
						</motion.button>
						<Modal isOpen={isOpen} onClose={closeModal} />
					</section>
			</div>
		</>
	)
}
