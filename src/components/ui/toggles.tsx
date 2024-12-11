import { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import { IconSun, IconMoon } from '@tabler/icons-react'
import { useTheme } from '../../constants/theme-context'
import Modal from './modal'
import FloatingButton from './contact-button'

const TOGGLE_CLASSES = 'text-sm font-medium flex items-center gap-2 px-3 py-2 transition-colors relative z-10'

export const DarkModeToggle = () => {
	const { theme, toggleTheme } = useTheme()
	const [isCompact, setIsCompact] = useState(false)

	const [isOpen, setIsOpen] = useState(false);
	const closeModal = () => setIsOpen(false);


	useEffect(() => {
			const handleScroll = () => {
					setIsCompact(window.scrollY > 100)
			}

			window.addEventListener('scroll', handleScroll)
			return () => window.removeEventListener('scroll', handleScroll)
	}, [])

	return (
			<>

					<div className="fixed bottom-4 left-2 z-50 flex flex-col items-end">
					<div className="relative flex flex-col items-center">
					<button
						className={`${TOGGLE_CLASSES} ${theme === 'light' ? 'text-s' : 'text-p-1'}`}
						onClick={() => toggleTheme()}>
						<IconSun className="relative z-10 text-lg" />
						{!isCompact && <span className="relative z-10">Light</span>}
					</button>
					<button
						className={`${TOGGLE_CLASSES} ${theme === 'dark' ? 'text-s' : 'text-p-2'}`}
						onClick={() => toggleTheme()}>
						<IconMoon className="relative z-10 text-lg" />
						{!isCompact && <span className="relative z-10">Dark</span>}
					</button>
					<motion.div
						className="absolute inset-0 z-0"
						animate={{
							top: theme === 'dark' ? '50%' : '0%',
							height: '50%',
						}}
						transition={{ type: 'spring', damping: 15, stiffness: 250 }}>
						<div className="h-full w-full rounded-2xl border-[1px] border-s bg-gradient-to-r from-B-4/70 to-B-2/80 shadow-sm shadow-B-4" />
					</motion.div>
				</div>
					</div>
					<FloatingButton />
					<Modal isOpen={isOpen} onClose={closeModal} />
			</>
	)
}
