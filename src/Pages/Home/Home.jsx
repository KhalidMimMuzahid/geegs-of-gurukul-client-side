import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import LectureScedule from "./LectureScedule/LectureScedule";
import DoughnutChart from "../../Components/DoughnutChart/DoughnutChart";
import QuizChart from "../../Components/QuizChart/QuizChart";
import AttendanceChart from "../../Components/AttendanceChart/AttendanceChart";
import styles from "./preassessment.module.css";
const Home = () => {
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
  const [collageNames, setCollageName] = useState([]);
  const [searchKeyResults, setSearchKeyResults] = useState([]);
  const [queryKey, setQueryKey] = useState("");

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
    });
    return () => subscription.unsubscribe();
  });
  const handleUserDetails = (data) => {};
  useEffect(() => {
    fetch("collageNames.json")
      .then((res) => res.json())
      .then((data) => {
        setCollageName(data);
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
  const handleMedicineClick = (coLLageName) => {
    let collageInputElement = document.getElementById("coLLageName");
    collageInputElement.value = coLLageName;

    setSearchKeyResults([]);
  };
  return (
    <div className="">
      {/* show te user greetings  */}
      <div>
        <h1 className="font-semibold my-8 text-2xl text-center">
          Hi Khalid,Welcome to Geeks of Gurukul
        </h1>
      </div>
      <form
        action=""
        className="w-[500px] mx-auto"
        onSubmit={handleSubmit(handleUserDetails)}
      >
        {/* gate date of birth from user  */}
        {/* <div className="flex justify-between items-center my-2">
          <label htmlFor="date-of-birth" className="font-semibold">
            Date of Birth:
          </label>
          <input
            // {...register("date", {
            //   required: { value: true, message: "pick your birth date" },
            // })}
            type="date"
            name=""
            id="date-of-birth"
            className="grow ml-2 h-8 rounded-md"
          />
        </div> */}
        {/* indepth to go the next question  */}
        <div>
          {/* get data for they are currently studying or not  */}
          <div className="my-2">
            <label className="font-semibold">
              Are you Currently Studying ?
            </label>
            <div className="flex justify-between">
              <div className="flex items-center">
                <input
                  {...register("isStudying", {
                    required: { value: true, message: "select one of them" },
                  })}
                  type="radio"
                  id="isStudying"
                  name="isStudying"
                  value="true"
                />
                <label htmlFor="isStudying" className="ml-2">
                  Yes, I am studying
                </label>
              </div>
              <div className="flex items-center">
                <input
                  {...register("isStudying", {
                    required: { value: true, message: "select one of them" },
                  })}
                  type="radio"
                  id="isNotStudying"
                  name="isStudying"
                  value="false"
                />
                <label htmlFor="isNotStudying" className="ml-2">
                  No, I am not studying
                </label>
              </div>
            </div>
            {errors?.isStudying && (
              <p role="alert" className="text-red-500 font-bold">
                {/* Name is required */}
                {errors?.isStudying?.message}
              </p>
            )}
          </div>
          {/* input field for worrkAs  */}
          <div>
            {/* if currently studying then get data for they are school student or cllage student   */}

            <div
              className={` my-2  ${
                currentlyStuying === "true" ? "block" : "hidden"
              }`}
            >
              <label className="font-semibold">Are you currently ?</label>
              <div className="flex justify-between">
                <div className="flex items-center ">
                  <input
                    {...register("workAs", {
                      required: { value: true, message: "select one of them" },
                    })}
                    type="radio"
                    id="schoolStudent"
                    name="workAs"
                    value="schoolStudent"
                  />
                  <label htmlFor="schoolStudent" className="ml-2">
                    in School
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    {...register("workAs", {
                      required: { value: true, message: "select one of them" },
                    })}
                    type="radio"
                    id="collageStudent"
                    name="workAs"
                    value="collageStudent"
                  />
                  <label htmlFor="collageStudent" className="ml-2">
                    in Collage
                  </label>
                </div>
              </div>
              {errors?.workAs && (
                <p role="alert" className="text-red-500 font-bold">
                  {/* Name is required */}
                  {errors?.workAs?.message}
                </p>
              )}
            </div>

            {/* if currently not studying then get data for check are the looking foe job or alreaddy are the working   */}
            <div
              className={` my-2 ${
                currentlyStuying === "false" ? "block" : "hidden"
              }`}
            >
              <label className="font-semibold">Are you currently?</label>

              <div className="flex justify-between">
                <div className="flex items-center ">
                  <input
                    {...register("workAs", {
                      required: { value: true, message: "select one of them" },
                    })}
                    type="radio"
                    id="jobSeeker"
                    name="workAs"
                    value="jobSeeker"
                  />
                  <label htmlFor="jobSeeker" className="ml-2">
                    looking for a job
                  </label>
                </div>
                <div className="flex items-center ">
                  <input
                    {...register("workAs", {
                      required: { value: true, message: "select one of them" },
                    })}
                    type="radio"
                    id="jobHolder"
                    name="workAs"
                    value="jobHolder"
                  />
                  <label htmlFor="jobHolder" className="ml-2">
                    currently working
                  </label>
                </div>
              </div>
              {errors?.workAs && (
                <p role="alert" className="text-red-500 font-bold">
                  {/* Name is required */}
                  {errors?.workAs?.message}
                </p>
              )}
            </div>
          </div>

          {/* if currently studying and school sudent then go for school name and grade */}
          <div
            className={`${
              workAs === "schoolStudent" && currentlyStuying === "true"
                ? "block"
                : "hidden"
            }`}
          >
            <div className="my-2">
              <label className="block font-semibold" htmlFor="schoolName">
                School Name
              </label>
              <input
                className="block h-8 rounded-md w-full"
                {...register("schoolName", {
                  required: { value: true, message: "put your school name" },
                  pattern: {
                    value: /^[A-Za-z -]+$/,
                    message: "retype your school name",
                  },
                })}
                name="schoolName"
                type="text"
                id="schoolName"
              />

              {errors?.schoolName && (
                <p role="alert" className="text-red-500 font-bold">
                  {/* Name is required */}
                  {errors?.schoolName?.message}
                </p>
              )}
            </div>
            <div className="block my-2 ">
              <div className="flex justify-between items-center">
                <label className="block font-semibold" htmlFor="grade">
                  Select your grade
                </label>
                <select
                  {...register("grade", {
                    required: { value: true, message: "select your grade" },
                  })}
                  name="grade"
                  id="grade"
                  defaultValue="any"
                  className="block grow h-8 py-0 rounded-md ml-2"
                >
                  <option value="any" disabled>
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
                <p role="alert" className="text-red-500 font-bold">
                  {selectError?.grade}
                </p>
              )}
            </div>
          </div>
          {/* if currently studying and collage student or  (currently not studying and looking for job) or (optional => (currently not studying and already in working)) then go for collage Name , latest degree and graduation year */}

          <div
            className={`${
              (workAs === "collageStudent" && currentlyStuying === "true") ||
              (workAs === "jobSeeker" && currentlyStuying === "false")
                ? "block"
                : "hidden"
            }`}
          >
            <div>
              <div>
                <label className="block font-semibold" htmlFor="coLLageName">
                  collage Name
                </label>

                <input
                  {...register("coLLageName", {
                    required: { value: true, message: "put your coLLage name" },
                    pattern: {
                      value: /^[A-Za-z -]+$/,
                      message: "retype your school name",
                    },
                  })}
                  onChange={(e) => setSearchKey(e.target.value)}
                  onBlur={handleOnBlur}
                  onFocus={(e) => setSearchKey(e.target.value)}
                  name="coLLageName"
                  type="search"
                  id="coLLageName"
                  className="block w-full  h-8 rounded-md px-2     focus:ring-green-400 focus:border-green-400 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Search"
                  required
                />

                {errors?.coLLageName && (
                  <p role="alert" className="text-red-500 font-bold">
                    {/* Name is required */}
                    {errors?.coLLageName?.message}
                  </p>
                )}
              </div>

              {searchKeyResults?.length !== 0 && (
                <div className=" absolute w-full pr-2 md:max-w-md lg:max-w-lg mx-auto   h-full max-h-80 overflow-y-auto  z-20  flex flex-col items-center">
                  <div className="bg-green-200 border-green-400 w-full border-4  border-t-0 ">
                    {/* px should be zero after 450 width  */}
                    {/* ${styles.textsearchresponsive} */}
                    <ul className={`  w-full    `}>
                      {searchKeyResults.map((eachResult, i) => (
                        <li
                          onClick={() => handleMedicineClick(eachResult)}
                          // onClick={() => console.log("xxxxxxxxxx")}
                          key={i}
                          className="block w-full bg-primary text-black font-bold px-4 py-1 hover:bg-green-300 hover:cursor-pointer"
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
            <div className="my-2">
              <div className="flex justify-between items-center">
                <label className="block font-semibold" htmlFor="latestDegree">
                  Select your latest degree
                </label>
                <select
                  {...register("latestDegree", {
                    required: {
                      value: true,
                      message: "select your latest degree",
                    },
                  })}
                  name="latestDegree"
                  id="latestDegree"
                  defaultValue="any"
                  className="block grow h-8 rounded-md ml-2 py-0"
                >
                  <option value="any" disabled>
                    latest Degree ?
                  </option>
                  <option value="BTech">BTech</option>
                  <option value="BSC">BSC</option>
                  <option value="BBA">BBA</option>
                  <option value="MBA">MBA</option>
                </select>
              </div>
              {shouldShowSelectError && selectError?.latestDegree && (
                <p role="alert" className="text-red-500 font-bold">
                  {/* Name is required */}
                  {selectError?.latestDegree}
                </p>
              )}
            </div>
            <div className="my-2">
              <div className="flex justify-between items-center">
                <label className="block font-semibold" htmlFor="graduationYear">
                  Select your graduation year
                </label>
                <select
                  {...register("graduationYear", {
                    required: {
                      value: true,
                      message: "select your graduation year",
                    },
                  })}
                  name="graduationYear"
                  id="graduationYear"
                  defaultValue="any"
                  className="block grow h-8 rounded-md ml-2 py-0"
                >
                  <option value="any" disabled>
                    graduation Year ?
                  </option>
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
                </select>
              </div>

              {shouldShowSelectError === true &&
                selectError?.graduationYear !== "" && (
                  <p role="alert" className="text-red-500 font-bold">
                    {/* Name is required */}
                    {selectError?.graduationYear}
                  </p>
                )}
            </div>
          </div>

          {/* if currently not studying and already in working then n go for ( optional ==> (collage Name , latest degree aand graduation year)) company name, works of experience, occption  */}
          <div
            className={`${
              workAs === "jobHolder" && currentlyStuying === "false"
                ? "block"
                : "hidden"
            }`}
          >
            <div className="my-2">
              <label className="block font-semibold" htmlFor="companyName">
                company Name
              </label>
              <input
                {...register("companyName", {
                  required: { value: true, message: "put your company name" },
                  pattern: {
                    value: /^[A-Za-z -]+$/,
                    message: "retype your company name",
                  },
                })}
                type="text"
                name="companyName"
                id="companyName"
                className="block w-full h-8 rounded-md "
              />
              {errors?.companyName && (
                <p role="alert" className="text-red-500 font-bold">
                  {/* Name is required */}
                  {errors?.companyName?.message}
                </p>
              )}
            </div>
            <div className="my-2">
              <div className="flex justify-center items-center">
                <label
                  className="block font-semibold"
                  htmlFor="yearsOfExperience"
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
                  name="yearsOfExperience"
                  id="yearsOfExperience"
                  defaultValue="any"
                  className="block h-8 grow rounded-md ml-2 py-0"
                >
                  <option value="any" disabled>
                    years Of Experience ?
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

              {shouldShowSelectError && selectError?.yearsOfExperience && (
                <p role="alert" className="text-red-500 font-bold">
                  {/* Name is required */}
                  {selectError?.yearsOfExperience}
                </p>
              )}
            </div>
            <div className="my-2">
              <div className="flex justify-between items-center">
                <label
                  className="block font-semibold"
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
                  className="block grow h-8 rounded-md ml-2 py-0"
                >
                  <option value="any" disabled>
                    Occupation ?
                  </option>
                  <option value="full stack developer">
                    full stack developer
                  </option>
                  <option value="Sr. full stack developer">
                    Sr. full stack developer
                  </option>
                  <option value="AI Engineers">AI Engineers</option>
                </select>
              </div>

              {shouldShowSelectError && selectError?.currentJobTitle && (
                <p role="alert" className="text-red-500 font-bold">
                  {/* Name is required */}
                  {selectError?.currentJobTitle}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* here is thee submit button  */}
        <button
          className="button bg-green-400 hover:bg-green-500 font-bold text-black text-xl px-4 py-2 w-full"
          type="submit"
          onClick={() => setShouldShowSelectError(true)}
        >
          Submit
        </button>
      </form>
      <div>
        <LectureScedule />
        <LectureScedule />
      </div>

      <div className="w-4/5 mx-auto grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-5">

        <DoughnutChart />
        <QuizChart />
        <AttendanceChart />
      </div>
    </div>
  );
};

export default Home;
