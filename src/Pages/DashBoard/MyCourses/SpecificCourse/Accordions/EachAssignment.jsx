import React, { useState, useEffect } from "react";
import moment from "moment";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { toast } from "react-hot-toast";
import {
  AiFillCheckCircle,
  AiFillEyeInvisible,
  AiFillEye,
  AiFillLock,
} from "react-icons/ai";
import { useContext } from "react";
import { AuthContext } from "../../../../../contexts/UserProvider/UserProvider";

function EachAssignment({
  eachAssignment,
  lecture,
  module_id,
  setSelected,
  selected,
  lecturesList,
  setSelectedModuleLectureList,
  changingAssignmentStatus,
}) {
  const justNow2 = moment().format("YYYY-MM-DDTHH:mm");
  // const selectedDeadline = "2023-09s-26T17:54";
  const selectedDeadline = lecture?.assignment?.deadLine;
  const { user } = useContext(AuthContext);
  const [assignmentResponse, setAssignmentResponse] = useState({});
  const [shouldRefreshForStatusByToggle, setShouldRefreshForStatusByToggle] =
    useState(false);
  const [totalSubmittedResponse, setTotalSubmittedResponse] = useState(0);
  const [totalCompletedRes, setTotalCompletedRes] = useState(0);
  const [totalRes, setTotalRes] = useState(0);
  const [responseStatus, setResponseStatus] = useState({});
  const [refreshAssignmentStatus, setRefreshAssignmentStatus] = useState(false);

  const assignmentClick = () => {
    const justNow = moment().format();

    const assignmentData = {
      status: "visited",
      program: {
        program_id: lecture?.program?.program_id,
        programName: lecture?.program?.programName,
      },
      course: {
        course_id: lecture?.course?.course_id,
        courseName: lecture?.course?.courseName,
      },
      batch: {
        batch_id: lecture?.batch?.batch_id,
        batchName: lecture?.batch?.batchName,
      },
      lecture: {
        lecture_id: lecture?._id,
        lectureName: lecture?.lectureName,
      },
      module: {
        module_id: lecture?.module?.module_id,
        moduleName: lecture?.module?.moduleName,
      },
      assignment: {
        assignment_id: selected?.assignment_id,
        assignmentName: selected?.assignmentName,
      },
      submissionDetails: {
        studentEmail: user?.email,
        startedAt: justNow,
        finishedAt: "",
      },
    };
    console.log("assignmentData: ", assignmentData);
    fetch("http://localhost:5000/api/v1/assignments/assignment-response", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(assignmentData),
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log("data for exercises", data);
        if (data?.success) {
          // to do
          setAssignmentResponse({
            ...assignmentData,
            _id: data?.result?.insertedId,
          });
        } // Log the response from the server
      })
      .catch((error) => {
        console.error(error);
      });
  };
  //   console.log("assignment: ", eachAssignment);
  //   console.log("lecture: ", lecture);
  useEffect(() => {
    fetch(
      `http://localhost:5000/api/v1/assignments/assignmentby_id?_id=${eachAssignment?.assignment_id}`
    )
      .then((res) => res.json())
      .then((data) => {
        // console.log("dataaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa: ", data);
        setTotalSubmittedResponse(
          data?.exercises?.length ? data?.exercises?.length : 0
        );
      });
  }, []);
  useEffect(() => {
    console.log("testingggggggggggggggggggggggggggg");
    const query = {
      lecture_id: lecture?._id,
      assignment_id: eachAssignment?.assignment_id,
      studentEmail: user?.email,
    };
    fetch(`http://localhost:5000/api/v1/assignments/assignment-response`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        query: JSON.stringify(query),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        if (result?.success) {
          const data = result?.data;
          console.log("Assignment Response: ", data);
          setAssignmentResponse(data);
          const query = {
            lecture_id: lecture?._id,
            assignment_id: eachAssignment?.assignment_id,
            studentEmail: user?.email,
          };
          fetch(`http://localhost:5000/api/v1/assignments/assignment-exercises-response`, {
            method: "GET",
            headers: {
              "content-type": "application/json",
              query: JSON.stringify(query),
            },
          })
            .then((res) => res.json())
            .then((data) => {
              console.log("exercisesssss data: ", data);
              setTotalRes(data?.data?.length ? data?.data?.length : 0);
              const completedRes = data?.data?.filter(
                (exerciseRes) => exerciseRes?.status === "completed"
              );
              setTotalCompletedRes(
                completedRes?.length ? completedRes?.length : 0
              );

              setShouldRefreshForStatusByToggle((prev) => !prev);
            });
        } else {
          setAssignmentResponse({});
        }
      })
      .catch((err) => {
        toast.error(err.message);
      });
  }, [
    lecture?._id,
    eachAssignment?.assignment_id,
    totalSubmittedResponse,
    selected?.assignment_id,
    refreshAssignmentStatus,
  ]);
  useEffect(() => {
    if (
      changingAssignmentStatus?.assignment_id === eachAssignment?.assignment_id
    ) {
      setRefreshAssignmentStatus((prev) => !prev);
    }
  }, [changingAssignmentStatus?.toggle]);
  useEffect(() => {
    const justNow = moment().format("YYYY-MM-DDTHH:mm");
    if (justNow < selectedDeadline) {
      // todo for not expired
      if (
        totalCompletedRes === totalSubmittedResponse &&
        totalCompletedRes !== 0
      ) {
        setResponseStatus({
          element: <AiFillCheckCircle color='green' size={25} />,
          status: "All exercises submitted and not expired",
        });
      } else if (totalCompletedRes > 0) {
        setResponseStatus({
          element: <AiFillCheckCircle color='yellow' size={25} />,
          status: "Partially submitted and not expired",
        });
      } else if (totalRes > 0) {
        setResponseStatus({
          element: <AiFillEye color='green' size={25} />,
          status: "Visited and not expired",
        });
      } else {
        setResponseStatus({
          element: <AiFillEyeInvisible color='red' size={25} />,
          status: "Not visited and not expired",
        });
      }
    } else {
      // todo  for  expired
      if (
        totalCompletedRes === totalSubmittedResponse &&
        totalCompletedRes !== 0
      ) {
        setResponseStatus({
          element: <AiFillLock color='green' size={25} />,
          status: "All exercises submitted and expired",
        });
      } else if (totalCompletedRes > 0) {
        setResponseStatus({
          element: <AiFillLock color='yellow' size={25} />,
          status: "Partially submitted and expired",
        });
      } else {
        setResponseStatus({
          element: <AiFillLock color='red' size={25} />,
          status: "Not submitted any exercise and expired",
        });
      }
    }
  }, [shouldRefreshForStatusByToggle]);

  return (
    <button
      type='button'
      className='relative flex items-center p-2 border border-gray-200 w-full rounded-md bg-white my-2'
      onClick={() => {
        setSelected({
          ...eachAssignment,
          lecture_id: lecture?._id,
          module: { module_id: module_id },
          deadLine: lecture?.assignment?.deadLine,
          sheduledAt: lecture?.assignment?.sheduledAt,
        });
        setSelectedModuleLectureList(lecturesList);
        assignmentClick();
      }}
      key={eachAssignment._id} // Move the key prop here
    >
      {selected?.assignment_id === eachAssignment.assignment_id && (
        <span className='absolute left-0 top-0 bottom-0 w-1 bg-green-500 rounded-l-md'></span>
      )}
      <div title={responseStatus?.status}>{responseStatus?.element}</div>
      <p className='text-sm ml-3'>{eachAssignment.assignmentName}</p>
    </button>
  );
}

export default EachAssignment;
