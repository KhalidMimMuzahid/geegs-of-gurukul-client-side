import React, { useContext } from "react";

const checkAlreadyUser = (email) => {
  console.log("email: ", email);
  return fetch(
    `https://api.geeksofgurukul.com/api/v1/users/checkuseralreadyindatabase?email=${email}`
  );
};

export default checkAlreadyUser;
