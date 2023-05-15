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
            className="fixed inset-0 z-[10000000] flex items-center justify-center overflow-hidden"
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
                            duration: 2,
                        },
                    }}
                    exit={{
                        opacity: 0,
                        scale: 0.75,
                        transition: {
                            ease: "easeIn",
                            duration: 1,
                        },
                    }}
                >
                    <span
                        className="hidden md:inline-block align-middle h-screen"
                        aria-hidden="true"
                    >
                        &#8203;
                    </span>

                    <div style={{borderTopLeftRadius:'30px',borderTopRightRadius:'30px'}}
                        className="inline-block align-bottom bg-white  text-left overflow-hidden shadow-xl transform transition-all h-[90vh] relative bottom-[-5vh] sm:bottom-[-5vh]"
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="modal-headline"
                    >
                        <div className="bg-white w-[100vw] h-[95vh] max-w-[1440px]">
                            {/* content goes here */}
                        </div>
                        <div className="absolute top-2 right-2">
                            
                            <button
                                type="button"
                                tabIndex={0}
                                className=" font-poppins w-8 h-8 bg-red-500 rounded-full hover:text-white hover:transition-500ms"
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