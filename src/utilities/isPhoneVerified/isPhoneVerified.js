import React, { useContext } from "react";

const isPhoneVerified = (email) => {
  console.log("email: ", email);
  return fetch(
    `https://api.geeksofgurukul.com/api/v1/users/checkuserphoneverified?email=${email}`
  );
};

export default isPhoneVerified;
