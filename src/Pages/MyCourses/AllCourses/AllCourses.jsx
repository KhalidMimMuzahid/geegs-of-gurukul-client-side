import React from "react";
import { Link } from "react-router-dom";

const AllCourses = () => {
  return (
    <div>
      <h1>all courses should be here here</h1>
      <div>
        <Link to="/my-courses/specific-course">go to specific course page</Link>
      </div>
    </div>
  );
};

export default AllCourses;
