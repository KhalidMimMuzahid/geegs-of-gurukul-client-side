import React, { useState, useEffect, useContext } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { AuthContext } from "../../../../contexts/UserProvider/UserProvider";
import moment from "moment";
import UserCSVUpload from "./UserCSVUpload/UserCSVUpload";

const AddStudent = () => {
  const [programs, setPrograms] = useState([]);
  const [courses, setCourses] = useState([]);
  const [batch, setBatch] = useState({});
  const [addAllowed, setAddAllowed] = useState(false);
  const [courseObject, setCourseObject] = useState({});
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
    fetch("https://api.geeksofgurukul.com/api/v1/programs/all-program")
      .then((response) => response.json())
      .then((data) => {
        console.log("program data", data?.data);
        setPrograms(data?.data);
      });
  }, []);
  useEffect(() => {
    const courseObjectTemp = courses?.find(
      (course) => course?._id === selectedCourse
    );
    console.log("courseObjectTemp : ", courseObjectTemp);
    setCourseObject(courseObjectTemp?._id ? courseObjectTemp : {});
  }, [selectedCourse]);

  // find course
  useEffect(() => {
    if (selectedProgram) {
      fetch(`https://api.geeksofgurukul.com/api/v1/courses/search-course`, {
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
          setBatch({});
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
        setBatch({});
        setAddAllowed(false);
      } else {
        try {
          (async () => {
            const resBatch = await fetch(
              `https://api.geeksofgurukul.com/api/v1/batches/batch?batchName=${tempCourse?.currentBatch}`
            );
            const resultBatch = await resBatch.json();
            if (resultBatch?._id) {
              setBatch(resultBatch);
              setAddAllowed(true);
            } else {
              setBatch({});
              setAddAllowed(false);
              toast.error("Something went wrong, please try again later");
            }
          })();
        } catch (err) {
          setBatch({});
          setAddAllowed(false);
          toast.error(err.message);
        }
      }
    }
  }, [selectedCourse]);

  // on submit
  const onSubmit = async (data) => {
    const justNow = moment().format();
    // console.log("data: ", data);
    try {
      const courseObject = courses?.find(
        (course) => course?._id === selectedCourse
      );

      const coursePurchaseDetails = {
        program: {
          program_id: selectedProgram,
          programName: courseObject?.program?.programName,
        },
        course: {
          course_id: selectedCourse,
          courseName: courseObject?.courseName,
        },
        batch: {
          batch_id: batch?._id,
          batchName: batch?.batchName,
        },
        isPaid: true,
        regularPrice: courseObject?.regularPrice,
        discount: 100,
        appliedPrice: 0,
        couponCode: "",
        paymentId: "",
        purchaseInfo: {
          purchaseByEmail: selectedEmail,
          enrolledAt: justNow,
          paidAt: justNow,
        },
        addedBy: {
          adderName: user?.name,
          adderEmail: user?.email,
          addedAt: justNow,
        },
      };
      console.log("data: ", coursePurchaseDetails);
      fetch(
        `https://api.geeksofgurukul.com/api/v1/purchasesCourse/add-student-to-course`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(coursePurchaseDetails),
        }
      )
        .then((res) => res.json())
        .then((data) => {
          console.log("data :", data);
          if (data?.success) {
            toast.success(data?.message);
          } else {
            toast.error(data?.error);
          }
        });
    } catch (err) {
      toast.error(err.message);
    }
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
                    className="text-red-500 text-sm font-poppins font-normal"
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
                    className="text-red-500 text-sm font-poppins font-normal"
                    role="alert"
                  >
                    {errors.course?.message}
                  </p>
                )}
              </div>
              {batch?._id && (
                <>
                  <div>
                    <label htmlFor="batch">Batch Name</label>
                    <input
                      disabled
                      name="batch"
                      {...register("batch")}
                      className="w-full border-2 border-gray-400 rounded-xl p-2"
                      value={courseObject?.currentBatch}
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
            <div className="grid grid-cols-1 gap-4">
              <div>
                <button
                  type="submit"
                  className={`px-16 py-3 w-full mt-7 text-white rounded-lg ${
                    addAllowed ? "bg-green-500" : "bg-gray-400"
                  }`}
                >
                  Add student
                </button>
              </div>
            </div>
            {/* Submit and search button */}
          </div>
        </form>
      </div>
      <div className="flex gap-3 mx-auto">
        <UserCSVUpload batch={batch} courseObject={courseObject} />
      </div>
    </div>
  );
};

export default AddStudent;
