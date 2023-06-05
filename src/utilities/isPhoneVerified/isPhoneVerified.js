import React, { useContext } from "react";

const isPhoneVerified = (email) => {
  console.log("email: ", email);
  return fetch(
    `http://3.84.19.169:5000/api/v1/users/checkuserphoneverified?email=${email}`
  );
};

export default isPhoneVerified;
