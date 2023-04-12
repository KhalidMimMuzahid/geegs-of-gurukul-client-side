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
    <tr key={eachQues?._id}>
      <td>{i + 1}</td>
      <td>{eachQues?.questionName}</td>
      <td>{eachQues?.topicName}</td>

      <td>{eachQues?.difficultyLevel}</td>
      <td>
        <span className="">
          {isAdded ? (
            <AiFillMinusSquare
              className="fs-6"
              size={36}
              onClick={handleRemove}
            />
          ) : (
            <AiFillPlusSquare className="fs-6" size={36} onClick={handleAdd} />
          )}
        </span>
      </td>
    </tr>
  );
};

export default EachAssesment;
