import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import InstructionsModal from "../InstructionsModal/InstructionsModal";

const TestPageHeader = () => {
  return (
    <div className="w-11/12 mx-auto my-3 flex justify-between gap-3">
      <div className="relative">
        <input
          type="search"
          placeholder="search by assessment name"
          name="search by Assessment"
          className=" w-full rounded-3xl border-2 z-[998]"
        />
        <FaSearch className="text-[18px] absolute top-3 right-4 z-[999]" />
      </div>
      <div className="relative">
        <input
          type="search"
          placeholder="assessment Name"
          name="search by category"
          className=" w-full rounded-3xl border-2 z-[998]"
        />
        <FaSearch className="text-[18px] absolute top-3 right-4 z-[999]" />
      </div>
    </div>
  );
};

export default TestPageHeader;
