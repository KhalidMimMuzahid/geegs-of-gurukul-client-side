import React, { useEffect, useState } from "react";
import style from "../../onProcessinAssesments.module.css";
const EachQuesNo = ({
  selectTheSelectedQuestionIndexWithIndex,
  eachQues,
  _id,
  index,
  selectedQuestion,
  seenQuestionId,
  isMarkedQuestionId,
  chosenAnswers,
}) => {
  const [isSelected, setIsSelected] = useState(false);
  const [quizStatus, setQuizStatus] = useState("unSeenUnMarked");
  useEffect(() => {
    if (_id === selectedQuestion?._id) {
      setIsSelected(true);
    } else {
      setIsSelected(false);
    }
  }, [selectedQuestion]);

  //   seenUnMarked
  //   seenMarked
  //   checkedUnMarked
  //   unCheckedMarked

  useEffect(() => {
    console.log(
      " seenQuestionId: ",
      seenQuestionId,
      "\nchosenAnswers: ",
      chosenAnswers,
      "\nisMarkedQuestionId: ",
      isMarkedQuestionId
    );
    if (chosenAnswers?.findIndex((each) => each?.questionId === _id) !== -1) {
      if (isMarkedQuestionId.indexOf(_id) !== -1) {
        setQuizStatus("checkedMarked");
      } else {
        setQuizStatus("checkedUnMarked");
      }
    } else if (seenQuestionId.indexOf(_id) !== -1) {
      if (isMarkedQuestionId.indexOf(_id) !== -1) {
        setQuizStatus("seenMarked");
      } else {
        setQuizStatus("seenUnMarked");
      }
    } else {
      setQuizStatus("unSeenUnMarked");
    }
  }, [
    _id,
    chosenAnswers,
    seenQuestionId,
    isMarkedQuestionId,
    selectedQuestion,
  ]);

  return (
    <div
      onClick={() => selectTheSelectedQuestionIndexWithIndex(index)}
      className={`border-black block ${style?.questionNo} ${
        style?.[quizStatus]
      } ${
        isSelected
          ? `${style?.selectedBtn} shadow-inner w-[60px] h-[60px] shadow-black `
          : " w-[55px] h-[55px] border-1"
      }   hover:cursor-pointer`}
    >
      <span>{index + 1}</span>
    </div>
  );
};

export default EachQuesNo;
