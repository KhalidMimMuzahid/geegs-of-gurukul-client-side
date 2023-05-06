

import React, { useContext } from "react";

const isPhoneVerified = (email) => {
    console.log("email: ", email)
  return fetch(
    `http://localhost:5000/checkuserphoneverified?email=${email}`
  );
};

export default isPhoneVerified;
