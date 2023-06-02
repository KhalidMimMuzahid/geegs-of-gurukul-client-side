import React, { useContext } from "react";

const checkAlreadyUser = (email) => {
  console.log("email: ", email);
  return fetch(
    `http://localhost:5000/api/v1/users/checkuseralreadyindatabase?email=${email}`
  );
};

export default checkAlreadyUser;
