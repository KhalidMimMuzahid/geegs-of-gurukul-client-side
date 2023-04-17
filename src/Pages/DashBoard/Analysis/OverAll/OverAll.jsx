import { useState } from "react";

function OverAll() {
  const [status] = useState([
    {
      title: "Complete",
      percent: "95",
    },
    {
      title: "Incomplete",
      percent: "70",
    },
    {
      title: "Unattempt",
      percent: "90",
    },
  ]);

  const [currentSkill, setCurrentSkill] = useState({
    title: "HTML",
    percent: "95",
  });

  const circumference = 2 * (22 / 7) * 120;

  return (
    <section
      className=' w-96 p-1 space-y-1 my-8  rounded-xl grid-cols-1 md:grid-cols-2 lg:grid-cols-2 md:gap-4 sm:space-y-0'
      x-data='{currentSkill: currentSkill}'
    >
      <h4 className="text-2xl font-poppins font-medium">Overall</h4>
      <div className='flex items-center justify-center'>
        <svg className='transform -rotate-90 w-72 h-72'>
          <circle
            cx='145'
            cy='145'
            r='120'
            stroke='currentColor'
            strokeWidth='30'
            fill='transparent'
            className='text-gray-700'
          />

          <circle
            cx='145'
            cy='145'
            r='120'
            stroke='currentColor'
            strokeWidth='30'
            fill='transparent'
            strokeDasharray={circumference}
            strokeDashoffset={
              circumference - (currentSkill.percent / 100) * circumference
            }
            className='text-green-500 '
          />
        </svg>
        <span className='absolute text-5xl'>{`${currentSkill.percent}%`}</span>
      </div>

      <div className='flex flex-col justify-center gap-2'>
        {status.map((skill, index) => (
          <button
            key={index}
            className={`${skill.title === "Incomplete" && "bg-slate-400"}`}
            onClick={() => setCurrentSkill(skill)}
          >
            {skill.title}
          </button>
        ))}
      </div>
    </section>
  );
}

export default OverAll;
