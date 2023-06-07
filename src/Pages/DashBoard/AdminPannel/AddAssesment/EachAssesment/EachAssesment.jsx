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
        <div class="flex justify-center">{i + 1}</div>
      </td>
      <td class="p-2 whitespace-nowrap">{eachQues?.questionName}</td>
      <td class="p-2 whitespace-nowrap">{eachQues?.topicName}</td>
      <td class="p-2 whitespace-nowrap">{eachQues?.difficultyLevel}</td>
      <td class="p-2 whitespace-nowrap">
        <div class="mx-auto flex justify-center">
          <span className="">
            {isAdded ? (
              <AiFillMinusSquare size={36} onClick={handleRemove} />
            ) : (
              <AiFillPlusSquare size={36} onClick={handleAdd} />
            )}
          </span>
        </div>
      </td>
    </tr>
  );
};

export default EachAssesment;
