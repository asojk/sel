import { motion } from 'motion/react'
import { useState } from 'react'
import Modal from './modal'
import { IconMailBolt } from '@tabler/icons-react'

const FloatingButton: React.FC = () => {
	const [isOpen, setIsOpen] = useState(false)

	const closeModal = () => setIsOpen(false)
	const openModal = () => setIsOpen(true)

	return (
		<>
			<motion.button
				whileHover={{ scale: 1.1 }}
				whileTap={{ scale: 0.9 }}
				className="fixed bottom-4 right-4 rounded-2xl bg-a-dark p-3 text-white shadow-lg"
				onClick={openModal}>
				<span className='inline-flex'>

					<IconMailBolt /> 

				<a className="hidden md:ml-2 md:flex">Contact</a>
				</span>
			</motion.button>
			<Modal isOpen={isOpen} onClose={closeModal} />
		</>
	)
}

export default FloatingButton
