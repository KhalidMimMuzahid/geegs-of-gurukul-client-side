import React, { useState } from "react";
import ReviewAnswerModal from "../ReviewAnswerModal";
import { motion } from "framer-motion";
const OpenModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  return null;
  return (
    <>
      <div className="">
        {/* <button
					className="px-2 py-2 mx-4 my-8 float-right rounded-xl bg-green-300 font-medium font-poppins"
					onClick={() => setIsOpen(!isOpen)}
				>
					Review Answer
				</button> */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsOpen(!isOpen)}
          className="px-2 py-2 mx-4 my-8 float-right rounded-xl bg-green-300 font-medium font-poppins"
        >
          Review Answer
        </motion.button>
        <ReviewAnswerModal isOpen={isOpen} setIsOpen={setIsOpen} />
      </div>
    </>
  );
};

export default OpenModal;
