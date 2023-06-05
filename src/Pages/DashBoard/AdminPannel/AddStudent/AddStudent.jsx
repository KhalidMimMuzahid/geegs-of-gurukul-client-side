import React, { useState, useEffect, useContext } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { AuthContext } from "../../../../contexts/UserProvider/UserProvider";
import moment from "moment";

const AddStudent = () => {
  const [programs, setPrograms] = useState([]);
  const [courses, setCourses] = useState([]);
  const [batch, setBatch] = useState("");
  const [searching, setSearching] = useState(false);
  const [addAllowed, setAddAllowed] = useState(false);
  const [userData, setUserData] = useState({});

  const { user } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    isLoading,
    formState: { errors },
  } = useForm();
  const selectedProgram = watch("program");
  const selectedCourse = watch("course");
  const selectedEmail = watch("email");

  // find program
  useEffect(() => {
    fetch("http://3.84.19.169:5000/api/v1/programs/all-program")
      .then((response) => response.json())
      .then((data) => {
        console.log("program data", data?.data);
        setPrograms(data?.data);
      });
  }, []);

  // find course
  useEffect(() => {
    if (selectedProgram) {
      fetch(`http://3.84.19.169:5000/api/v1/courses/search-course`, {
        headers: {
          "content-type": "application/json",
          data: JSON.stringify({ program_id: selectedProgram }),
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("course data", data?.data);
          setCourses(data?.data);
          setValue("course", "");
          setValue("email", "");
          setBatch("");
          setAddAllowed(false);
        });
    }
  }, [selectedProgram]);

  // check if batch exists
  useEffect(() => {
    if (selectedCourse) {
      const tempCourse = courses.find(
        (course) => course._id === selectedCourse
      );
      // console.log("tempCourse: ", tempCourse);
      if (!tempCourse?.currentBatch) {
        toast.error("No batch associated with this course");
        setBatch("");
        setValue("email", "");
        setAddAllowed(false);
      } else {
        setBatch(tempCourse.currentBatch);
      }
    }
  }, [selectedCourse]);

  // search student
  const searchStudent = () => {
    setSearching(true);
    fetch(`http://3.84.19.169:5000/api/v1/users/search-user`, {
      headers: {
        "content-type": "application/json",
        data: JSON.stringify({ email: selectedEmail }),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        if (result?.success) {
          const data = result?.data;
          console.log("email data: ", data);
          setUserData(data);
          setAddAllowed(true);
          toast.success("Student email successfully found");
          setSearching(false);
        } else {
          toast.error("Email not found");
          setAddAllowed(false);
          setSearching(false);
        }
      })
      .catch((err) => {
        toast.error(err.message);
        setAddAllowed(false);
        setSearching(false);
      });
  };

  // on submit
  const onSubmit = (data) => {
    const justNow = moment().format();
    // console.log("data: ", data);
    const courseObject = courses?.find(
      (course) => course?._id === selectedCourse
    );
    const insertuserData = {
      program: {
        program_id: selectedProgram,
        programName: courseObject?.program?.program_id,
      },
      course: {
        course_id: selectedCourse,
        courseName: courseObject?.courseName,
      },
      batch: {
        batch_id: "",
        batchName: batch,
      },
      isPaid: true,
      regularPrice: 60000,
      discount: 100,
      appliedPrice: 0,
      couponCode: "",
      paymentId: "",
      purchaseInfo: {
        purchaseByEmail: selectedEmail,
        purchaseByName: userData[0]?.name,
        enrolledAt: justNow,
        paidAt: justNow,
      },
      addedBy: {
        adderName: user?.name,
        addderEmail: user?.email,
        addedAt: justNow,
      },
    };
    console.log("data: ", insertuserData);
  };

  return (
    <div>
      <div className="container mt-5 relative font-poppins font-medium">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="font-poppins font-medium p-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Program */}
              <div>
                <label htmlFor="program">Program Name</label>
                <select
                  name="program"
                  {...register("program", {
                    required: "Program is required",
                  })}
                  aria-invalid={errors.program ? "true" : "false"}
                  className="w-full border-2 border-green-400 rounded-xl"
                >
                  <option disabled selected value="">
                    Choose a Program
                  </option>
                  {programs?.length > 0 &&
                    programs?.map((each) => (
                      <option key={each?._id} value={each?._id}>
                        {each?.programName}
                      </option>
                    ))}
                </select>
                {errors.program && (
                  <p
                    className="text-red-500 font-poppins font-medium"
                    role="alert"
                  >
                    {errors.program?.message}
                  </p>
                )}
              </div>
              {/* course */}
              <div>
                <label htmlFor="course">Course Name</label>
                <select
                  name="course"
                  {...register("course", {
                    required: "Course is required",
                  })}
                  aria-invalid={errors.course ? "true" : "false"}
                  className="w-full border-2 border-green-400 rounded-xl"
                >
                  <option disabled selected value="">
                    Choose a Course
                  </option>
                  {courses?.length > 0 &&
                    courses?.map((each) => (
                      <option key={each?._id} value={each?._id}>
                        {each?.courseName}
                      </option>
                    ))}
                </select>
                {errors.course && (
                  <p
                    className="text-red-500 font-poppins font-medium"
                    role="alert"
                  >
                    {errors.course?.message}
                  </p>
                )}
              </div>
              {batch && (
                <>
                  <div>
                    <label htmlFor="batch">Batch Name</label>
                    <input
                      placeholder={batch}
                      disabled
                      name="batch"
                      {...register("batch")}
                      className="w-full border-2 border-gray-400 rounded-xl p-2"
                      value={batch ? batch : ""}
                    />
                  </div>
                  <div>
                    <label htmlFor="email">Student email</label>
                    <input
                      type="email"
                      placeholder="Enter email"
                      name="email"
                      {...register("email", {
                        required: "Student email is required",
                      })}
                      className="w-full border-2 border-green-400 rounded-xl p-2"
                    />
                    {errors.email && (
                      <p
                        className="text-red-500 font-poppins font-medium"
                        role="alert"
                      >
                        {errors.email?.message}
                      </p>
                    )}
                  </div>
                </>
              )}
            </div>

            {/* Submit and search button */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div>
                <button
                  type="button"
                  disabled={searching || !selectedEmail}
                  className={`px-16 py-3 w-full mt-7 text-white rounded-lg ${
                    selectedEmail ? "bg-green-500" : "bg-gray-400"
                  }`}
                  onClick={searchStudent}
                >
                  {searching ? "Searching" : "Search student"}
                </button>
              </div>
              <div>
                <button
                  type="submit"
                  disabled={!addAllowed || isLoading}
                  className={`px-16 py-3 w-full mt-7 text-white rounded-lg ${
                    addAllowed ? "bg-green-500" : "bg-gray-400"
                  }`}
                >
                  {isLoading ? "Adding" : "Add student"}
                </button>
              </div>
            </div>
            {/* Submit and search button */}
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddStudent;
