import React, { useContext, useEffect, useState } from "react";
import { set, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { AuthContext } from "../../../../../contexts/UserProvider/UserProvider";
import { City, Country, State } from "country-state-city";

const ProfessionEditingMode = ({ setIsEditing }) => {
  const { user, setShouldRefreshUser } = useContext(AuthContext);
  const [workAs, setWorkAs] = useState(user?.profession?.workAs);
  const [institute, setInstitute] = useState(user?.profession?.institutionName);
  const [grade, setGrade] = useState(user?.profession?.grade);
  const [graduationYear, setGraduationYear] = useState(
    user?.profession?.graduationYear
  );
  const [experienceYear, setExperienceYear] = useState(
    user?.profession?.experienceYear
  );
  // get country
  let countryData = Country.getAllCountries();
  const [country, setCountry] = useState(
    countryData.find(
      (country) => country.name === user?.profession?.address?.country
    )
  );
  // get state
  let stateData = State.getStatesOfCountry(country?.isoCode);
  const [state, setState] = useState(
    stateData.find((ech) => ech.name === user?.profession?.address?.state)
  );

  // get city
  const cityData = City.getCitiesOfState(country?.isoCode, state?.isoCode);
  const [city, setCity] = useState(user?.profession?.city);
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    // console.log("countryData", countryData);
    const mycountry = countryData.find(
      (country) => country.name === user?.profession?.address?.country
    );
    console.log("mycountry", mycountry);
  }, []);
  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      if (name === "workAs") {
        setGrade(null);
        setInstitute(null);
        setCity(null);
        setExperienceYear(null);
        setGraduationYear(null);
        setWorkAs(value?.workAs);
      }
      if (name === "grade") {
        // console.log(value?.workAs);
        setGrade(value?.grade);
      }

      if (name === "institutionName") {
        setInstitute(value?.institutionName);
      }

      if (name === "graduationYear") {
        setGraduationYear(value?.graduationYear);
      }
      if (name === "experienceYear") {
        setExperienceYear(value?.experienceYear);
      }

      // country data set
      if (name === "country") {
        countryData?.forEach((each) => {
          if (each?.name === value?.country) {
            setCountry({
              country: each?.name,
              isoCode: each?.isoCode,
            });
            return;
          }
        });
      }

      // state data set
      if (name === "state") {
        stateData?.forEach((each) => {
          if (each?.name === value?.state) {
            setState({
              state: each?.name,
              isoCode: each?.isoCode,
            });
            return;
          }
        });
      }
      if (name === "city") {
        setCity(value?.city);
      }
      if (name === "currentlyStudy") {
        console.log(value?.currentlyStudy);
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
          schoolName: data?.institutionName,
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
          coLLageName: data?.institutionName,
          graduationMonth: data?.graduationMonth,
          graduationYear: data?.graduationYear,
          isStudying: data?.isStudying,
          address: {
            country: data?.country,
            state: data?.state,
            city: data?.city,
          },
        },
      };
      updateFetch(updateData);
    } else if (data?.workAs === "jobSeeker") {
      const updateData = {
        profession: {
          workAs: data?.workAs,
          latestDegree: data?.latestDegree,
          coLLageName: data?.institutionName,
          graduationMonth: data?.graduationMonth,
          graduationYear: data?.graduationYear,
          isStudying: data?.isStudying,
          address: {
            country: data?.country,
            state: data?.state,
            city: data?.city,
          },
        },
      };
      updateFetch(updateData);
    } else if (data?.workAs === "employee") {
      const updateData = {
        profession: {
          workAs: data?.workAs,
          companyName: data?.currentCompany,
          currentJobTitle: data?.jobTitle,
          yearsOfExperience: data?.experienceYear,
          address: {
            country: data?.country,
            state: data?.state,
            city: data?.city,
          },
        },
      };
      updateFetch(updateData);
    }
    console.log(data);
    reset();
  };

  const updateFetch = (updateData) => {
    // return;
    fetch(`http://localhost:5000/api/v1/users/edit-user/${user?.email}`, {
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
          setGraduationYear(null);
          setExperienceYear(null);
          setCity(null);
          reset();
          setShouldRefreshUser((prev) => !prev);
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
    <form onSubmit={handleSubmit(onSubmit)} className="mt-5">
      <div className="mb-4">
        <label>Profession description</label>
        <select
          id="workAs"
          defaultValue={user?.profession?.workAs}
          {...register("workAs")}
          className="p-2 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
        >
          <option disabled select>
            Select your Profession
          </option>
          <option value="schoolStudent">School Student</option>
          <option value="collageStudent">Collage Student</option>
          <option value="jobSeeker">Job Seeker</option>
          <option value="employee">Employee</option>
        </select>
      </div>
      {workAs === "schoolStudent" && (
        <div className="">
          <div className="mb-4">
            <label htmlFor="institutionName">Name of institution</label>
            <input
              type="text"
              defaultValue={user?.profession?.schoolName}
              name="institutionName"
              {...register("institutionName")}
              placeholder="Enter your Institute Name"
              className="p-2 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
            />
          </div>
          {institute && (
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
          )}
        </div>
      )}

      {/* collage students */}
      {workAs === "collageStudent" && (
        <div className="mt-5">
          <div className="mb-4">
            <label htmlFor="institutionName">Collage Name</label>
            <input
              type="text"
              defaultValue={user?.profession?.coLLageName}
              name="institutionName"
              {...register("institutionName")}
              placeholder="Enter your Institute Name"
              className="p-2 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="latestDegree">Degree</label>
            <input
              type="text"
              defaultValue={user?.profession?.latestDegree}
              id="latestDegree"
              name="latestDegree"
              {...register("latestDegree")}
              placeholder="Enter your Institute Name"
              className="p-2 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
            />
          </div>
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

          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              defaultValue={user?.profession?.isStudying}
              {...register("isStudying")}
              id="checkbox"
              className="rounded-full appearance-none border border-green-300 bg-white h-4 w-4 flex-shrink-0 checked:bg-green-500 checked:border-transparent focus:outline-none cursor-pointer hover:text-green-400"
            />
            <label for="checkbox" className="ml-2 text-gray-700">
              I currently study here
            </label>
          </div>
        </div>
      )}

      {/* Job Seeker*/}
      {workAs === "jobSeeker" && (
        <div className="mt-5">
          <div className="mb-4">
            <label htmlFor="institutionName">Collage Name</label>
            <input
              type="text"
              defaultValue={user?.profession?.coLLageName}
              name="institutionName"
              {...register("institutionName")}
              placeholder="Enter your Institute Name"
              className="p-2 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="latestDegree">Degree</label>
            <input
              type="text"
              defaultValue={user?.profession?.latestDegree}
              id="latestDegree"
              name="latestDegree"
              {...register("latestDegree")}
              placeholder="Enter your Institute Name"
              className="p-2 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
            />
          </div>
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

          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              defaultValue={user?.profession?.isStudying}
              {...register("isStudying")}
              id="checkbox"
              className="rounded-full appearance-none border border-green-300 bg-white h-4 w-4 flex-shrink-0 checked:bg-green-500 checked:border-transparent focus:outline-none cursor-pointer hover:text-green-400"
            />
            <label for="checkbox" className="ml-2 text-gray-700">
              I currently study here
            </label>
          </div>
        </div>
      )}

      {/* employee */}
      {workAs === "employee" && (
        <div className="mt-5">
          <div className="nb-4">
            <label htmlFor="currentCompany">Current Company Name</label>
            <input
              type="text"
              name="currentCompany"
              defaultValue={user?.profession?.companyName}
              {...register("currentCompany")}
              placeholder="Enter your Company Name where you working on"
              className="p-2 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="jobTitle">Current Job Title</label>
            <input
              type="text"
              name="jobTitle"
              defaultValue={user?.profession?.currentJobTitle}
              {...register("jobTitle")}
              placeholder="Enter your Job Title"
              className="p-2 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="jobTitle">Experience</label>
            <input
              type="experienceYear"
              name="experienceYear"
              defaultValue={user?.profession?.yearsOfExperience}
              {...register("experienceYear")}
              placeholder="Enter your experience year"
              className="p-2 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
            />
          </div>
        </div>
      )}
      {(grade || graduationYear || experienceYear) && (
        <div className="">
          <div className="w-full mb-4">
            <label htmlFor="country">Country</label>
            <select
              id="country"
              {...register("country")}
              defaultValue={user?.profession?.address?.country}
              className="p-2 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
            >
              <option disabled selected>
                Select Country
              </option>
              {countryData?.length > 0 &&
                countryData?.map((country, index) => (
                  <option key={index} value={country?.name}>
                    {country?.name}
                  </option>
                ))}
            </select>
          </div>
          <div className="w-full mb-4">
            <label htmlFor="state">State</label>
            <select
              id="state"
              defaultValue={user?.profession?.address?.state}
              {...register("state")}
              className="p-2 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
            >
              <option disabled selected>
                Select State
              </option>
              {stateData.length > 0 &&
                stateData?.map((state, index) => (
                  <option key={index} value={state.name}>
                    {state?.name}
                  </option>
                ))}
            </select>
          </div>
          <div className="w-full mb-4">
            <label htmlFor="city">City</label>
            <select
              id="city"
              defaultValue={user?.profession?.address?.city}
              {...register("city")}
              className="p-2 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
            >
              <option disabled selected>
                Select City
              </option>
              {cityData?.length > 0 &&
                cityData?.map((city, index) => (
                  <option key={index} value={city?.name}>
                    {city?.name}
                  </option>
                ))}
            </select>
          </div>
        </div>
      )}
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
