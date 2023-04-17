import React from "react";
import { Link } from "react-router-dom";
import courseimg from '../../../assets/imga/environment-earth-day-hands-trees-growing-seedlings-bokeh-green-background-female-hand-holding-tree-nature-field-gra-130247647.jpg'
import style from './allCourse.module.css'

const AllCourses = () => {
  return (
    <div>
      <h1>all courses should be here here</h1>
      <div>
        <div className={`${style.contain}`}>
          <div className="grid md:grid-cols-1 lg:grid-cols-2  gap-5 pt-4 px-5">
            <Link to={''} className={`md:flex ${style.singleCourse}`}>
              <img src={courseimg} alt="" />
              <div className={`${style.textCourse}`}>
                <h2>Html</h2>
                <span>Resaul</span>
                <p><b className="bold text-black">Video : </b> 12 </p>
              </div>
            </Link>
            <Link to={''} className={`md:flex ${style.singleCourse}`}>
              <img src={courseimg} alt="" />
              <div className={`${style.textCourse}`}>
                <h2>Html</h2>
                <span>Resaul</span>
                <p><b className="bold text-black">Video : </b> 12 </p>
              </div>
            </Link>
            <Link to={''} className={`md:flex ${style.singleCourse}`}>
              <img src={courseimg} alt="" />
              <div className={`${style.textCourse}`}>
                <h2>Html</h2>
                <span>Resaul</span>
                <p><b className="bold text-black">Video : </b> 12 </p>
              </div>
            </Link>
            <Link to={''} className={`md:flex ${style.singleCourse}`}>
              <img src={courseimg} alt="" />
              <div className={`${style.textCourse}`}>
                <h2>Html</h2>
                <span>Resaul</span>
                <p><b className="bold text-black">Video : </b> 12 </p>
              </div>
            </Link>

          </div>
        </div>

        
      </div>
      <div>
        <Link to="/my-courses/specific-course">go to specific course page</Link>
      </div>
    </div>
  );
};

export default AllCourses;
