import moment from "moment";
import React, { useContext, useEffect, useState } from "react";
import {
  AiFillCheckCircle,
  AiFillEyeInvisible,
  AiFillEye,
  AiFillLock,
} from "react-icons/ai";
import { AuthContext } from "../../../../../contexts/UserProvider/UserProvider";
import { toast } from "react-hot-toast";
const EachEveluation = ({
  selected,
  lecture,
  setSelected,
  evaluationClick,
  changingEvaluationStatus,
}) => {
  // console.log("lecturexxxxxxxxxxxxx: ", lecture);
  const { user } = useContext(AuthContext);
  const selectedDeadline = lecture?.endSAt;
  const [totalExercises, setTotalExercises] = useState(
    lecture?.evaluation?.exercises?.length
  );
  const [totalCompletedRes, setTotalCompletedRes] = useState(0);
  const [responseStatus, setResponseStatus] = useState({});
  const [shouldRefreshForStatusByToggle, setShouldRefreshForStatusByToggle] =
    useState(false);
  const [refreshEvaluationStatus, setRefreshEvaluationStatus] = useState(false);
  const [evaluationResponse, setEvaluationResponse] = useState({});
  const [totalRes, setTotalRes] = useState(0);
  useEffect(() => {
    // console.log("testingggggggggggggggggggggggggggg");
    const query = {
      evaluation_id: lecture?._id,
      studentEmail: user?.email,
    };
    fetch(`http://localhost:5000/api/v1/evaluations/evaluation-response`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        query: JSON.stringify(query),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log("result in each assi: ", result);
        if (result?.success) {
          const data = result?.data;
          console.log("Assignment Response: ", data);
          setEvaluationResponse(data);
          const query = {
            evaluation_id: lecture?._id,
            studentEmail: user?.email,
          };
          fetch(
            `http://localhost:5000/api/v1/evaluations/evaluation-exercises-response`,
            {
              method: "GET",
              headers: {
                "content-type": "application/json",
                query: JSON.stringify(query),
              },
            }
          )
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
          setEvaluationResponse({});
        }
      })
      .catch((err) => {
        toast.error(err.message);
      });
  }, [lecture?._id, totalExercises, selected?._id, refreshEvaluationStatus]);
  useEffect(() => {
    if (changingEvaluationStatus?.evaluation_id === lecture?._id) {
      // console.log("oooooooooo");
      // console.log("changingAssignmentStatus: ", changingEvaluationStatus);
      // console.log("eachEvaluation: ", lecture);
      // console.log("oooooooooo");
      setRefreshEvaluationStatus((prev) => !prev);
    }
  }, [changingEvaluationStatus?.toggle]);

  useEffect(() => {
    const justNow = moment().format("YYYY-MM-DDTHH:mm");
    if (selected?._id === lecture?._id) {
      console.log(
        "totalCompletedRes:",
        totalCompletedRes,
        "\ntotalExercises: ",
        totalExercises,
        "\ntotalExercises: ",
        totalExercises
      );
    }

    if (justNow < selectedDeadline) {
      // todo for not expired
      if (totalCompletedRes === totalExercises && totalCompletedRes !== 0) {
        setResponseStatus({
          element: <AiFillCheckCircle color="green" size={25} />,
          status: "All exercises submitted and not expired",
        });
      } else if (totalCompletedRes > 0) {
        setResponseStatus({
          element: <AiFillCheckCircle color="yellow" size={25} />,
          status: "Partially submitted and not expired",
        });
      } else if (totalRes > 0) {
        setResponseStatus({
          element: <AiFillEye color="green" size={25} />,
          status: "Visited and not expired",
        });
      } else {
        setResponseStatus({
          element: <AiFillEyeInvisible color="red" size={25} />,
          status: "Not visited and not expired",
        });
      }
    } else {
      // todo  for  expired
      if (totalCompletedRes === totalExercises && totalCompletedRes !== 0) {
        setResponseStatus({
          element: <AiFillLock color="green" size={25} />,
          status: "All exercises submitted and expired",
        });
      } else if (totalCompletedRes > 0) {
        setResponseStatus({
          element: <AiFillLock color="yellow" size={25} />,
          status: "Partially submitted and expired",
        });
      } else {
        setResponseStatus({
          element: <AiFillLock color="red" size={25} />,
          status: "Not submitted any exercise and expired",
        });
      }
    }
  }, [shouldRefreshForStatusByToggle]);

  return (
    <>
      {selected?._id === lecture?._id && (
        <span className="absolute left-0 top-0 bottom-0 w-1 bg-green-500 rounded-l-md"></span>
      )}
      <div className="flex gap-3">
        <div title={responseStatus?.status}>{responseStatus?.element}</div>
        <button
          type="button"
          onClick={() => {
            setSelected(lecture);
            evaluationClick();
          }}
          className="flex items-center justify-between w-full  relative"
        >
          <p className="text-green-600">{lecture?.evaluationName}</p>
        </button>
      </div>
    </>
  );
};

export default EachEveluation;
