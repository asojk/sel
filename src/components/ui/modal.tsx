import * as Dialog from '@radix-ui/react-dialog'
import { motion, AnimatePresence } from 'motion/react'
import FormZ from '../formz'
import { AltContact } from './quick-contact'

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
    return (
        <Dialog.Root open={isOpen} onOpenChange={onClose}>
            <AnimatePresence>
                {isOpen && (
                    <Dialog.Portal forceMount>
                        <Dialog.Overlay asChild>
                            <motion.div
                                className='fixed inset-0 z-[9998] bg-black/35 backdrop-blur-lg'
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3, ease: 'easeInOut' }}
                            />
                        </Dialog.Overlay>
                        <Dialog.Content asChild>
                            <motion.div
                                className='fixed inset-0 overflow-y-auto z-[9999]'
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3, ease: 'easeInOut' }}>
                                <div className='flex min-h-full items-center justify-center p-2 text-center'>
                                    <motion.div
                                        className='relative w-full max-w-lg transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all dark:bg-p-5'
                                        initial={{ scale: 0.95, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        exit={{ scale: 0.95, opacity: 0 }}
                                        transition={{ duration: 0.3, ease: 'easeInOut' }}>
                                        <Dialog.Close asChild>
                                            <button
                                                className='absolute z-[10001] right-2 top-2 text-black hover:text-gray-600 dark:text-white p-2'
                                                aria-label='Close'
                                                onClick={onClose}>
                                                <svg
                                                    xmlns='http://www.w3.org/2000/svg'
                                                    width={24}
                                                    height={24}
                                                    viewBox='0 0 24 24'
                                                    fill='none'
                                                    stroke='currentColor'
                                                    strokeWidth={1.5}
                                                    strokeLinecap='round'
                                                    strokeLinejoin='round'>
                                                    <path stroke='none' d='M0 0h24v24H0z' fill='none' />
                                                    <path d='M18 6l-12 12' />
                                                    <path d='M6 6l12 12' />
                                                </svg>
                                            </button>
                                        </Dialog.Close>
                                        <div className='mt-8'>
                                            <Dialog.Description asChild>
                                                <AltContact />
                                            </Dialog.Description>
                                            <div className='mt-2'>
                                                <FormZ />
                                            </div>
                                        </div>
                                    </motion.div>
                                </div>
                            </motion.div>
                        </Dialog.Content>
                    </Dialog.Portal>
                )}
            </AnimatePresence>
        </Dialog.Root>
    );
};

export default Modal;