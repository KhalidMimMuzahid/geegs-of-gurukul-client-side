import React, { useContext, useEffect, useState } from "react";
import "./AddAssesment.css";
import { BiSearch } from "react-icons/bi";
import { useForm } from "react-hook-form";
import EachAssesment from "./EachAssesment/EachAssesment";
import moment from "moment/moment";
import { AuthContext } from "../../../../contexts/UserProvider/UserProvider";
import { toast } from "react-hot-toast";

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
    fetch("http://localhost:5000/api/v1/assessments/add-assesment", {
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
    fetch("http://localhost:5000/api/v1/questions/get-questions", {
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
  //   fetch("http://localhost:5000/api/v1/questions/add-assesment", {
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
    <div>
      <div className='assessment-area'>
        <div className='container'>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className=' font-poppins font-medium'>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div className='addAssessment'>
                  <label>Assessment Name</label>
                  <input
                    type='text'
                    // required
                    name='assessmentName'
                    {...register("assessmentName", {
                      required: "Assesment Name is required",
                    })}
                    aria-invalid={errors.assessmentName ? "true" : "false"}
                    // onChange={handleInputChange}
                  />
                  {errors.assessmentName && (
                    <p
                      role='alert'
                      className='text-red-500 font-poppins font-medium'
                    >
                      {errors.assessmentName?.message}
                    </p>
                  )}
                </div>
                <div className='addAssessment'>
                  <label>Category</label>
                  <input
                    // required
                    type='text'
                    name='categoryName'
                    // onChange={handleInputChange}
                    {...register("categoryName", {
                      required: "Category Name is required",
                    })}
                    aria-invalid={errors.categoryName ? "true" : "false"}
                  />
                  {errors.categoryName && (
                    <p
                      role='alert'
                      className='text-red-500 font-poppins font-medium'
                    >
                      {errors.categoryName?.message}
                    </p>
                  )}
                </div>
              </div>

              <div className='col-span-12 md:col-span-6'>
                <div className='addAssessment'>
                  <label>Batch Id</label>
                  <input
                    // required
                    type='text'
                    name='batchId'
                    // onChange={handleInputChange}
                    {...register("batchId", {
                      required: "Batch Id is required",
                    })}
                    aria-invalid={errors.batchId ? "true" : "false"}
                  />
                  {errors.batchId && (
                    <p
                      role='alert'
                      className='text-red-500 font-poppins font-medium'
                    >
                      {errors.scheduledAt?.message}
                    </p>
                  )}
                </div>
              </div>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div className=''>
                  <div className='addAssessment'>
                    <label htmlFor='scheduledAt'>Scheduled At</label>
                    <input
                      // required
                      type='datetime-local'
                      name='scheduledAt'
                      // onChange={handleInputChange}
                      {...register("scheduledAt", {
                        required: "Scedule Time is required",
                      })}
                      aria-invalid={errors.scheduledAt ? "true" : "false"}
                    />
                    {errors.scheduledAt && (
                      <p
                        role='alert'
                        className='text-red-500 font-poppins font-medium'
                      >
                        {errors.scheduledAt?.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className=''>
                  <div className='addAssessment'>
                    <label>Duration</label>
                    <input
                      // required
                      type='number'
                      name='duration'
                      // onChange={handleInputChange}
                      {...register("duration", {
                        required: "Duration is required",
                      })}
                      aria-invalid={errors.duration ? "true" : "false"}
                    />
                    {errors.duration && (
                      <p
                        role='alert'
                        className='text-red-500 font-poppins font-medium'
                      >
                        {errors.duration?.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
            {/* Toggle Inputs */}
            <div className='w-full mx-auto my-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4'>
              {/* Toggle Inputs */}
              <div>
                <label
                  for='enabledNegativeMarking'
                  class='flex items-center cursor-pointer relative mb-4'
                >
                  <input
                    type='checkbox'
                    id='enabledNegativeMarking'
                    name='enabledNegativeMarking'
                    {...register("enabledNegativeMarking")}
                    class='sr-only bg-green-500'
                  />
                  <div class='toggle-bg bg-gray-200 border-2 border-gray-200 h-6 w-11 rounded-full'></div>
                  <span class='ml-3 text-gray-900 text-sm font-medium'>
                    Enable Negative Marking
                  </span>
                </label>
              </div>
              <div>
                <label
                  for='shouldShuffle'
                  class='flex items-center cursor-pointer relative mb-4'
                >
                  <input
                    type='checkbox'
                    id='shouldShuffle'
                    name='shouldShuffle'
                    {...register("shouldShuffle")}
                    class='sr-only'
                  />
                  <div class='toggle-bg bg-gray-200 border-2 border-gray-200 h-6 w-11 rounded-full'></div>
                  <span class='ml-3 text-gray-900 text-sm font-medium'>
                    Shuffle Questions/Options
                  </span>
                </label>
              </div>
              <div>
                <label
                  for='shouldShowAnswer'
                  class='flex items-center cursor-pointer relative mb-4'
                >
                  <input
                    type='checkbox'
                    id='shouldShowAnswer'
                    name='shouldShowAnswer'
                    {...register("shouldShowAnswer")}
                    class='sr-only'
                  />
                  <div class='toggle-bg bg-gray-200 border-2 border-gray-200 h-6 w-11 rounded-full'></div>
                  <span class='ml-3 text-gray-900 text-sm font-medium'>
                    Show Answers
                  </span>
                </label>
              </div>
              <div>
                <label
                  for='isOptional'
                  class='flex items-center cursor-pointer relative mb-4'
                >
                  <input
                    type='checkbox'
                    id='isOptional'
                    name='isOptional'
                    {...register("isOptional")}
                    class='sr-only'
                  />
                  <div class='toggle-bg bg-gray-200 border-2 border-gray-200 h-6 w-11 rounded-full'></div>
                  <span class='ml-3 text-gray-900 text-sm font-medium'>
                    Optional
                  </span>
                </label>
              </div>
            </div>
            {/* Text Area */}
            <div class='w-full mx-auto my-10 font-poppins'>
              <label
                for='instruction'
                class='block mb-2 text-md font-poppins font-medium text-gray-900 dark:text-gray-400'
              >
                Instructions :
              </label>
              <textarea
                id='instruction'
                name='instruction'
                {...register("instruction", {
                  required: "Instruction must have to give",
                })}
                rows='4'
                class='block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                placeholder='Your message...'
                aria-invalid={errors.instructions ? "true" : "false"}
              ></textarea>
              {errors.instructions && (
                <p
                  role='alert'
                  className='text-red-500 font-poppins font-medium'
                >
                  {errors.instructions?.message}
                </p>
              )}
            </div>
            {/* <button type='submit'>submit</button> */}
            <button
              type='submit'
              class='group relative h-12 w-full overflow-hidden rounded-lg bg-white text-lg shadow'
            >
              <div class='absolute inset-0 w-3 bg-green-400 transition-all duration-[250ms] ease-out group-hover:w-full'></div>
              <span class='relative text-black group-hover:text-white font-poppins font-medium'>
                Submit
              </span>
            </button>
          </form>
          <h4
            style={{ textAlign: "center" }}
            className=' text-black font-poppins font-medium mt-5 text-xl'
          >
            {addedQuestion?.length === 0
              ? "You have no question added"
              : `you have added ${addedQuestion?.length} ${
                  addedQuestion?.length > 1 ? "questions" : "question"
                }`}
          </h4>

          <form onSubmit={handleSearchQueryFormSubmit} id='search-parameteres'>
            <div className='font-poppins font-medium'>
              <div className='col-md-5'>
                <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 items-center'>
                  <div className='col-md-6'>
                    <div className='search-area'>
                      <input
                        type='text'
                        name='questionName'
                        placeholder='question'
                        onChange={handleSearchQueryInputChange}
                      />
                    </div>
                  </div>
                  <div className='col-md-6'>
                    <div className='search-area'>
                      <input
                        type='text'
                        placeholder='Topic'
                        name='topicName'
                        onChange={handleSearchQueryInputChange}
                      />
                    </div>
                  </div>
                  <div className='col-md-4'>
                    <div className='search-area'>
                      <select
                        name='difficultyLevel'
                        id=''
                        defaultValue='any'
                        onChange={handleSearchQueryInputChange}
                      >
                        <option value='any' disabled>
                          Difficulty
                        </option>
                        <option value='Easy'>Easy</option>
                        <option value='Medium'>Medium</option>
                        <option value='Hard'>Hard</option>
                      </select>
                    </div>
                  </div>
                  <div className='col-md-4'>
                    <div className='search-area'>
                      <button
                        type='reset'
                        onClick={() => setSearchParameteres({})}
                        class='group relative h-12 w-32 overflow-hidden rounded-lg bg-white text-lg shadow'
                      >
                        <div class='absolute inset-0 w-3 bg-red-400 transition-all duration-[250ms] ease-out group-hover:w-full'></div>
                        <span class='relative text-black group-hover:text-white'>
                          Clear
                        </span>
                      </button>
                    </div>
                  </div>
                  <div className='col-md-4'>
                    <button
                      type='submit'
                      className='font-poppins flex bg-green-500 px-4 py-3 text-white rounded-lg hover:bg-green-400 transition-[500ms]'
                    >
                      <BiSearch size={24}></BiSearch>
                      <span>Search</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>

          {/* Table */}
          <div class='flex flex-col justify-center h-full mx-auto'>
            <div class='w-full mx-auto bg-white shadow-lg rounded-sm border border-gray-200'>
              <header class='px-5 py-4 border-b border-gray-100'>
                <h2 class='font-semibold font-poppins text-gray-800'>
                  Lectures
                </h2>
              </header>
              <div class='p-3'>
                <div class='max-w-[90vw] overflow-x-scroll'>
                  <table class='table-auto w-full font-poppins font-medium overflow-x-auto'>
                    <thead class='text-xs font-semibold uppercase text-gray-400 bg-gray-50'>
                      <tr>
                        <th class='p-2 whitespace-nowrap'>
                          <div class='font-semibold text-left'>SL No:</div>
                        </th>
                        <th class='p-2 whitespace-nowrap'>
                          <div class='font-semibold text-left'>Question</div>
                        </th>
                        <th class='p-2 whitespace-nowrap'>
                          <div class='font-semibold text-left'>Topic</div>
                        </th>
                        <th class='p-2 whitespace-nowrap'>
                          <div class='font-semibold text-center'>
                            Difficulty
                          </div>
                        </th>
                        <th class='p-2 whitespace-nowrap'>
                          <div class='font-semibold text-center'>Action</div>
                        </th>
                      </tr>
                    </thead>
                    <tbody class='text-sm divide-y divide-gray-100'>
                      {question?.length > 0 &&
                        question?.map((eachQues, i) => (
                          <EachAssesment
                            eachQues={eachQues}
                            key={eachQues?._id}
                            i={i}
                            addedQuestion={addedQuestion}
                            setAddedQuestion={setAddedQuestion}
                          />
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {/* Table */}
        </div>
      </div>
    </div>
  );
};

export default AddAssesment;
