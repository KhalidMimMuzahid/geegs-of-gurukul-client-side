import React, { useContext, useEffect, useState } from "react";
import { set, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { AuthContext } from "../../../../../contexts/UserProvider/UserProvider";

const ProfessionEditingMode = ({ setIsEditing }) => {
  const { user } = useContext(AuthContext);
  const [profation, setProfation] = useState("");
  const [workAs, setWorkAs] = useState("");
  const [grade, setGrade] = useState(null);
  const [institute, setInstitute] = useState(null);
  const [degree, setDegree] = useState(null);
  const [currentCompany, setCurrentCompany] = useState(null);
  const [jobTitle, setJobTitle] = useState(null);
  const [city, setCity] = useState(null);
  const [data, setData] = useState([]);
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState([]);
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      if (name === "workAs") {
        setGrade(null);
        setInstitute(null);
        setDegree(null);
        setCurrentCompany(null);
        setJobTitle(null);
        setCity(null);
        setWorkAs(value?.workAs);
      }
      if (name === "grade") {
        // console.log(value?.workAs);
        setGrade(value?.grade);
      }

      if (name === "institutionName") {
        setInstitute(value?.institutionName);
      }

      if (name === "latestDegree") {
        setDegree(value?.latestDegree);
      }

      if (name === "currentCompany") {
        setCurrentCompany(value?.currentCompany);
      }
      if (name === "jobTitle") {
        setJobTitle(value?.jobTitle);
      }
      if (name === "city") {
        setCity(value?.city);
      }
    });
    return () => subscription.unsubscribe();
  });

  const onSubmit = (data) => {
    setLoading(true);
    if (data?.workAs === "schoolStudent") {
      const updateData = {
        profession: {
          workAs: data?.workAs,
          institutionName: data?.institutionName,
          grade: data?.grade,
          country: data?.country,
          state: data?.state,
          city: data?.city,
        },
      };
      updateFetch(updateData);
    } else if (data?.workAs === "collageStudent") {
      const updateData = {
        profession: {
          workAs: data?.workAs,
          latestDegree: data?.latestDegree,
          institutionName: data?.institutionName,
          graduationMonth: data?.graduationMonth,
          graduationYear: data?.graduationYear,
          currentlyStudy: data?.currentlyStudy,
          country: data?.country,
          state: data?.state,
          city: data?.city,
        },
      };
      updateFetch(updateData);
    } else if (data?.workAs === "employee") {
      const updateData = {
        profession: {
          workAs: data?.workAs,
          currentCompany: data?.currentCompany,
          jobTitle: data?.jobTitle,
          experienceYear: data?.experienceYear,
          country: data?.country,
          state: data?.state,
          city: data?.city,
        },
      };
      updateFetch(updateData);
    }
    console.log(data);
    reset();
  };

  const updateFetch = (updateData) => {
    // return;
    fetch(`http://localhost:5000/edit-user/${user?.email}`, {
      method: "PUT",
      body: JSON.stringify(updateData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data?.success) {
          toast.success(data?.message);
          console.log(data);
          setLoading(false);

          setGrade(null);
          setInstitute(null);
          setDegree(null);
          setCurrentCompany(null);
          setJobTitle(null);
          setCity(null);
          reset();
          setIsEditing(false);
        } else {
          toast.error(data?.message);
          setLoading(false);
        }
      })
      .catch((error) => {
        console.error(error);

        setLoading(false);
      });
  };

  // //country get
  // useEffect(() => {
  //   fetch("https://restcountries.com/v3.1/all")
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log("data", data);
  //       setData(data);
  //     })
  //     .catch((err) => console.error(err));
  // }, []);
  // const countryData = [...new set(data?.map((item) => item.country))];

  // //state get
  // useEffect(() => {
  //   fetch("https://restcountries.com/v3.1/allcountries/${countryId}/states")
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log("data", data);
  //       // setCountry(data);
  //     })
  //     .catch((err) => console.error(err));
  // }, []);

  const months = [
    { value: "January" },
    { value: "February" },
    { value: "March" },
    { value: "April" },
    { value: "May" },
    { value: "June" },
    { value: "July" },
    { value: "August" },
    { value: "September" },
    { value: "October" },
    { value: "November" },
    { value: "December" },
  ];

  const years = [];

  for (let i = 2010; i <= 2030; i++) {
    years.push({ value: i.toString() });
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-1 md:grid-cols-1 gap-5 mt-5">
        <div className="">
          <label>Profession description</label>
          <select
            id="workAs"
            defaultValue={user?.profession?.workAS}
            {...register("workAs")}
            className="p-2 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
          >
            <option disabled select>
              Select your Profession
            </option>
            <option value="schoolStudent">School Student</option>
            <option value="collageStudent">Collage Student</option>
            <option value="employee">Employee</option>
          </select>
        </div>
        {workAs === "schoolStudent" ||
        workAs === "collageStudent" ||
        user?.profession?.workAS ? (
          <div className="">
            <label htmlFor="institutionName">Name of institution</label>
            <input
              type="text"
              defaultValue={user?.profession?.institutionName}
              name="institutionName"
              {...register("institutionName")}
              placeholder="Enter your Institute Name"
              className="p-2 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
            />
          </div>
        ) : (
          ""
        )}
        {(workAs === "schoolStudent" && institute) ||
        user?.profession?.workAS === "schoolStudent" ? (
          <div className="">
            <label>Grade</label>
            <select
              id="grade"
              defaultValue={user?.profession?.grade}
              {...register("grade")}
              className="p-2 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
            >
              <option disabled select>
                Select your Grade
              </option>
              <option value="1">Grade 1</option>
              <option value="2">Grade 2</option>
              <option value="3">Grade 3</option>
              <option value="4">Grade 4</option>
              <option value="5">Grade 5</option>
              <option value="6">Grade 6</option>
              <option value="7">Grade 7</option>
              <option value="8">Grade 8</option>
              <option value="9">Grade 9</option>
              <option value="10">Grade 10</option>
              <option value="11">Grade 11</option>
              <option value="12">Grade 12</option>
            </select>
          </div>
        ) : (
          ""
        )}
        {workAs === "collageStudent" && institute && (
          <>
            <div className="">
              <label htmlFor="latestDegree">Degree</label>
              <select
                defaultValue={user?.profession?.latestDegree}
                id="latestDegree"
                {...register("latestDegree")}
                className="p-2 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
              >
                <option disabled selected>
                  Select your latest degree
                </option>
                <option value="BTech">BTech</option>
                <option value="firstYear">First Year</option>
                <option value="secondYear">Second Year</option>
                <option value="thirdYear">Third Year</option>
                <option value="lastYear">Last Year</option>
              </select>
            </div>
          </>
        )}

        {workAs === "collageStudent" && degree && institute && (
          <>
            <h2 className="text-lg font-medium my-2">
              Graduation date or expected graduation date
            </h2>
            <div className="flex gap-4">
              <div className="w-full">
                <label htmlFor="graduationMonth">Month</label>
                <select
                  defaultValue={user?.profession?.graduationMonth}
                  id="graduationMonth"
                  {...register("graduationMonth")}
                  className="p-2 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
                >
                  <option disabled selected>
                    Select Month
                  </option>
                  {months?.map((month, index) => (
                    <option key={index} value={month?.value}>
                      {month?.value}
                    </option>
                  ))}
                </select>
              </div>
              <div className="w-full">
                <label htmlFor="graduationYear">Year</label>
                <select
                  id="graduationYear"
                  defaultValue={user?.profession?.graduationYear}
                  {...register("graduationYear")}
                  className="p-2 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
                >
                  <option disabled selected>
                    Select Year
                  </option>
                  {years?.map((year, index) => (
                    <option key={index} value={year?.value}>
                      {year?.value}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div class="flex items-center">
              <input
                type="checkbox"
                defaultValue={user?.profession?.currentlyStudy}
                {...register("currentlyStudy")}
                id="checkbox"
                class="rounded-full appearance-none border border-green-300 bg-white h-4 w-4 flex-shrink-0 checked:bg-green-500 checked:border-transparent focus:outline-none cursor-pointer hover:text-green-400"
              />
              <label for="checkbox" class="ml-2 text-gray-700">
                I currently study here
              </label>
            </div>
          </>
        )}

        {workAs === "employee" && (
          <>
            <div className="">
              <label htmlFor="currentCompany">Current Company Name</label>
              <input
                type="text"
                name="currentCompany"
                defaultValue={user?.profession?.currentCompany}
                {...register("currentCompany")}
                placeholder="Enter your Company Name where you working on"
                className="p-2 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
              />
            </div>
            {currentCompany && (
              <div className="">
                <label htmlFor="jobTitle">Current Job Title</label>
                <input
                  type="text"
                  name="jobTitle"
                  defaultValue={user?.profession?.jobTitle}
                  {...register("jobTitle")}
                  placeholder="Enter your Job Title"
                  className="p-2 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
                />
              </div>
            )}
            {currentCompany && jobTitle && (
              <div className="">
                <label htmlFor="jobTitle">Experience</label>
                <input
                  type="experienceYear"
                  name="experienceYear"
                  defaultValue={user?.profession?.experienceYear}
                  {...register("experienceYear")}
                  placeholder="Enter your experience year"
                  className="p-2 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
                />
              </div>
            )}
          </>
        )}

        {jobTitle || degree || grade ? (
          <>
            <div className="w-full">
              <label htmlFor="country">Country</label>
              <select
                id="country"
                {...register("country")}
                defaultValue={user?.profession?.country}
                className="p-2 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
              >
                <option disabled selected>
                  Select Country
                </option>
                {/* {data?.map((country, index) => (
              <option key={index} value={country?.country}>
                {country?.country}
              </option>
            ))} */}
                <option value="Bangladesh">Bangladesh</option>
                <option value="India">India</option>
                <option value="Pakisthan">Pakisthan</option>
              </select>
            </div>

            <div className="w-full">
              <label htmlFor="state">State</label>
              <select
                id="state"
                defaultValue={user?.profession?.state}
                {...register("state")}
                className="p-2 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
              >
                <option disabled selected>
                  Select State
                </option>
                {/* {data?.map((country, index) => (
              <option key={index} value={country?.country}>
                {country?.country}
              </option>
            ))} */}

                <option value="Cumilla">Cumilla</option>
                <option value="Dhaka">Dhaka</option>
                <option value="Khulna">Khulna</option>
              </select>
            </div>
            <div className="w-full">
              <label htmlFor="city">City</label>
              <select
                id="city"
                defaultValue={user?.profession?.city}
                {...register("city")}
                className="p-2 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
              >
                <option disabled selected>
                  Select City
                </option>
                {/* {data?.map((country, index) => (
              <option key={index} value={country?.country}>
                {country?.country}
              </option>
            ))} */}
                <option value="Cumilla">Cumilla</option>
                <option value="Dhaka">Dhaka</option>
                <option value="Nowakhali">Nowakhali</option>
              </select>
            </div>
          </>
        ) : (
          ""
        )}
      </div>

      {city && (
        <div className="w-full flex justify-center my-10">
          <button
            type="submit"
            disabled={setLoading}
            className="font-poppins font-medium text-white px-4 py-2 bg-green-400 hover:bg-green-500 rounded-md"
          >
            {loading ? "Updating..." : "Update"}
          </button>
        </div>
      )}
    </form>
  );
};

export default ProfessionEditingMode;
