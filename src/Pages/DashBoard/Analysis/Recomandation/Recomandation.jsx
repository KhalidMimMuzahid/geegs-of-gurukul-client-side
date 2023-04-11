import React from "react";
import "./Recomandation.css";
import recomandationimage from "../../../../assets/svg/recomandation.svg";
const Recomandation = () => {
  return (
    <div>
      <div className="recomandation-container">
        <div className="recomandation-image-container">
          <img src={recomandationimage} alt="" />
        </div>
        <div className="recomandation-text-container">
          <h4 className="font-poppins text-2xl font-medium">
            Recommendation :
          </h4>
          <ul>
            <li className="font-poppins font-semibold text-2xl">
              Study grammar rules and practice exercises
            </li>
            <li className="font-poppins font-semibold text-2xl">
              Use time management techniques to improve performance in
              time-based sections
            </li>
            <li className="font-poppins font-semibold text-2xl">
              Incorporate more critical thinking exercises into your study
              routine
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Recomandation;
