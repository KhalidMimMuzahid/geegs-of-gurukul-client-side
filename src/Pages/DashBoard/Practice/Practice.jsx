import React from "react";

const Practice = () => {
  const assesmentList = [
    {
      _id: "42ef65ea8cb9b3eb52cd09e",
      assessmentName: "for new comers",
      topicName: "Javascript",
      batchId: "FSWD-001",
      createdAt: "12/12/23 08:00",
      updatedAt: "12/12/23 06:00",
      scheduledAt: "12/12/23 08:00",
      instruction: "If assessment setter wants to give any instructions.There will be instructions by default as well",
      duration: "10",

    },
    {
      _id: "42ef65ea8cb9b3eb52cd09e",
      assessmentName: "for new comers",
      topicName: "Javascript",
      batchId: "FSWD-001",
      createdAt: "12/12/23 08:00",
      updatedAt: "12/12/23 06:00",
      scheduledAt: "12/12/23 08:00",
      instruction: "If assessment setter wants to give any instructions.There will be instructions by default as well",
      duration: "10",

    },
    {
      _id: "42ef65ea8cb9b3eb52cd09e",
      assessmentName: "for new comers",
      topicName: "Javascript",
      batchId: "FSWD-001",
      createdAt: "12/12/23 08:00",
      updatedAt: "12/12/23 06:00",
      scheduledAt: "12/12/23 08:00",
      instruction: "If assessment setter wants to give any instructions.There will be instructions by default as well",
      duration: "10",

    },
    {
      _id: "42ef65ea8cb9b3eb52cd09e",
      assessmentName: "for new comers",
      topicName: "Javascript",
      batchId: "FSWD-001",
      createdAt: "12/12/23 08:00",
      updatedAt: "12/12/23 06:00",
      scheduledAt: "12/12/23 08:00",
      instruction: "If assessment setter wants to give any instructions.There will be instructions by default as well",
      duration: "10",

    },
    {
      _id: "42ef65ea8cb9b3eb52cd09e",
      assessmentName: "for new comers",
      topicName: "Javascript",
      batchId: "FSWD-001",
      createdAt: "12/12/23 08:00",
      updatedAt: "12/12/23 06:00",
      scheduledAt: "12/12/23 08:00",
      instruction: "If assessment setter wants to give any instructions.There will be instructions by default as well",
      duration: "10",

    },
    {
      _id: "42ef65ea8cb9b3eb52cd09e",
      assessmentName: "for new comers",
      topicName: "Javascript",
      batchId: "FSWD-001",
      createdAt: "12/12/23 08:00",
      updatedAt: "12/12/23 06:00",
      scheduledAt: "12/12/23 08:00",
      instruction: "If assessment setter wants to give any instructions.There will be instructions by default as well",
      duration: "10",

    }
  ]

  return (
    <div>
      <div className="assesment-area">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 pt-4 px-5">
          {
            assesmentList?.map(assesment => <div key={assesment?._id} className="single-assement p-5 bg-white border border-gray-200 rounded-lg shadow ">
              <h2 className="  font-bold text-xl tracking-tight text-gray-900 ">AssessmentName: {assesment?.assessmentName}</h2>
              <h3 className=" text-green-500 text-2xl ">TopicName: {assesment?.topicName}</h3>
              <p className="my-2 "><span className="font-bold">BatchId :</span> {assesment?.batchId}</p>
              <p className="my-2 "><span className="font-bold ">CreatedAt</span>  : {assesment?.createdAt}</p>

              <p className="my-2 "><span className="font-bold">UpdatedAt</span> : {assesment?.updatedAt}</p>
              <p className="my-2 "><span className="font-bold">ScheduledAt</span> : {assesment?.scheduledAt}</p>
              <p className="my-2 "><span className="font-bold">Duration</span> : {assesment?.duration}</p>

              <p className="my-2 "><span className="font-bold">Instruction</span> : {assesment?.instruction}</p>
              

            </div>)
          }

        </div>
      </div>
    </div>
  )
};

export default Practice;

