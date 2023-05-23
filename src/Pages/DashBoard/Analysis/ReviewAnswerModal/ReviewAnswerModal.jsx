import { Dialog } from "@headlessui/react";
import { AnimatePresence, motion } from "framer-motion";
import { BsXCircleFill } from "react-icons/bs";
import React, { useState } from "react";
import AllAnswers from "./AllAnswers";

const ReviewAnswerModal = ({ isOpen, setIsOpen, response, assessment }) => {
  // console.log("Question 1 ID:", assessment.questions[0]._id);
  const [ques, setQues] = useState(0);
  // const [ques, setQues] = useState(0);
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
                className="bg-white overflow-y-auto shadow-xl transform transition-all w-[100vw] h-[95vh] md:h-[85vh] max-w-[1300px] p-5 rounded-lg text-left"
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-headline"
              >
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
