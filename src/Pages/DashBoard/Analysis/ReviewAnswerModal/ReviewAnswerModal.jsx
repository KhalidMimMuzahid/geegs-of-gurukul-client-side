import { Dialog } from "@headlessui/react";
import { AnimatePresence, motion } from "framer-motion";
import { BsXCircleFill } from "react-icons/bs";
import React, { useState } from "react";
import AllAnswers from "./AllAnswers";

const ReviewAnswerModal = ({ isOpen, setIsOpen, response, assessment }) => {
  const [ques, setQues] = useState(0);
  const [isInstruction, setIsInstruction] = useState(false);
  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog
          open={isOpen}
          onClose={setIsOpen}
          as="div"
          className="fixed inset-0 z-[10000000] flex items-center justify-center h-full"
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
                  duration: 0.1,
                },
              }}
              exit={{
                opacity: 0,
                scale: 0.75,
                transition: {
                  ease: "easeIn",
                  duration: 0.2,
                },
              }}
            >
              <div
                className="relative bg-white overflow-y-auto shadow-xl transform transition-all w-[100vw] h-[95vh] md:h-[85vh] max-w-[1300px] p-5 rounded-lg text-left mt-12 md:mt-0 font-poppins"
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-headline"
              >
                {/* Instructions modal */}
                {isInstruction && (
                  <div className="absolute z-[10000000000] w-[360px] h-[500px] sm:w-[390px] md:w-[600px] lg-[700px] p-4 mt-12 left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-2xl">
                    <button
                      type="button"
                      className="absolute right-4 top-4"
                      onClick={() => setIsInstruction(!isInstruction)}
                    >
                      <BsXCircleFill size={20} color="red" />
                    </button>
                    <p className="mb-3 font-semibold text-green-400">
                      Assessment Instructions
                    </p>
                    <div className="overflow-y-auto border border-green-400 rounded-lg p-3 text-left h-[90%]">
                      {assessment.instruction}
                    </div>
                  </div>
                )}
                {/* Instructions modal */}
                <div className="flex w-full justify-between mb-10">
                  <p className="font-semibold text-lg text-green-500">
                    Answer Review
                  </p>
                  <button
                    type="button"
                    // tabIndex={0}
                    className="border-0"
                    onClick={() => setIsOpen(false)}
                  >
                    <BsXCircleFill color="red" size={20} />
                  </button>
                </div>
                <div className="">
                  {/* content goes here */}
                  <AllAnswers
                    questions={assessment.questions}
                    response={response}
                    ques={ques}
                    setQues={setQues}
                    setIsInstruction={setIsInstruction}
                    isInstruction={isInstruction}
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </Dialog>
      )}
    </AnimatePresence>
  );
};

export default ReviewAnswerModal;
