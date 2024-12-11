import { useState, useRef, useEffect } from 'react'
import MapChart from './MapChart'
import { motion, AnimatePresence } from 'motion/react'
import { Client } from './MapChart'
import { images } from '../assets/assets'

export const Map = () => {

	const [activeClient, setActiveClient] = useState<Client | null>(null)
	const [showPopup, setShowPopup] = useState(false)
	const popupRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
				setShowPopup(false)
			}
		}

		document.addEventListener('mousedown', handleClickOutside)
		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [])

	return (
		<div className="relative">

				<section className="flex w-full flex-col items-center justify-center antialiased">

						<p className="pb-4">
							As our map grows, we hope it will serve as a trusted resource for those looking to connect with small
							businesses that share our values.
						</p>


							<MapChart setActiveClient={setActiveClient} setShowPopup={setShowPopup} />


				</section>


			<AnimatePresence>
				{showPopup && activeClient && (
					<motion.div
						ref={popupRef}
						initial={{ opacity: 0, scale: 0.9 }}
						animate={{ opacity: 1, scale: 1 }}
						exit={{ opacity: 0, scale: 0.9 }}
						transition={{ duration: 0.3 }}
						className="fixed left-1/2 top-1/2 z-[60] w-11/12 max-w-md -translate-x-1/2 -translate-y-1/2 transform rounded-lg border-2 border-n-7 bg-n-light p-4 shadow-lg dark:border-n-4 dark:bg-n-dark sm:p-6 md:w-3/4 lg:w-1/2 xl:w-2/5">
						<button
							onClick={() => setShowPopup(false)}
							className="absolute right-3 top-3 text-n-5 hover:text-n-7 dark:text-n-3 dark:hover:text-n-1">
							<span className="sr-only">Close</span>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-6 w-6"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
							</svg>
						</button>
						<div className="mb-4 flex items-center">
							<img
								src={images[activeClient.logo]}
								alt={`${activeClient.name} logo`}
								className="mr-4 h-16 w-16 object-contain"
							/>
							<h3 className="text-xl font-bold text-p-dark dark:text-s-light">{activeClient.name}</h3>
						</div>
						<p className="mb-4 text-base text-n-7 dark:text-n-3">{activeClient.description}</p>
						<a
							href={activeClient.url}
							target="_blank"
							rel="noopener noreferrer"
							className="inline-block rounded bg-a px-4 py-2 text-white transition-colors duration-200 hover:bg-a-light dark:bg-a dark:hover:bg-s-dark">
							Visit Website
						</a>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	)
}
