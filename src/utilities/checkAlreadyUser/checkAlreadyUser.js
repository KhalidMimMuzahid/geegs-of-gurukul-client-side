import React, { useContext } from "react";

const checkAlreadyUser = (email) => {
  console.log("email: ", email);
  return fetch(
    `http://3.84.19.169:5000/api/v1/users/checkuseralreadyindatabase?email=${email}`
  );
};

export default checkAlreadyUser;
