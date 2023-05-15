import { Dialog } from '@headlessui/react'
import { AnimatePresence, motion } from 'framer-motion'
import React from 'react'

const ReviewAnswerModal = ({ isOpen, setIsOpen }) => {
  return (
    <AnimatePresence>
    {isOpen && (
        <Dialog
            open={isOpen}
            onClose={setIsOpen}
            as="div"
            className="fixed inset-0 z-[10000000] flex items-center justify-center overflow-y-auto"
        >
            <div className="flex flex-col text-center">
                <Dialog.Overlay />
                <div
                    className="fixed inset-0 transition-opacity"
                    aria-hidden="true"
                >
                    <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                </div>

                <motion.div
                    className="flex items-end justify-center h-auto pt-4 px-4 pb-20 text-center sm:block sm:p-0"
                    initial={{
                        opacity: 0,
                        scale: 0.75,
                    }}
                    animate={{
                        opacity: 1,
                        scale: 1,
                        transition: {
                            ease: "easeOut",
                            duration: 0.15,
                        },
                    }}
                    exit={{
                        opacity: 0,
                        scale: 0.75,
                        transition: {
                            ease: "easeIn",
                            duration: 0.15,
                        },
                    }}
                >
                    <span
                        className="hidden md:inline-block align-middle h-screen"
                        aria-hidden="true"
                    >
                        &#8203;
                    </span>

                    <div
                        className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle min-w-xl sm:w-full h-[90vh]"
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="modal-headline"
                    >
                        <div className="bg-white w-[95vw] h-[95vh]">
                            {/* content goes here */}
                        </div>
                        <div className="absolute top-10 right-10">
                            
                            <button
                                type="button"
                                tabIndex={0}
                                className=" font-poppins w-12 h-12 bg-red-500 rounded-full hover:text-white hover:transition-500ms"
                                onClick={() => setIsOpen(false)}
                            >
                                X
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </Dialog>
    )}
</AnimatePresence>
  )
}

export default ReviewAnswerModal