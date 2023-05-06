import React, { useEffect, useState } from "react";
import AssessmentHead from "./AssessmentHead/AssessmentHead";
import AssessmentBody from "./AssessmentBody/AssessmentBody";
import moment from "moment";
import { useLoaderData, useNavigate } from "react-router-dom";
import rightArrow from "../../../../assets/icons/arrow-right.svg";

const OnProcessinAssesments = () => {
  const [assessment, setAssessment] = useState({});
  const [questions, setQuestions] = useState([]);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(0);
  const [seenQuestionId, setSeenQuestionId] = useState([]);
  const [isMarkedQuestionId, setIsMarkedQuestionId] = useState([]);
  const [chosenAnswers, setChosenAnswers] = useState([]);
  const [takenTimeToFinish, setTakenTimeToFinish] = useState(0);
  const [submitModalIsOpen, setSubmitModalIsOpen] = useState(false);
  const [
    shouldShowMouseOutsideErrorModal,
    setShouldShowMouseOutsideErrorModal,
  ] = useState(false);
  const [countGoOutSideOfThisTab, setCountGoOutSideOfThisTab] = useState(0);
  const navigate = useNavigate();
  const startedAt = moment().format();
  const shuffle = (array) => {
    console.log("arrayyyy: ", array);
    array.sort(() => Math.random() - 0.5);
    return array;
  };

  const changeSelectedQuestionIndexOneByOne = (direction) => {
    if (direction === +1) {
      // move forward
      if (selectedQuestionIndex + 1 !== totalQuestions) {
        setSelectedQuestionIndex((prev) => prev + 1);
      }
    } else if (direction === -1) {
      // move backword
      if (selectedQuestionIndex !== 0) {
        setSelectedQuestionIndex((prev) => prev - 1);
      }
    }
  };
  const selectTheSelectedQuestionIndexWithIndex = (index) => {
    setSelectedQuestionIndex(index);
  };
  const handleQuizSubmit = () => {
    const newChosenAnswers = [];
    let totalCorrectAnswer = 0;
    chosenAnswers?.forEach((eachChosen) => {
      const thisQuestion = questions?.find(
        (eachQuestion) => eachQuestion?._id === eachChosen?.questionId
      );
      const answers = thisQuestion?.optionObject?.answers;
      const chosenOptions = eachChosen?.chosenOptions;
      if (answers?.length !== chosenOptions?.length) {
        // skip for this question, because it is wrong answer

        const newEachChosen = { ...eachChosen };
        newEachChosen.isCorrect = false;
        newChosenAnswers.push(newEachChosen);
      } else {
        let isCorrect = true;
        chosenOptions?.forEach((eachOption) => {
          const isAvailable = answers?.find(
            (eachAnswer) => eachAnswer === eachOption
          );
          if (!isAvailable) {
            isCorrect = false;
          }
        });
        if (isCorrect) {
          ++totalCorrectAnswer;

          const newEachChosen = { ...eachChosen };
          newEachChosen.isCorrect = true;
          newChosenAnswers.push(newEachChosen);
        } else {
          // skip for this question, because it is wrong answer
          const newEachChosen = { ...eachChosen };
          newEachChosen.isCorrect = false;
          newChosenAnswers.push(newEachChosen);
        }
      }
    });
    // console.log("\ntotalCorrectAnswer: ", totalCorrectAnswer);
    // console.log("\nnewChosenAnswers: ", newChosenAnswers);

    const assessmentId = assessment?._id;
    const studentEmail = "currentUser?.email";

    const enabledNegativeMarking = assessment?.enabledNegativeMarking;

    const attemptOn = chosenAnswers?.length;
    const correct = totalCorrectAnswer;
    const wrong = chosenAnswers?.length - totalCorrectAnswer;
    const skipped = questions?.length - chosenAnswers?.length;
    let totalMark = 0;
    if (assessment?.enabledNegativeMarking) {
      totalMark = correct * 1 - wrong * 0.25;
    } else {
      totalMark = correct * 1;
    }
    const assessmentsResponse = {
      _id: "providedbymongodb",
      assessmentId,
      studentEmail,
      startedAt,
      takenTimeToFinish,
      enabledNegativeMarking,
      totalMark,
      aboutResponse: {
        attemptOn,
        correct,
        wrong,
        skipped,
        chosenAnswers: newChosenAnswers,
      },
    };
    console.log(" assessmentsResponse: ", assessmentsResponse);
    const topics = [];
    // setTopicNames
    const topicNames = questions?.map((eachQuestion) => {
      const topicName = eachQuestion?.topicName;
      const topicNameLowerCase = topicName.toLowerCase();
      return topicNameLowerCase;
    });
    const uniqueTopicNames = [...new Set(topicNames)];
    uniqueTopicNames?.forEach((eachTopic) => {
      const totalQuestionsForThisTopic = questions?.filter((eachQuestion) => {
        const topicName = eachQuestion?.topicName;
        const topicNameLowerCase = topicName.toLowerCase();
        return topicNameLowerCase === eachTopic;
      });
      const totalCorrectForThisTopic =
        assessmentsResponse?.aboutResponse?.chosenAnswers.filter(
          (eachChosen) => {
            if (eachChosen?.isCorrect) {
              const thisQuestion = questions.find((eachQuestion) => {
                return eachQuestion?._id === eachChosen?.questionId;
              });
              return thisQuestion?.topicName.toLowerCase() === eachTopic;
            } else {
              return false;
            }
          }
        );
      const totalCorrect = totalCorrectForThisTopic?.length;

      const totalAttemptForThisTopic =
        assessmentsResponse?.aboutResponse?.chosenAnswers.filter(
          (eachChosen) => {
            const thisQuestion = questions.find((eachQuestion) => {
              return eachQuestion?._id === eachChosen?.questionId;
            });
            return thisQuestion?.topicName.toLowerCase() === eachTopic;
          }
        );

      const totalAttempt = totalAttemptForThisTopic?.length;

      topics.push({
        topicName: eachTopic,
        totalCorrect,
        totalAttempt,
        totalQuestions: totalQuestionsForThisTopic?.length,
      });
    });
    // console.log("topics: ", topics);
    const topicsDetails = topics?.map((eachTopic) => {
      const newEachTopic = { ...eachTopic };
      const { totalCorrect, totalQuestions } = eachTopic;
      const abilityRate = (totalCorrect / totalQuestions) * 100;
      newEachTopic.abilityRate = abilityRate;
      return newEachTopic;
    });
    // console.log("successRate: ", successRate);
    const response = { ...assessmentsResponse };
    const aboutResponse = assessmentsResponse?.aboutResponse;
    const newAboutResponse = { ...aboutResponse };
    newAboutResponse.topicsDetails = topicsDetails;
    response.aboutResponse = newAboutResponse;
    console.log("response: ", response);
    // TODO: we have sen this response to mongodb database
    // if successrat > 80 => strength include topic name === successrate and also time management
    // if successrat > 50 => average
    // else  => have to improve
    localStorage.setItem("response", JSON.stringify(response));
    setSubmitModalIsOpen(false);
    navigate("/dashboard/analysis");
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

  const datax = {
    assessmentName: "for new comers",
    batchId: "FSWD-001",
    duration: 10,
    topicName: "Javascript",
    createdAt: "12/12/23",
    updatedAt: "12/12/23",
    scheduledAt: "12/12/23",
    closedAt: "12/12/23",
    insttruction: "if any instruction then show",
    _id: "642ef65ea8cb9b3eb52cd09e",
    enabledNegativeMarking: true,
    negativeMark: 0.25,
    shouldShuffle: false,
    shouldShowAnswer: true,
    isOptional: false,
    totalQuestions: 10,
    questions: [
      {
        difficultyLevel: "Easy",
        marks: "1",
        questionName: "What is the value of the following expression: 1",
        topicName: "Javascript",
        _id: "642edf9597gf5926cd69f",
        optionObject: {
          answers: ["b"],
          choices: [{ a: "10" }, { b: "25" }, { c: "7" }, { d: "30" }],
        },
      },

      {
        difficultyLevel: "Easy",
        marks: "1",
        questionName: "What is the value of the following expression: 1",
        topicName: "php",
        _id: "642edfgffb5326cd69f",
        optionObject: {
          answers: ["b"],
          choices: [{ a: "10" }, { b: "25" }, { c: "7" }, { d: "30" }],
        },
      },
      {
        difficultyLevel: "Easy",
        marks: "1",
        questionName: "What is the value of the following expression: 1",
        topicName: "php",
        _id: "642eff75hhfgf4669f",
        optionObject: {
          answers: ["b"],
          choices: [{ a: "10" }, { b: "25" }, { c: "7" }, { d: "30" }],
        },
      },
      {
        difficultyLevel: "Easy",
        marks: "1",
        questionName: "What is the value of the following expression: 1",
        topicName: "socketIo",
        _id: "4345ff5hhfgf4669f",
        optionObject: {
          answers: ["b"],
          choices: [{ a: "10" }, { b: "25" }, { c: "7" }, { d: "30" }],
        },
      },
      {
        difficultyLevel: "Easy",
        marks: "1",
        questionName: "What is the value of the following expression: 1",
        topicName: "react",
        _id: "43t45844kfdf5gf454ff",
        optionObject: {
          answers: ["b"],
          choices: [{ a: "10" }, { b: "25" }, { c: "7" }, { d: "30" }],
        },
      },
      {
        difficultyLevel: "Easy",
        marks: "1",
        questionName: "What is the value of the following expression: 1",
        topicName: "nodeJs",
        _id: "xxsgf643ttgf443443",
        optionObject: {
          answers: ["b"],
          choices: [{ a: "10" }, { b: "25" }, { c: "7" }, { d: "30" }],
        },
      },
      {
        difficultyLevel: "Easy",
        marks: "1",
        questionName: "What is the value of the following expression: 1",
        topicName: "react",
        _id: "xxsxsddrjjyufyhty654",
        optionObject: {
          answers: ["b"],
          choices: [{ a: "10" }, { b: "25" }, { c: "7" }, { d: "30" }],
        },
      },
      {
        difficultyLevel: "Easy",
        marks: "1",
        questionName: "What is the value of the following expression: 1",
        topicName: "socketIo",
        _id: "49453hfju5874nhdfft",
        optionObject: {
          answers: ["b"],
          choices: [{ a: "10" }, { b: "25" }, { c: "7" }, { d: "30" }],
        },
      },

      {
        difficultyLevel: "Easy",
        marks: "1",
        questionName: "What is the value of the following expression: 1",
        topicName: "php",
        _id: "642efgfdfsdfjhhg669f",
        optionObject: {
          answers: ["b"],
          choices: [{ a: "10" }, { b: "25" }, { c: "7" }, { d: "30" }],
        },
      },

      {
        difficultyLevel: "Easy",
        marks: "1",
        questionName: "What is the value of the following expression: 2",
        topicName: "Python",
        _id: "642edf997c375d926454gfg",
        optionObject: {
          answers: ["b", "a"],
          choices: [{ a: "10" }, { b: "25" }, { c: "7" }, { d: "30" }],
        },
      },
      {
        difficultyLevel: "Easy",
        marks: "1",
        questionName: "What is the value of the following expression: 3",
        topicName: "java",
        _id: "642edf9297c75d94gfffd69h",
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
        _id: "642edf92i7cgff5926cd69h",
        optionObject: {
          answers: ["c"],
          choices: [{ a: "10" }, { b: "25" }, { c: "7" }, { d: "30" }],
        },
      },
      {
        difficultyLevel: "Easy",
        marks: "1",
        questionName: "What is the value of the following expression: 5",
        topicName: "Python",
        _id: "642edf952973gfgf55d26cd69j",
        optionObject: {
          answers: ["d", "c"],
          choices: [{ a: "10" }, { b: "25" }, { c: "7" }, { d: "30" }],
        },
      },
      {
        difficultyLevel: "Easy",
        marks: "1",
        questionName: "What is the value of the following expression: 6",
        topicName: "java",
        _id: "642edf95295453gf5d9cd69k",
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
        _id: "642edf95297c375f554c69l",
        optionObject: {
          answers: ["b"],
          choices: [{ a: "10" }, { b: "25" }, { c: "7" }, { d: "30" }],
        },
      },
      {
        difficultyLevel: "Easy",
        marks: "1",
        questionName: "What is the value of the following expression: 8",
        topicName: "Python",
        _id: "642edf9523ru675gff569l",
        optionObject: {
          answers: ["b"],
          choices: [{ a: "10" }, { b: "25" }, { c: "7" }, { d: "30" }],
        },
      },
      {
        difficultyLevel: "Easy",
        marks: "1",
        questionName: "What is the value of the following expression: 9",
        topicName: "java",
        _id: "642ef9fbfg545gd26cd69m",
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
        _id: "642edfff545t926d69u",
        optionObject: {
          answers: ["a", "c"],
          choices: [{ a: "10" }, { b: "25" }, { c: "7" }, { d: "30" }],
        },
      },
      {
        difficultyLevel: "Easy",
        marks: "1",
        questionName: "What is the value of the following expression: 10",
        topicName: "Javascript",
        _id: "642edf95296gff334d69u",
        optionObject: {
          answers: ["a", "c"],
          choices: [{ a: "10" }, { b: "25" }, { c: "7" }, { d: "30" }],
        },
      },
      {
        difficultyLevel: "Easy",
        marks: "1",
        questionName: "What is the value of the following expression: 10",
        topicName: "c++",
        _id: "642edfdf545fd426d69u",
        optionObject: {
          answers: ["a", "d"],
          choices: [{ a: "10" }, { b: "25" }, { c: "7" }, { d: "30" }],
        },
      },
      {
        difficultyLevel: "Easy",
        marks: "1",
        questionName: "What is the value of the following expression: 10",
        topicName: "dotnet",
        _id: "642edf95h763hd569u",
        optionObject: {
          answers: ["b", "c"],
          choices: [{ a: "10" }, { b: "25" }, { c: "7" }, { d: "30" }],
        },
      },
    ],
  };
  const data = useLoaderData();
  // console.log("data2", data2);
  useEffect(() => {
    setAssessment(data);
    console.log("testttttttttttttt", data);
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

  // const concernedElement = document.getElementById("click-text");

  // window.addEventListener("mousedown", (event) => {
  //   if (document.getElementById("click-text")?.contains(event?.target)) {
  //     console.log("Clicked Inside");
  //   } else {
  //     console.log("Clicked Outside / Elsewhere");
  //     setShouldShowMouseOutsideErrorModal((prev) => {
  //       if (!prev) {
  //         return true;
  //       }
  //     });
  //   }
  // });

  // window.addEventListener("blur", function () {
  //   setShouldShowMouseOutsideErrorModal((prev) => {
  //     if (!prev) {
  //       // setCountGoOutSideOfThisTab((prev) => ++prev);
  //       console.log("xxxx");
  //       return true;
  //     }
  //   });
  // });

  // window.addEventListener("focus", function () {
  //   document.title = "i am in";
  // });
  return (
    <div className="container max-w-[1440px] mx-auto py-2 lg:py-4 xl:py-8 font-poppins">
      <div className=" h-full relative  ">
        {/* mark-negetive */}
        <div className="col-span-3 border-b border-gray-300">
          <div className="flex justify-between items-center p-4 border border-b-2 bg-slate-100">
            <div className="flex justify-center items-center gap-1">
              <img className="w-6 h-5" src={rightArrow} alt="" />
              <h1 className="font-bold">Single Correct</h1>
            </div>
            <div className="flex items-center">
              <p className="text-[#4caf50] border border-gray-300 p-2 rounded-l-md">
                + 1.00
              </p>
              <p className="text-[#db2020] border border-l-0 border-gray-300 p-2 rounded-r-md">
                - 0.25
              </p>
            </div>
          </div>
        </div>
        {/* mark-negetive */}
        <div className=" rounded-3xl shadow-lg shadow-slate-700  py-4 lg:px-8 lg:py-8 px-4">
          <div className="grid grid-cols-12 gap-1 lg:gap-16">
            <div className="col-span-12 lg:col-span-4">
              <AssessmentHead
                assessment={assessment}
                questions={questions}
                selectedQuestion={selectedQuestion}
                setSelectedQuestion={setSelectedQuestion}
                seenQuestionId={seenQuestionId}
                setIsMarkedQuestionId={setIsMarkedQuestionId}
                isMarkedQuestionId={isMarkedQuestionId}
                selectTheSelectedQuestionIndexWithIndex={
                  selectTheSelectedQuestionIndexWithIndex
                }
                setChosenAnswers={setChosenAnswers}
                chosenAnswers={chosenAnswers}
                setTakenTimeToFinish={setTakenTimeToFinish}
                totalQuestions={totalQuestions}
              />
            </div>

            <div className="col-span-12 lg:col-span-8 mt-2 ">
              <AssessmentBody
                // shouldShuffle={assessment?.shouldShuffle}
                selectedQuestion={selectedQuestion}
                setSelectedQuestion={setSelectedQuestion}
                setSeenQuestionId={setSeenQuestionId}
                setChosenAnswers={setChosenAnswers}
                selectedQuestionIndex={selectedQuestionIndex}
                setSelectedQuestionIndex={setSelectedQuestionIndex}
                changeSelectedQuestionIndexOneByOne={
                  changeSelectedQuestionIndexOneByOne
                }
                totalQuestions={totalQuestions}
                chosenAnswers={chosenAnswers}
                setSubmitModalIsOpen={setSubmitModalIsOpen}
              />
            </div>
          </div>
        </div>

        {submitModalIsOpen && (
          <>
            {/* <h1>sddfddfvfdffdfdfd</h1> */}
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-[20010] outline-none focus:outline-none">
              <div className="relative w-[360px] h-[320px] sm:w-[400px] md:w-[500px]  py-2 sm:py-4 lg:py-4 px-2 sm:px-4 md:px-6 mx-auto max-w-3xl  bg-white rounded-lg shadow-2xl">
                {/*content*/}
                <div className="flex flex-col px-8 gap-2   h-full ">
                  <div>
                    {/* header */}
                    <h1 className="text-center text-lg font-bold">
                      Test Summary
                    </h1>
                  </div>
                  {/* <div className="px-2">
                    <div className="border-slate-300 rounded-lg border-2 "></div>
                  </div> */}

                  <div className=" grow">
                    <div className="flex justify-between px-4">
                      <span> No of Question</span>
                      <span> {totalQuestions}</span>
                    </div>
                    <div className=" my-1">
                      <div className="border-slate-300 rounded-lg border "></div>
                    </div>

                    <div className="flex justify-between px-4">
                      <span>Answered</span>
                      <span>{chosenAnswers?.length}</span>
                    </div>
                    <div className="my-1">
                      <div className="border-slate-300 rounded-lg border "></div>
                    </div>
                    <div className="flex justify-between px-4">
                      <span>Marked</span>
                      <span>{isMarkedQuestionId?.length}</span>
                    </div>
                    <div className=" my-1">
                      <div className="border-slate-300 rounded-lg border "></div>
                    </div>
                    <div className="flex justify-between px-4">
                      <span>Not Visited</span>
                      <span>{totalQuestions - seenQuestionId?.length}</span>
                    </div>
                    <div className=" my-1">
                      <div className="border-slate-300 rounded-lg border "></div>
                    </div>
                    <div className="flex justify-between px-4">
                      <span>Skipped</span>
                      <span>{questions?.length - chosenAnswers?.length}</span>
                    </div>
                    <div className=" my-1">
                      <div className="border-slate-300 rounded-lg border "></div>
                    </div>
                    <div className="flex justify-between px-4">
                      <span>Taken time to fisinsh </span>
                      <span>{takenTimeToFinish} s</span>
                    </div>
                  </div>

                  <div>
                    {/* footer */}
                    <div className="flex justify-between items-center">
                      <span>
                        Are you sure do you want to submit the answers?
                      </span>
                      <div className="flex justify-end gap-4">
                        <span
                          onClick={() => setSubmitModalIsOpen(false)}
                          className="grow  font-semibold text-center text-[#28282899]  border px-2 py-1  hover:cursor-pointer hover:bg-gray-200 rounded-lg "
                        >
                          No
                        </span>
                        <span
                          onClick={handleQuizSubmit}
                          className="grow font-semibold text-center px-2 py-1  bg-[#27DC69]  hover:cursor-pointer hover:bg-[#48a167] rounded-lg text-white "
                        >
                          Yes
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="opacity-25 fixed inset-0  z-[20000] bg-black"></div>
          </>
        )}
        {shouldShowMouseOutsideErrorModal && (
          <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-[20010] outline-none focus:outline-none">
              <div className="relative px-2 py-2 w-[380px]  bg-white rounded-lg shadow-2xl">
                {/*content*/}
                <div>
                  <div className="text-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="red"
                      className="w-12 h-12 inline "
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
                      />
                    </svg>
                  </div>
                  <h1 className="text-red-600 text-center font-bold text-lg">
                    you can not go outside of this tab. <br />
                    <span className="text-md text-sm">
                      Otherwise, we are going to{" "}
                      <span className=" font-extrabold text-xl">kill</span> your
                      browser.
                    </span>
                  </h1>
                  <span
                    onClick={() => setShouldShowMouseOutsideErrorModal(false)}
                    className="w-full block font-bold text-center py-2 my-2 bg-red-500 bg- hover:cursor-pointer hover:bg-red-600 rounded-lg"
                  >
                    Ok, I undderstand.
                  </span>
                </div>
              </div>
            </div>
            <div className="opacity-25 fixed inset-0  z-[20000] bg-black"></div>
          </>
        )}
      </div>
    </div>
  );
};

export default OnProcessinAssesments;
