import React, { useEffect } from "react";
import { useState } from "react";
import { AiFillMinusSquare, AiFillPlusSquare } from "react-icons/ai";
const EachAssesment = ({ eachQues, i, addedQuestion, setAddedQuestion }) => {
  const [isAdded, setIsAdded] = useState(false);
  useEffect(() => {
    const newIsAdded = addedQuestion?.find(
      (eachAdded) => eachAdded?._id === eachQues?._id
    );
    if (newIsAdded) {
      setIsAdded(true);
    } else {
      setIsAdded(false);
    }
  }, [addedQuestion]);
  const handleAdd = () => {
    setIsAdded((prev) => {
      // add now
      const newaddedQuestion = [...addedQuestion, eachQues];
      setAddedQuestion(newaddedQuestion);
    });
  };
  const handleRemove = () => {
    // remove now
    const newaddedQuestion = addedQuestion.filter(
      (eachAdded) => eachAdded?._id !== eachQues?._id
    );
    setAddedQuestion(newaddedQuestion);
  };
  return (
    <tr>
      <td class="p-2 whitespace-nowrap">
        <div class="flex items-center">{i + 1}</div>
      </td>
      <td class="p-2 whitespace-nowrap">{eachQues?.questionName}</td>
      <td class="p-2 whitespace-nowrap">{eachQues?.topicName}</td>
      <td class="p-2 whitespace-nowrap">{eachQues?.difficultyLevel}</td>
      <td class="p-2 whitespace-nowrap flex gap-2">
        <div class="mx-auto flex w-[100px] gap-2">
          <span className="">
            {isAdded ? (
              <AiFillMinusSquare
                className="fs-6"
                size={36}
                onClick={handleRemove}
              />
            ) : (
              <AiFillPlusSquare
                className="fs-6"
                size={36}
                onClick={handleAdd}
              />
            )}
          </span>
        </div>
      </td>
    </tr>
  );
};

export default EachAssesment;
