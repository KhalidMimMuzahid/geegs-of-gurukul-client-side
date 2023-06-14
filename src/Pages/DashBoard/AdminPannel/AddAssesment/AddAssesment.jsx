import React, { useContext, useEffect, useState } from "react";
import "./AddAssesment.css";
import { useForm } from "react-hook-form";
import moment from "moment/moment";
import { AuthContext } from "../../../../contexts/UserProvider/UserProvider";
import { toast } from "react-hot-toast";
import AddQuestions from "./AddQuestions/AddQuestions";

// import EachAssesment from "./EachAssesment/EachAssesment";
const AddAssesment = () => {
  const { user } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    const justNow = moment().format();
    const {
      assessmentName,
      batchId,
      duration,
      enabledNegativeMarking,
      instruction,
      isOptional,
      scheduledAt,
      shouldShowAnswer,
      shouldShuffle,
      categoryName,
    } = data;
    const actionsDetails = {
      isDeleted: false,
      creation: {
        createdAt: justNow,
        creatorEmail: user?.email,
      },
      updation: {
        updatedAt: justNow,
        updatorEmail: user?.email,
      },
    };
    const questions = [];
    const assessmentMainInfo = {
      assessmentName,
      batchId,
      duration: parseInt(duration),
      enabledNegativeMarking,
      instruction,
      isOptional,
      scheduledAt,
      actionsDetails,
      shouldShowAnswer,
      shouldShuffle,
      categoryName,
      questions,
    };
    console.log("assessment: ", assessmentMainInfo);
    const assessment = { ...assessmentMainInfo, questions: addedQuestion };
    if (addedQuestion?.length < 10) {
      window.alert("you must have at least 10 questions");
      return;
    }
    // console.log(" assesment : ", assesment);
    fetch("https://api.geeksofgurukul.com/api/v1/assessments/add-assesment", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(assessment),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data?.acknowledged) {
          // todo: is succesfully addded
          toast.success("successfully added");
          // setAssessmentMainInfo({});
          setAddedQuestion([]);
          // event.target.reset();
        } else {
          // todo: something went wrong
          toast.error("can't be added");
        }
      });
  };
  const [question, setQuestion] = useState([]);
  // const [assessmentMainInfo, setAssessmentMainInfo] = useState({});
  const [searchParameteres, setSearchParameteres] = useState({});
  const [searchParameteresForQueries, setSearchParameteresForQueries] =
    useState({});
  const [addedQuestion, setAddedQuestion] = useState([]);
  useEffect(() => {
    console.log("searchParameteresForQueries: ", searchParameteresForQueries);
    if (!searchParameteresForQueries) {
      // it should be not going to nex step
      // return
    }
    fetch("https://api.geeksofgurukul.com/api/v1/questions/get-questions", {
      headers: {
        "content-type": "application/json",
        searchparameteresforqueries: JSON.stringify(
          searchParameteresForQueries
        ),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("data:   ", data);
        setQuestion(data);
      });
  }, [searchParameteresForQueries]);

  // const onSubmit = (data) => {
  //   console.log("data: ", data);
  //   const { assessmentName, topicName, batchId, scheduledAt, duration } = data;
  // };
  // const handleInputChange = (event) => {
  //   const field = event.target.name;
  //   // console.log("field: ", field);
  //   const value = event.target.value;
  //   // console.log(value);
  //   const newassesmentMainInfo = { ...assessmentMainInfo };
  //   newassesmentMainInfo[field] = value;
  //   setAssessmentMainInfo(newassesmentMainInfo);
  //   console.log("assessmentMainInfo: ", assessmentMainInfo);
  // };
  const handleSearchQueryInputChange = (event) => {
    const field = event.target.name;
    // console.log("field: ", field);
    const value = event.target.value;
    // console.log(value);
    const newSearchParameteres = { ...searchParameteres };
    newSearchParameteres[field] = value;
    setSearchParameteres(newSearchParameteres);
    // console.log("searchParameteres: ", searchParameteres);
  };
  const handleSearchQueryFormSubmit = (event) => {
    event.preventDefault();
    setSearchParameteresForQueries({});
    setSearchParameteresForQueries(searchParameteres);
  };
  // const addAssesment = (event) => {
  //   event.preventDefault();
  //   const assessment = { ...assessmentMainInfo, questions: addedQuestion };
  //   if (addedQuestion?.length < 10) {
  //     window.alert("you must have at least 10 questions");
  //     return;
  //   }
  //   // console.log(" assesment : ", assesment);
  //   fetch("https://api.geeksofgurukul.com/api/v1/questions/add-assesment", {
  //     method: "POST",
  //     headers: {
  //       "content-type": "application/json",
  //     },
  //     body: JSON.stringify(assessment),
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log(data);
  //       if (data?.acknowledged) {
  //         // todo: is succesfully addded

  //         setAssessmentMainInfo({});
  //         setAddedQuestion([]);
  //         event.target.reset();
  //       } else {
  //         // todo: something went wrong
  //       }
  //     });
  // };
  return (
    <div className="pb-10">
      <div className="assessment-area font-poppins">
        <div className="container">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="text-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="addAssessment mb-4">
                  <label>Assessment Name</label>
                  <input
                    type="text"
                    name="assessmentName"
                    {...register("assessmentName", {
                      required: "Assesment Name is required",
                    })}
                    aria-invalid={errors.assessmentName ? "true" : "false"}
                    className="w-full border-[#D0D5DD] hover:border-[#4BA25D] hover:shadow hover:shadow-[#4BA25D] focus:border-[#4BA25D] focus:shadow focus:shadow-[#4BA25D] focus:ring-0 duration-200 rounded-lg mt-2"
                    placeholder="Enter the assessment name"
                  />
                  {errors.assessmentName && (
                    <p
                      role="alert"
                      className="text-sm"
                      style={{ color: "red" }}
                    >
                      {errors.assessmentName?.message}
                    </p>
                  )}
                </div>
                <div className="addAssessment mb-4">
                  <label>Category</label>
                  <input
                    type="text"
                    name="categoryName"
                    {...register("categoryName", {
                      required: "Category Name is required",
                    })}
                    aria-invalid={errors.categoryName ? "true" : "false"}
                    className="w-full border-[#D0D5DD] hover:border-[#4BA25D] hover:shadow hover:shadow-[#4BA25D] focus:border-[#4BA25D] focus:shadow focus:shadow-[#4BA25D] focus:ring-0 duration-200 rounded-lg mt-2"
                    placeholder="Enter the Category"
                  />
                  {errors.categoryName && (
                    <p
                      role="alert"
                      className="text-sm"
                      style={{ color: "red" }}
                    >
                      {errors.categoryName?.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="col-span-12 md:col-span-6">
                <div className="addAssessment mb-4">
                  <label>Batch Id</label>
                  <input
                    type="text"
                    name="batchId"
                    {...register("batchId", {
                      required: "Batch Id is required",
                    })}
                    aria-invalid={errors.batchId ? "true" : "false"}
                    className="w-full border-[#D0D5DD] hover:border-[#4BA25D] hover:shadow hover:shadow-[#4BA25D] focus:border-[#4BA25D] focus:shadow focus:shadow-[#4BA25D] focus:ring-0 duration-200 rounded-lg mt-2"
                    placeholder="Enter the Batch Id"
                  />
                  {errors.batchId && (
                    <p
                      role="alert"
                      className="text-sm"
                      style={{ color: "red" }}
                    >
                      {errors.batchId?.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="mb-4">
                  <div className="addAssessment">
                    <label htmlFor="scheduledAt">Scheduled At</label>
                    <input
                      type="datetime-local"
                      name="scheduledAt"
                      {...register("scheduledAt", {
                        required: "Schedule Date and Time required",
                      })}
                      aria-invalid={errors.scheduledAt ? "true" : "false"}
                      className="w-full border-[#D0D5DD] hover:border-[#4BA25D] hover:shadow hover:shadow-[#4BA25D] focus:border-[#4BA25D] focus:shadow focus:shadow-[#4BA25D] focus:ring-0 duration-200 rounded-lg mt-2"
                    />
                    {errors.scheduledAt && (
                      <p
                        role="alert"
                        className="text-sm"
                        style={{ color: "red" }}
                      >
                        {errors.scheduledAt?.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="mb-4">
                  <div className="addAssessment">
                    <label>Duration</label>
                    <input
                      type="number"
                      name="duration"
                      {...register("duration", {
                        required: "Duration is required",
                      })}
                      aria-invalid={errors.duration ? "true" : "false"}
                      className="w-full border-[#D0D5DD] hover:border-[#4BA25D] hover:shadow hover:shadow-[#4BA25D] focus:border-[#4BA25D] focus:shadow focus:shadow-[#4BA25D] focus:ring-0 duration-200 rounded-lg mt-2"
                      placeholder="Enter the duration"
                    />
                    {errors.duration && (
                      <p
                        role="alert"
                        className="text-sm"
                        style={{ color: "red" }}
                      >
                        {errors.duration?.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
            {/* Toggle Inputs */}
            <div className="w-full mx-auto my-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
              {/* Toggle Inputs */}
              <div>
                <label
                  htmlFor="enabledNegativeMarking"
                  className="flex items-center cursor-pointer relative mb-4"
                >
                  <input
                    type="checkbox"
                    id="enabledNegativeMarking"
                    name="enabledNegativeMarking"
                    {...register("enabledNegativeMarking")}
                    className="sr-only bg-green-500"
                  />
                  <div className="toggle-bg bg-gray-200 border-2 border-gray-200 h-6 w-11 rounded-full"></div>
                  <span className="ml-3 text-gray-900 text-sm font-medium">
                    Enable Negative Marking
                  </span>
                </label>
              </div>
              <div>
                <label
                  htmlFor="shouldShuffle"
                  className="flex items-center cursor-pointer relative mb-4"
                >
                  <input
                    type="checkbox"
                    id="shouldShuffle"
                    name="shouldShuffle"
                    {...register("shouldShuffle")}
                    className="sr-only"
                  />
                  <div className="toggle-bg bg-gray-200 border-2 border-gray-200 h-6 w-11 rounded-full"></div>
                  <span className="ml-3 text-gray-900 text-sm font-medium">
                    Shuffle Questions/Options
                  </span>
                </label>
              </div>
              <div>
                <label
                  htmlFor="shouldShowAnswer"
                  className="flex items-center cursor-pointer relative mb-4"
                >
                  <input
                    type="checkbox"
                    id="shouldShowAnswer"
                    name="shouldShowAnswer"
                    {...register("shouldShowAnswer")}
                    className="sr-only"
                  />
                  <div className="toggle-bg bg-gray-200 border-2 border-gray-200 h-6 w-11 rounded-full"></div>
                  <span className="ml-3 text-gray-900 text-sm font-medium">
                    Show Answers
                  </span>
                </label>
              </div>
              <div>
                <label
                  htmlFor="isOptional"
                  className="flex items-center cursor-pointer relative mb-4"
                >
                  <input
                    type="checkbox"
                    id="isOptional"
                    name="isOptional"
                    {...register("isOptional")}
                    className="sr-only"
                  />
                  <div className="toggle-bg bg-gray-200 border-2 border-gray-200 h-6 w-11 rounded-full"></div>
                  <span className="ml-3 text-gray-900 text-sm font-medium">
                    Optional
                  </span>
                </label>
              </div>
            </div>
            {/* Text Area */}
            <div className="w-full mx-auto my-10">
              <label htmlFor="instruction" className="block mb-2">
                Instructions :
              </label>
              <textarea
                id="instruction"
                name="instruction"
                {...register("instruction", {
                  required: "Instruction must have to give",
                })}
                rows="4"
                className="w-full text-sm border-[#D0D5DD] hover:border-[#4BA25D] hover:shadow hover:shadow-[#4BA25D] focus:border-[#4BA25D] focus:shadow focus:shadow-[#4BA25D] focus:ring-0 duration-200 rounded-lg"
                placeholder="Your message..."
                aria-invalid={errors.instructions ? "true" : "false"}
              ></textarea>
              {errors.instructions && (
                <p role="alert" className="text-sm" style={{ color: "red" }}>
                  {errors.instructions?.message}
                </p>
              )}
            </div>
            {/* Add questions */}
            <AddQuestions
              addedQuestion={addedQuestion}
              handleSearchQueryInputChange={handleSearchQueryInputChange}
              handleSearchQueryFormSubmit={handleSearchQueryFormSubmit}
              setSearchParameteres={setSearchParameteres}
              setAddedQuestion={setAddedQuestion}
              question={question}
            />
            {/* Add questions */}
            <button
              type="submit"
              className="text-white p-2.5 w-full rounded-lg bg-[#4BA25D] hover:bg-[#5fb370]"
            >
              Submit
            </button>
          </form>

          {/* Table */}
        </div>
      </div>
    </div>
  );
};

export default AddAssesment;
