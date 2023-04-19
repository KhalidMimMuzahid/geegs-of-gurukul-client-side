import React from "react";
import zoom from "../../../../assets/icons/zoom.png";
const LectureScedule = () => {
  return (
    <div>
      {/* Lecture Scedule card */}
      <div class="flex items-center justify-center py-5">
        {" "}
        <div class="rounded-xl border p-5 shadow-md w-9/12 bg-white">
          <div class="flex w-full items-center justify-between border-b pb-3">
            <div class="flex items-center space-x-3">
              <div class="h-8 w-8 rounded-full bg-slate-400 bg-[url('https://i.pravatar.cc/32')]"></div>
              <div class="text-lg font-bold text-slate-700">Rahul Biswash</div>
            </div>
            <div class="flex items-center space-x-8">
              {/* Right top side if needed */}
            </div>
          </div>

          <div class="mt-4 mb-6">
            <div class="mb-3 text-xl font-bold font-poppins">
              Get Started with Data Analysis
            </div>
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-56">
              <div className="font-poppins font-medium">
                <p>Topic: Introduction to Data Analyasis</p>
                <p>Time: 10:30 pm</p>
                <p>Covered by: Deepak Mishra</p>
              </div>
              <div>
                <button class="bg-green-400 hover:bg-green-500 text-black font-bold py-2 px-4 rounded flex items-center">
                  <img src={zoom} alt="Zoom Logo" class="h-6 w-6 mr-2" />
                  Join with Zoom
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LectureScedule;
