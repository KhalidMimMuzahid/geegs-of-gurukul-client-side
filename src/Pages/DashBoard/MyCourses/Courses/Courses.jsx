import React from "react";
import { Link } from "react-router-dom";
import courseimg from "../../../../assets/imga/environment-earth-day-hands-trees-growing-seedlings-bokeh-green-background-female-hand-holding-tree-nature-field-gra-130247647.jpg";
import style from "./course.module.css";

const Courses = () => {
  return (
    <div>
      <div>
        <div className={`${style.contain}`}>
          {/* we hav to use each courses  */}
          <div className={`${style.contain}`}>
            {/* we hav to use each courses  */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-5 pt-4 px-5">
              <div className={`${style.singleCourse}`}>
                <img src={courseimg} alt="" />
                <h2>Css</h2>
                <Link to={"/dashboard/courses/course"}>Start Learn</Link>
              </div>
              <div className={`${style.singleCourse}`}>
                <img src={courseimg} alt="" />
                <h2>Css</h2>
                <Link to={"/dashboard/courses/course"}>Start Learn</Link>
              </div>
              <div className={`${style.singleCourse}`}>
                <img src={courseimg} alt="" />
                <h2>Css</h2>
                <Link to={"/dashboard/courses/course"}>Start Learn</Link>
              </div>
              <div className={`${style.singleCourse}`}>
                <img src={courseimg} alt="" />
                <h2>Css</h2>
                <Link to={"/dashboard/courses/course"}>Start Learn</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Courses;
