import React, { useEffect, useState } from "react";
import "./AddAssesment.css";
import { BiSearch } from "react-icons/bi";
import { useForm } from "react-hook-form";
import EachAssesment from "./EachAssesment/EachAssesment";

// import EachAssesment from "./EachAssesment/EachAssesment";
const AddAssesment = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
  };
  const [question, setQuestion] = useState([]);
  const [assessmentMainInfo, setAssessmentMainInfo] = useState({});
  const [searchParameteres, setSearchParameteres] = useState({});
  const [searchParameteresForQueries, setSearchParameteresForQueries] =
    useState({});
  const [addedQuestion, setAddedQuestion] = useState([]);
  useEffect(() => {
    // console.log("searchParameteresForQueries: ", searchParameteresForQueries);
    if (!searchParameteresForQueries) {
      // it should be not going to nex step
      // return
    }
    fetch("http://localhost:5000/get-questions", {
      headers: {
        "content-type": "application/json",
        searchparameteresforqueries: JSON.stringify(
          searchParameteresForQueries
        ),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setQuestion(data);
      });
  }, [searchParameteresForQueries]);

  // const onSubmit = (data) => {
  //   console.log("data: ", data);
  //   const { assessmentName, topicName, batchId, scheduledAt, duration } = data;
  // };
  const handleInputChange = (event) => {
    const field = event.target.name;
    // console.log("field: ", field);
    const value = event.target.value;
    // console.log(value);
    const newassesmentMainInfo = { ...assessmentMainInfo };
    newassesmentMainInfo[field] = value;
    setAssessmentMainInfo(newassesmentMainInfo);
    console.log("assessmentMainInfo: ", assessmentMainInfo);
  };
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
  const addAssesment = (event) => {
    event.preventDefault();
    const assesment = { ...assessmentMainInfo, questions: addedQuestion };
    if (addedQuestion?.length < 10) {
      window.alert("you must have at least 10 questions");
      return;
    }
    // console.log(" assesment : ", assesment);
    fetch("http://localhost:5000/add-assesment", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(assesment),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data?.acknowledged) {
          // todo: is succesfully addded

          setAssessmentMainInfo({});
          setAddedQuestion([]);
          event.target.reset();
        } else {
          // todo: something went wrong
        }
      });
  };
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
                  <label>Topic</label>
                  <input
                    // required
                    type='text'
                    name='topicName'
                    // onChange={handleInputChange}
                    {...register("topicName", {
                      required: "Topic Name is required",
                    })}
                    aria-invalid={errors.topicName ? "true" : "false"}
                  />
                  {errors.topicName && (
                    <p
                      role='alert'
                      className='text-red-500 font-poppins font-medium'
                    >
                      {errors.topicName?.message}
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
                  for='EnableNegativeMarking'
                  class='flex items-center cursor-pointer relative mb-4'
                >
                  <input
                    type='checkbox'
                    id='EnableNegativeMarking'
                    name='EnableNegativeMarking'
                    {...register("EnableNegativeMarking")}
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
                  for='ShuffleQuestionsOptions'
                  class='flex items-center cursor-pointer relative mb-4'
                >
                  <input
                    type='checkbox'
                    id='ShuffleQuestionsOptions'
                    name='ShuffleQuestionsOptions'
                    {...register("ShuffleQuestionsOptions")}
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
                  for='ShowAnswers'
                  class='flex items-center cursor-pointer relative mb-4'
                >
                  <input
                    type='checkbox'
                    id='ShowAnswers'
                    name='ShowAnswers'
                    {...register("ShowAnswers")}
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
                  for='Optional'
                  class='flex items-center cursor-pointer relative mb-4'
                >
                  <input
                    type='checkbox'
                    id='Optional'
                    name='Optional'
                    {...register("Optional")}
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
                for='instructions'
                class='block mb-2 text-md font-poppins font-medium text-gray-900 dark:text-gray-400'
              >
                Instructions :
              </label>
              <textarea
                id='instructions'
                name='instructions'
                {...register("instructions", {
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
          <h4 className='text-center font-poppins font-medium my-5'>
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
          {/* <div className="row">
            <div className="col-md-12">
              <div className="display-show">
                <div className="row">
                  <div className="col-md-2"></div>
                  <div className="col-md-10">
                    <div className="row">
                      <div className="col-md-4">
                        <div className="part-question">
                          <div className="title-part">
                            <h2>Question Names</h2>
                          </div>
                          <h3>
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Quod asperiores sit aperiam officiis laborum.{" "}
                          </h3>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="part-question">
                          <div className="title-part">
                            <h2>Topic </h2>
                          </div>
                          <h3>SC</h3>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="part-question">
                          <div className="title-part">
                            <h2>Difficulty</h2>
                          </div>
                          <h3>Easy</h3>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div> */}

          {/* <table className='table table-bordered'>
            <thead>
              <tr>
                <th>Sl No</th>
                <th>Question</th>
                <th>topic</th>
                <th>difficulty</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {question?.map((eachQues, i) => (
                <EachAssesment
                  eachQues={eachQues}
                  key={eachQues?._id}
                  i={i}
                  addedQuestion={addedQuestion}
                  setAddedQuestion={setAddedQuestion}
                />
              ))}
            </tbody>
          </table> */}
          {/* New Table */}
          <section class='antialiased bg-white text-gray-600 px-4 my-10'>
            <div class='flex flex-col justify-center h-full'>
              {/* <!-- Table --> */}
              <div class='w-full max-w-2xl mx-auto bg-white shadow-lg rounded-sm border border-gray-200'>
                <header class='px-5 py-4 border-b border-gray-100'>
                  <h2 class='font-semibold text-gray-800'>Questions</h2>
                </header>
                <div class='p-3'>
                  <div class='overflow-x-auto'>
                    <table class='table-auto w-full'>
                      <thead class='text-xs font-semibold uppercase text-gray-400 bg-gray-50'>
                        <tr>
                          <th class='p-2 whitespace-nowrap'>
                            <div class='font-semibold text-left'>SL No.</div>
                          </th>
                          <th class='p-2 whitespace-nowrap'>
                            <div class='font-semibold text-left'>Questions</div>
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
                        {question?.map((eachQues, i) => (
                          <EachAssesment
                            eachQues={eachQues}
                            key={eachQues?._id}
                            i={i}
                            addedQuestion={addedQuestion}
                            setAddedQuestion={setAddedQuestion}
                          />
                          // sample table row design pay attention khaled vai
                          //                       <tr>
                          //   <td class='p-2 whitespace-nowrap'>
                          //     <div class='flex items-center'>
                          //       <div class='w-10 h-10 flex-shrink-0 mr-2 sm:mr-3'>
                          //         <img
                          //           class='rounded-full'
                          //           src='https://raw.githubusercontent.com/cruip/vuejs-admin-dashboard-template/main/src/images/user-36-07.jpg'
                          //           width='40'
                          //           height='40'
                          //           alt='Mirko Fisuk'
                          //         />
                          //       </div>
                          //       <div class='font-medium text-gray-800'>Mirko Fisuk</div>
                          //     </div>
                          //   </td>
                          //   <td class='p-2 whitespace-nowrap'>
                          //     <div class='text-left'>mirkofisuk@gmail.com</div>
                          //   </td>
                          //   <td class='p-2 whitespace-nowrap'>
                          //     <div class='text-left font-medium text-green-500'>$2,996.00</div>
                          //   </td>
                          //   <td class='p-2 whitespace-nowrap'>
                          //     <div class='text-lg text-center'>??</div>
                          //   </td>
                          //   <td class='p-2 whitespace-nowrap'>
                          //     <div class='text-lg text-center'>??</div>
                          //   </td>
                          // </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default AddAssesment;
