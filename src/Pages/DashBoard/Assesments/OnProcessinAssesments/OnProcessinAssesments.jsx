import React, { useEffect, useState } from "react";
import AssessmentHead from "./AssessmentHead/AssessmentHead";
import AssessmentBody from "./AssessmentBody/AssessmentBody";

const OnProcessinAssesments = () => {
  const [assessment, setAssessment] = useState({});
  const [questions, setQuestions] = useState([]);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(0);
  const [seenQuestionId, setSeenQuestionId] = useState([]);
  const [checkedQuestionId, setcheckedQuestionId] = useState([]);
  const [isMarkedQuestionId, setIsMarkedQuestionId] = useState([]);
  const [chosenAnswers, setChosenAnswers] = useState([]);
  // const [remainingTime, setRemainingTime] = useState(0);       we need it later
  // const [submitModalIsOpen, setSubmitModalIsOpen] = useState(false);     we need it laater

  const shuffle = (array) => {
    array.sort(() => Math.random() - 0.5);
    return array;
  };

  const changeSelectedQuestionIndexOneByOne = (direction) => {
    if (direction === +1) {
      // move forward

      setSelectedQuestionIndex((prev) => prev + 1);
    } else if (direction === -1) {
      // move backword
      setSelectedQuestionIndex((prev) => prev - 1);
    }
  };
  const selectTheSelectedQuestionIndexWithIndex = (index) => {
    setSelectedQuestionIndex(index);
  };

  // useEffect(() => {
  //   fetch(
  //     `http://localhost:5000/getAssessment?_id=${"here should be object id"}`
  //   )
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log("data: ", data);
  //       if (data?.shouldShuffle === false) {
  //         setQuestions(data?.questions);
  //       } else if (data?.shouldShuffle === true) {
  //         // TO DO: at first re-arrange all of the qustion and then ==> setQuestions(re-arranged question);
  //         const newQuestions = shuffle(data?.questions);
  //         setQuestions(newQuestions);
  //       }
  //     });
  // }, []);
  const data = {
    assessmentName: "for new comers",
    batchId: "FSWD-001",
    duration: "10",
    scheduledAt: "12/12/23",
    topicName: "Javascript",
    createdAt: "12/12/23",
    updatedAt: "12/12/23",
    insttruction: "if any instruction then show",
    _id: "642ef65ea8cb9b3eb52cd09e",
    enabledNegativeMarking: true,
    negativeMark: 0.25,
    shouldShuffle: true,
    shouldShowAnswer: true,
    isOptional: false,
    totalQuestions: 10,
    questions: [
      {
        difficultyLevel: "Easy",
        marks: "1",
        questionName: "What is the value of the following expression: 1",
        topicName: "Javascript",
        _id: "642edf9597c375926cd69f",
        optionObject: {
          answers: ["b"],
          choices: [{ a: "10" }, { b: "25" }, { c: "7" }, { d: "30" }],
        },
      },
      {
        difficultyLevel: "Easy",
        marks: "1",
        questionName: "What is the value of the following expression: 2",
        topicName: "Javascript",
        _id: "642edf997c375d926cd69g",
        optionObject: {
          answers: ["b", "a"],
          choices: [{ a: "10" }, { b: "25" }, { c: "7" }, { d: "30" }],
        },
      },
      {
        difficultyLevel: "Easy",
        marks: "1",
        questionName: "What is the value of the following expression: 3",
        topicName: "Javascript",
        _id: "642edf9297c75d926cd69h",
        optionObject: {
          answers: ["c"],
          choices: [{ a: "10" }, { b: "25" }, { c: "7" }, { d: "30" }],
        },
      },
      {
        difficultyLevel: "Easy",
        marks: "1",
        questionName: "What is the value of the following expression: 4",
        topicName: "Javascript",
        _id: "642edf92i7ck5d926cd69h",
        optionObject: {
          answers: ["c"],
          choices: [{ a: "10" }, { b: "25" }, { c: "7" }, { d: "30" }],
        },
      },
      {
        difficultyLevel: "Easy",
        marks: "1",
        questionName: "What is the value of the following expression: 5",
        topicName: "Javascript",
        _id: "642edf95297375d26cd69j",
        optionObject: {
          answers: ["d", "c"],
          choices: [{ a: "10" }, { b: "25" }, { c: "7" }, { d: "30" }],
        },
      },
      {
        difficultyLevel: "Easy",
        marks: "1",
        questionName: "What is the value of the following expression: 6",
        topicName: "Javascript",
        _id: "642edf95297c375d9cd69k",
        optionObject: {
          answers: ["b", "d"],
          choices: [{ a: "10" }, { b: "25" }, { c: "7" }, { d: "30" }],
        },
      },
      {
        difficultyLevel: "Easy",
        marks: "1",
        questionName: "What is the value of the following expression: 7",
        topicName: "Javascript",
        _id: "642edf95297c375926c69l",
        optionObject: {
          answers: ["b"],
          choices: [{ a: "10" }, { b: "25" }, { c: "7" }, { d: "30" }],
        },
      },
      {
        difficultyLevel: "Easy",
        marks: "1",
        questionName: "What is the value of the following expression: 9",
        topicName: "Javascript",
        _id: "642edf9523ru675926c69l",
        optionObject: {
          answers: ["b"],
          choices: [{ a: "10" }, { b: "25" }, { c: "7" }, { d: "30" }],
        },
      },
      {
        difficultyLevel: "Easy",
        marks: "1",
        questionName: "What is the value of the following expression: 9",
        topicName: "Javascript",
        _id: "642ef95297c375d26cd69m",
        optionObject: {
          answers: ["a"],
          choices: [{ a: "10" }, { b: "25" }, { c: "7" }, { d: "30" }],
        },
      },
      {
        difficultyLevel: "Easy",
        marks: "1",
        questionName: "What is the value of the following expression: 10",
        topicName: "Javascript",
        _id: "642edf9529c35d926d69u",
        optionObject: {
          answers: ["a", "c"],
          choices: [{ a: "10" }, { b: "25" }, { c: "7" }, { d: "30" }],
        },
      },
    ],
  };
  useEffect(() => {
    setAssessment(data);
    setTotalQuestions(data?.questions?.length);
    if (data?.shouldShuffle === false) {
      setQuestions(data?.questions);
      setSeenQuestionId([data?.questions[0]._id]);
      setSelectedQuestion(data?.questions[0]);
    } else if (data?.shouldShuffle === true) {
      // TO DO: at first re-arrange all of the qustion and then ==> setQuestions(re-arranged question);
      const newQuestionsSuffle = shuffle(data?.questions);
      const newQuestions = newQuestionsSuffle?.map((eachQuestion) => {
        const newQuestion = { ...eachQuestion };
        const shuffledChoices = shuffle(eachQuestion?.optionObject?.choices);
        const optionObject = eachQuestion?.optionObject;
        const newOptionObject = { ...optionObject };
        newOptionObject.choices = shuffledChoices;
        newQuestion.optionObject = newOptionObject;
        return newQuestion;
      });
      setQuestions(newQuestions);
      setSeenQuestionId([newQuestions[0]._id]);
      setSelectedQuestion(newQuestions[0]);
    }
  }, []);
  useEffect(() => {
    // console.log("seenQuestionId: ", seenQuestionId);
    // console.log("questions :", questions);
    setSelectedQuestion(questions[selectedQuestionIndex]);
    // to do : setSeenQuestionId
    const thisSelectedQuestionId = questions[selectedQuestionIndex]?._id;
    if (thisSelectedQuestionId && seenQuestionId?.length !== 0) {
      // console.log("thisSelectedQuestionId: ", thisSelectedQuestionId);
      const isAlreadyInSeenArray = seenQuestionId?.find(
        (id) => id === thisSelectedQuestionId
      );
      if (!isAlreadyInSeenArray && seenQuestionId) {
        setSeenQuestionId((prev) => {
          const newSeenQuestionId = [...prev, thisSelectedQuestionId];
          return newSeenQuestionId;
        });
      }
    }
  }, [selectedQuestionIndex, questions, seenQuestionId]);
  return (
    <div className="px-2">
      <div>
        <div className="grid grid-cols-12 gap-1 lg:gap-6">
          <div className="col-span-12 lg:col-span-4">
            <AssessmentHead
              assessment={assessment}
              questions={questions}
              selectedQuestion={selectedQuestion}
              setSelectedQuestion={setSelectedQuestion}
              seenQuestionId={seenQuestionId}
              checkedQuestionId={checkedQuestionId}
              setIsMarkedQuestionId={setIsMarkedQuestionId}
              isMarkedQuestionId={isMarkedQuestionId}
              selectTheSelectedQuestionIndexWithIndex={
                selectTheSelectedQuestionIndexWithIndex
              }
              setcheckedQuestionId={setcheckedQuestionId}
              setChosenAnswers={setChosenAnswers}
              chosenAnswers={chosenAnswers}
            />
          </div>
          <div className="col-span-12 lg:col-span-8 mt-2 lg:mt-12">
            <AssessmentBody
              // shouldShuffle={assessment?.shouldShuffle}
              selectedQuestion={selectedQuestion}
              setSelectedQuestion={setSelectedQuestion}
              setSeenQuestionId={setSeenQuestionId}
              setcheckedQuestionId={setcheckedQuestionId}
              checkedQuestionId={checkedQuestionId}
              setChosenAnswers={setChosenAnswers}
              selectedQuestionIndex={selectedQuestionIndex}
              setSelectedQuestionIndex={setSelectedQuestionIndex}
              changeSelectedQuestionIndexOneByOne={
                changeSelectedQuestionIndexOneByOne
              }
              totalQuestions={totalQuestions}
              chosenAnswers={chosenAnswers}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnProcessinAssesments;
