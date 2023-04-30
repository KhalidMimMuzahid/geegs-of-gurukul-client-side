import React from "react";
import { Link } from "react-router-dom";
import style from './EachModule.module.css'
const EachModule = ({ module }) => {
  return (
    <Link to={'/dashboard/courses/lecture'} className={`${style.timeCurs}`}>
      <div>
        <h3>HTML :  HTML Advanced Tutorial </h3>
        <p>Language : English</p>
      </div>
      <Link>Join</Link>
    </Link>
  );
};

export default EachModule;
