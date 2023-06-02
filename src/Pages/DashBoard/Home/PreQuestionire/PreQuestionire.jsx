import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import school from "../../../../assets/Testimg/school.png";
import collage from "../../../../assets/Testimg/collage.png";
import student from "../../../../assets/Testimg/studentyeYes.svg";
import studentNo from "../../../../assets/Testimg/studentNo.svg";
import looking from "../../../../assets/Testimg/lookingjob.png";
import job from "../../../../assets/Testimg/working.png";
import style from "./PreQuestionire.module.css";
import { AuthContext } from "../../../../contexts/UserProvider/UserProvider";
import { useLocation, useNavigate } from "react-router-dom";
const PreQuestionire = () => {
  const { user, setJustCreatedUser } = useContext(AuthContext);
  const { email } = user;
  const location = useLocation();
  const navigate = useNavigate();
  const from = location?.state?.from?.pathname || "/";
  console.log("from from prequestioner: ", from);
  const [coLLageName, setCollageName] = useState("");
  const [shouldShowSelectError, setShouldShowSelectError] = useState(false);

  const [selectError, setSelectError] = useState({
    currentJobTitle: "select your occupation",
    grade: "select your grade",
    graduationYear: "select your graduation year",
    latestDegree: "select your latest degree",
    yearsOfExperience: "select your years of experience",
  });
  const [currentlyStuying, setCurrentlyStuying] = useState("");
  const [workAs, setWorkAs] = useState("");
  const [collageNames, setCollageNames] = useState([]);
  const [searchKeyResults, setSearchKeyResults] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      console.log("value", value);
      console.log("\nname", name);
      // console.log("\ntype", type);

      if (name === "isStudying") {
        setCurrentlyStuying(value?.isStudying);
      } else if (name === "workAs") {
        setWorkAs(value?.workAs);
      } else if (
        name === "grade" ||
        name === "currentJobTitle" ||
        name === "graduationYear" ||
        name === "latestDegree" ||
        name === "yearsOfExperience"
      ) {
        console.log("inside ");
        // const newSelectError = { ...selectError };
        // newSelectError[name] = "";
        // setSelectError(newSelectError);
        setSelectError((prev) => {
          const newSelectError = { ...prev };
          newSelectError[name] = "";
          return newSelectError;
        });
        console.log("selectError: ", selectError);
      }
      // else if (name === "currentJobTitle") {
      //   // vvvvvvvvvvvv
      // } else if (name === "graduationYear") {
      //   // vvvvvvvvvvvv
      // } else if (name === "latestDegree") {
      //   // vvvvvvvvvvvv
      // } else if (name === "yearsOfExperience") {
      //   // vvvvvvvvvvvv
      // }
      if (name === "coLLageName") {
        setSearchKey(value?.coLLageName);
        setCollageName(value?.coLLageName);
      }
    });
    return () => subscription.unsubscribe();
  });
  const handleUserDetails = (data) => {
    // console.log("pre questions data: ", data);

    let profession = {};
    const {
      companyName,
      currentJobTitle,
      grade,
      graduationYear,
      isStudying,
      latestDegree,
      schoolName,
      workAs,
      yearsOfExperience,
    } = data;

    if (workAs === "schoolStudent") {
      profession = { workAs, schoolName, grade: parseInt(grade) };
    } else if (workAs === "collageStudent") {
      profession = {
        workAs,
        coLLageName,
        latestDegree,
        graduationYear: parseInt(graduationYear),
      };
    } else if (workAs === "jobSeeker") {
      profession = {
        workAs,
        coLLageName,
        latestDegree,
        graduationYear: parseInt(graduationYear),
      };
    } else if (workAs === "jobHolder") {
      profession = {
        workAs,
        currentJobTitle,
        companyName,
        yearsOfExperience: parseInt(yearsOfExperience),
      };
    }
    // console.log("Profession: ", profession);

    const userDetails = { profession, email, address: "" };
    console.log("userDetails: ", userDetails);
    fetch("http://localhost:5000/api/v1/users/user-details", {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(userDetails),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("user details updated: ", data);
        console.log("just created false: ", data);

        if (data?.modifiedCount) {
          setJustCreatedUser(false);
          navigate(from);
        }
        // if (data?.acknowledged) {
        //   fetch(
        //     `http://localhost:5000/api/v1/users/just-created-false?email=${user?.email}`,
        //     {
        //       method: "PUT",
        //     }
        //   )
        //     .then((res) => res.json())
        //     .then((data) => {
        //       console.log("just created false: ", data);

        //       if (data?.modifiedCount) {
        //         setJustCreatedUser(false);
        //         navigate(from);
        //       }
        //     });
        // }
      });
  };
  useEffect(() => {
    fetch("collageNames.json")
      .then((res) => res.json())
      .then((data) => {
        setCollageNames(data);
      });
  }, []);
  useEffect(() => {
    if (searchKey.length) {
      const targetCollages = collageNames.filter((eachCollage) => {
        const searchKeyLowerCases = searchKey.toLowerCase();

        const eachCollageLowerCase = eachCollage.toLowerCase();
        return eachCollageLowerCase.includes(searchKeyLowerCases);
      });

      if (targetCollages.length > 500) {
        targetCollages.length = 500;
        setSearchKeyResults(targetCollages);
      } else {
        setSearchKeyResults(targetCollages);
      }
      console.log("targetCollages: ", targetCollages);
    } else {
      // TODO: if there have no searchkey then i should take all medicienes form database
      setSearchKeyResults([]);
    }
  }, [searchKey]);
  const handleOnBlur = () => {
    setTimeout(function () {
      setSearchKeyResults([]);
      setSearchKey("");
    }, 200);
  };
  const handleMedicineClick = (coLLageNameX) => {
    let collageInputElement = document.getElementById("coLLageName");
    collageInputElement.value = coLLageNameX;
    setCollageName(coLLageNameX);
    setSearchKeyResults([]);
  };

  // console.log(workAs);
  return (
    <form
      action=''
      onSubmit={handleSubmit(handleUserDetails)}
      className={`${style.assesstestA}`}
    >
      <div>
        {/* header */}
        <h1 className={`text-center md:text-left ${style.nameAss}`}>
          Welcome{" "}
          <span className='font-bold text-2xl text-green-500'>
            {user?.name}
          </span>{" "}
          !
        </h1>
      </div>

      <div className=' grow'>
        <div>
          {/* show te user greetings  */}

          <div className='w-[280px]  sm:w-[300px] md:w-[500px] lg-[600px] mx-auto'>
            {/* indepth to go the next question  */}
            <div>
              {/* get data for they are currently studying or not  */}
              <div className='my-2'>
                <label className={`text-center mb-5 ${style.titleSub}`}>
                  Are you Currently Studying ?
                </label>
                <div className=' md:flex md:justify-between'>
                  <div
                    className={`${
                      currentlyStuying === "true" && "shadow-md"
                    } md:flex md:items-center`}
                  >
                    <label htmlFor='isStudying' className='ml-2'>
                      <input
                        {...register("isStudying", {
                          required: {
                            value: true,
                            message: "select one of them",
                          },
                        })}
                        type='radio'
                        id='isStudying'
                        name='isStudying'
                        value='true'
                      />
                      <img
                        src={student}
                        className='md:mx-0 mx-auto w-28'
                        alt=''
                      />
                    </label>
                  </div>
                  <div
                    className={`${
                      currentlyStuying === "false" && "shadow-md"
                    } md:flex md:items-center`}
                  >
                    <label htmlFor='isNotStudying' className='ml-2'>
                      <input
                        {...register("isStudying", {
                          required: {
                            value: true,
                            message: "select one of them",
                          },
                        })}
                        type='radio'
                        id='isNotStudying'
                        name='isStudying'
                        value='false'
                      />
                      <img
                        className='md:mx-0 mx-auto w-28'
                        src={studentNo}
                        alt=''
                      />
                    </label>
                  </div>
                </div>

                {errors?.isStudying && (
                  <p role='alert' className='text-red-500 font-bold'>
                    {/* Name is required */}
                    {errors?.isStudying?.message}
                  </p>
                )}
              </div>
              {/* input field for worrkAs  */}
              <div>
                {/* if currently studying then get data for they are school student or cllage student   */}
                {currentlyStuying === "true" && (
                  <div className={` my-2  `}>
                    <label className={`${style.titleSub} text-center mb-5`}>
                      Are you currently ?
                    </label>
                    <div className='md:flex md:justify-between'>
                      <div
                        className={`md:flex md:items-center ${
                          workAs === "schoolStudent" && "shadow-md"
                        } `}
                      >
                        <label htmlFor='schoolStudent' className='ml-2'>
                          <input
                            {...register("workAs", {
                              required: {
                                value: true,
                                message: "select one of them",
                              },
                            })}
                            type='radio'
                            id='schoolStudent'
                            name='workAs'
                            value='schoolStudent'
                          />
                          <img
                            className='md:mx-0 mx-auto w-28'
                            src={school}
                            alt=''
                          />
                        </label>
                      </div>
                      <div
                        className={`md:flex md:items-center ${
                          workAs === "collageStudent" && "shadow-md"
                        } `}
                      >
                        <label htmlFor='collageStudent' className='ml-2'>
                          <input
                            {...register("workAs", {
                              required: {
                                value: true,
                                message: "select one of them",
                              },
                            })}
                            type='radio'
                            id='collageStudent'
                            name='workAs'
                            value='collageStudent'
                          />
                          <img
                            className='md:mx-0 mx-auto w-28'
                            src={collage}
                            alt=''
                          />
                        </label>
                      </div>
                    </div>
                    {errors?.workAs && (
                      <p role='alert' className='text-red-500 font-bold'>
                        {/* Name is required */}
                        {errors?.workAs?.message}
                      </p>
                    )}
                  </div>
                )}

                {/* if currently not studying then get data for check are the looking foe job or alreaddy are the working   */}
                {currentlyStuying === "false" && (
                  <div className={` my-2 `}>
                    <label className={` ${style.titleSub} text-center mb-5`}>
                      Are you currently?
                    </label>

                    <div className='md:flex md:justify-between'>
                      <div
                        className={`md:flex md:items-center ${
                          workAs === "jobSeeker" && "shadow-md"
                        } `}
                      >
                        <label htmlFor='jobSeeker' className='ml-2'>
                          <input
                            {...register("workAs", {
                              required: {
                                value: true,
                                message: "select one of them",
                              },
                            })}
                            type='radio'
                            id='jobSeeker'
                            name='workAs'
                            value='jobSeeker'
                          />
                          <img
                            className='md:mx-0 mx-auto w-28'
                            src={looking}
                            alt=''
                          />
                        </label>
                      </div>
                      <div
                        className={`md:flex md:items-center ${
                          workAs === "jobHolder" && "shadow-md"
                        } `}
                      >
                        <label htmlFor='jobHolder' className='ml-2'>
                          <input
                            {...register("workAs", {
                              required: {
                                value: true,
                                message: "select one of them",
                              },
                            })}
                            type='radio'
                            id='jobHolder'
                            name='workAs'
                            value='jobHolder'
                          />
                          <img
                            className='md:mx-0 mx-auto w-28'
                            src={job}
                            alt=''
                          />
                        </label>
                      </div>
                    </div>
                    {errors?.workAs && (
                      <p role='alert' className='text-red-500 font-bold'>
                        {/* Name is required */}
                        {errors?.workAs?.message}
                      </p>
                    )}
                  </div>
                )}
              </div>

              {/* if currently studying and school sudent then go for school name and grade */}
              {workAs === "schoolStudent" && currentlyStuying === "true" && (
                <div className={` ${style.textpart} `}>
                  <div className='my-2 mb-5 '>
                    <label className={`${style.titleSub}`} htmlFor='schoolName'>
                      School Name
                    </label>
                    <input
                      className='block h-8 rounded-md md:w-full'
                      {...register("schoolName", {
                        required: {
                          value: true,
                          message: "put your school name",
                        },
                        pattern: {
                          value: /^[A-Za-z -]+$/,
                          message: "retype your school name",
                        },
                      })}
                      name='schoolName'
                      type='text'
                      id='schoolName'
                    />

                    {errors?.schoolName && (
                      <p role='alert' className='text-red-500 font-bold'>
                        {/* Name is required */}
                        {errors?.schoolName?.message}
                      </p>
                    )}
                  </div>
                  <div className='block my-2 mb-5'>
                    <div className=''>
                      <label className={`${style.titleSub}`} htmlFor='grade'>
                        Select your grade
                      </label>
                      <select
                        {...register("grade", {
                          required: {
                            value: true,
                            message: "select your grade",
                          },
                        })}
                        name='grade'
                        id='grade'
                        defaultValue='any'
                        className='block md:w-full grow h-8 py-0 rounded-md ml-2'
                      >
                        <option value='any' disabled>
                          Grade ?
                        </option>
                        <option value={6}>Six</option>
                        <option value={7}>Seven</option>
                        <option value={8}>Eight</option>
                        <option value={9}>Nine</option>
                        <option value={10}>Ten</option>
                        <option value={11}>Eleven</option>
                        <option value={12}>Twelve</option>
                      </select>
                    </div>

                    {shouldShowSelectError && selectError?.grade && (
                      <p role='alert' className='text-red-500 font-bold'>
                        {selectError?.grade}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* if currently studying and collage student or  (currently not studying and looking for job) or (optional => (currently not studying and already in working)) then go for collage Name , latest degree and graduation year */}
              {((workAs === "collageStudent" && currentlyStuying === "true") ||
                (workAs === "jobSeeker" && currentlyStuying === "false")) && (
                <div className={`${style.textpart}`}>
                  <div className=' relative '>
                    <div className=' mb-5'>
                      <label
                        className={`${style.titleSub}`}
                        htmlFor='coLLageName'
                      >
                        College name
                      </label>

                      <input
                        {...register("coLLageName", {
                          required: {
                            value: true,
                            message: "put your college name",
                          },
                          pattern: {
                            value: /^[A-Za-z -]+$/,
                            message: "retype your school name",
                          },
                        })}
                        // onChange={(e) => setSearchKey(e.target.value)}
                        onBlur={handleOnBlur}
                        onFocus={(e) => setSearchKey(e.target.value)}
                        name='coLLageName'
                        type='search'
                        id='coLLageName'
                        className='block md:w-full  h-8 rounded-md px-2 focus:ring-green-400 focus:border-green-400 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                        placeholder='Search'
                      />

                      {errors?.coLLageName && (
                        <p role='alert' className='text-red-500 font-bold'>
                          {/* Name is required */}
                          {errors?.coLLageName?.message}
                        </p>
                      )}
                    </div>

                    {searchKeyResults?.length !== 0 && (
                      <div className=' absolute w-full pr-2 md:max-w-md lg:max-w-lg mx-auto   max-h-80 overflow-y-auto  z-20  flex flex-col items-center'>
                        <div className='bg-white border-green-400 w-full border-4  border-t-0 '>
                          {/* px should be zero after 450 width  */}
                          {/* ${styles.textsearchresponsive} */}
                          <ul className={`  w-full    `}>
                            {searchKeyResults.map((eachResult, i) => (
                              <li
                                onClick={() => handleMedicineClick(eachResult)}
                                // onClick={() => console.log("xxxxxxxxxx")}
                                key={i}
                                className='block w-full bg-primary text-black font-bold px-4 py-1 hover:bg-green-300 hover:cursor-pointer'
                              >
                                {eachResult}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* <div>
                    <label htmlFor="latestDegree">latestDegree</label>
                    <input type="text" id="latestDegree" />
                  </div> */}
                  <div className='my-2 mb-5'>
                    <div className=''>
                      <label
                        className={`${style.titleSub}`}
                        htmlFor='latestDegree'
                      >
                        Type your latest degree
                      </label>
                      <input
                        {...register("latestDegree", {
                          required: {
                            value: true,
                            message: "mention your latest degree",
                          },
                        })}
                        name='latestDegree'
                        id='latestDegree'
                        // defaultValue="any"
                        className='block md:w-full border-black border-2 grow h-8 rounded-md ml-2 py-0'
                      >
                        {/* <option value="any" disabled>
                          Latest Degree ?
                        </option>
                        <option value="BTech">BTech</option>
                        <option value="BSC">BSC</option>
                        <option value="BBA">BBA</option>
                        <option value="MBA">MBA</option> */}
                      </input>
                    </div>
                    {/* {shouldShowSelectError && selectError?.latestDegree && ( */}
                    {/* // <p role="alert" className="text-red-500 font-bold"> */}
                    {/* Name is required */}
                    {/* {selectError?.latestDegree} */}
                    {/* </p> */}
                    {/* // )} */}
                    {errors?.latestDegree && (
                      <p role='alert' className='text-red-500 font-bold'>
                        {/* Name is required */}
                        {errors?.latestDegree.message}
                      </p>
                    )}
                  </div>
                  <div className='my-2  mb-5'>
                    <div className=''>
                      <label
                        className={`${style.titleSub}`}
                        htmlFor='graduationYear'
                      >
                        Select your graduation year
                      </label>
                      <select
                        {...register("graduationYear", {
                          required: {
                            value: true,
                            message: "select your graduation year",
                          },
                        })}
                        name='graduationYear'
                        id='graduationYear'
                        defaultValue='any'
                        className='block grow md:w-full h-8 rounded-md ml-2 py-0'
                      >
                        <option value='any' disabled>
                          Graduation Year ?
                        </option>
                        <option value={2010}>2010</option>
                        <option value={2011}>2011</option>
                        <option value={2012}>2012</option>
                        <option value={2013}>2013</option>
                        <option value={2014}>2014</option>
                        <option value={2015}>2015</option>
                        <option value={2016}>2016</option>
                        <option value={2017}>2017</option>
                        <option value={2018}>2018</option>
                        <option value={2019}>2019</option>
                        <option value={2020}>2020</option>
                        <option value={2021}>2021</option>
                        <option value={2022}>2022</option>
                        <option value={2023}>2023</option>
                        <option value={2024}>2024</option>
                        <option value={2025}>2025</option>
                        <option value={2026}>2026</option>
                        <option value={2027}>2027</option>
                        <option value={2028}>2028</option>
                        <option value={2029}>2029</option>
                        <option value={2030}>2030</option>
                        <option value={2031}>2031</option>
                        <option value={2032}>2032</option>
                        <option value={2033}>2033</option>
                        <option value={2034}>2034</option>
                        <option value={2035}>2035</option>
                        <option value={2036}>2036</option>
                        <option value={2037}>2037</option>
                        <option value={2038}>2038</option>
                        <option value={2039}>2039</option>
                        <option value={2040}>2040</option>
                        <option value={2041}>2041</option>
                        <option value={2042}>2042</option>
                        <option value={2043}>2043</option>
                        <option value={2044}>2044</option>
                        <option value={2045}>2045</option>
                        <option value={2046}>2046</option>
                        <option value={2047}>2047</option>
                        <option value={2048}>2048</option>
                        <option value={2049}>2049</option>
                        <option value={2050}>2050</option>
                      </select>
                    </div>

                    {shouldShowSelectError === true &&
                      selectError?.graduationYear !== "" && (
                        <p role='alert' className='text-red-500 font-bold'>
                          {/* Name is required */}
                          {selectError?.graduationYear}
                        </p>
                      )}
                  </div>
                </div>
              )}

              {/* if currently not studying and already in working then n go for ( optional ==> (collage Name , latest degree aand graduation year)) company name, works of experience, occption  */}
              {workAs === "jobHolder" && currentlyStuying === "false" && (
                <div className={`${style.textpart} `}>
                  <div className='my-2  mb-5'>
                    <label
                      className={`${style.titleSub}`}
                      htmlFor='companyName'
                    >
                      Company Name
                    </label>
                    <input
                      {...register("companyName", {
                        required: {
                          value: true,
                          message: "put your company name",
                        },
                        pattern: {
                          value: /^[A-Za-z -]+$/,
                          message: "retype your company name",
                        },
                      })}
                      type='text'
                      name='companyName'
                      id='companyName'
                      className='block md:w-full h-8 rounded-md '
                    />
                    {errors?.companyName && (
                      <p role='alert' className='text-red-500 font-bold'>
                        {/* Name is required */}
                        {errors?.companyName?.message}
                      </p>
                    )}
                  </div>
                  <div className='my-2 mb-5'>
                    <div className=''>
                      <label
                        className={`${style.titleSub}`}
                        htmlFor='yearsOfExperience'
                      >
                        Select your experience
                      </label>
                      <select
                        {...register("yearsOfExperience", {
                          required: {
                            value: true,
                            message: "select your experience",
                          },
                        })}
                        name='yearsOfExperience'
                        id='yearsOfExperience'
                        defaultValue='any'
                        className='block md:w-full h-8 grow rounded-md ml-2 py-0'
                      >
                        <option value='any' disabled>
                          Years Of Experience ?
                        </option>
                        <option value={1}>One</option>
                        <option value={2}>Two</option>
                        <option value={3}>Three</option>
                        <option value={4}>Four</option>
                        <option value={5}>Five</option>
                        <option value={6}>Six</option>
                        <option value={7}>Seven</option>
                        <option value={8}>Eight</option>
                        <option value={9}>Nine</option>
                        <option value={10}>Ten</option>
                        <option value={11}>Eleven</option>
                        <option value={12}>Twelve</option>
                      </select>
                    </div>

                    {shouldShowSelectError &&
                      selectError?.yearsOfExperience && (
                        <p role='alert' className='text-red-500 font-bold'>
                          {/* Name is required */}
                          {selectError?.yearsOfExperience}
                        </p>
                      )}
                  </div>
                  <div className='my-2 mb-5'>
                    {/* <div className="">
                      <label
                        className={`${style.titleSub}`}
                        htmlFor="currentJobTitle"
                      >
                        Select your job title
                      </label>
                      <select
                        {...register("currentJobTitle", {
                          required: {
                            value: true,
                            message: "select your current Job Title",
                          },
                        })}
                        name="currentJobTitle"
                        id="currentJobTitle"
                        defaultValue="any"
                        className="block md:w-full grow h-8 rounded-md ml-2 py-0"
                      >
                        <option value="any" disabled>
                          Occupation ?
                        </option>
                        <option value="full stack developer">
                          Full stack developer
                        </option>
                        <option value="Sr. full stack developer">
                          Sr. full stack developer
                        </option>
                        <option value="AI Engineers">AI Engineers</option>
                      </select>
                    </div> */}
                    <div className='my-2 mb-5'>
                      <div className=''>
                        <label
                          className={`${style.titleSub}`}
                          htmlFor='currentJobTitle'
                        >
                          Type your job title
                        </label>
                        <input
                          {...register("currentJobTitle", {
                            required: {
                              value: true,
                              message: "mention your current job title",
                            },
                          })}
                          name='currentJobTitle'
                          id='currentJobTitle'
                          // defaultValue="any"
                          className='block md:w-full border-black border-2 grow h-8 rounded-md ml-2 py-0'
                        ></input>
                      </div>
                      {errors?.currentJobTitle && (
                        <p role='alert' className='text-red-500 font-bold'>
                          {/* Name is required */}
                          {errors?.currentJobTitle.message}
                        </p>
                      )}
                    </div>

                    {shouldShowSelectError && selectError?.currentJobTitle && (
                      <p role='alert' className='text-red-500 font-bold'>
                        {/* Name is required */}
                        {selectError?.currentJobTitle}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className='px-2'>
        <div className='border-slate-300 rounded-lg border-2 '></div>
      </div>
      <div>
        {/* footer */}
        {/* here is thee submit button  */}
        <button
          style={{ background: "#53A871" }}
          className='button  hover:bg-green-400 rounded-md font-bold text-white text-xl px-4 py-2 w-full'
          type='submit'
          onClick={() => setShouldShowSelectError(true)}
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default PreQuestionire;
