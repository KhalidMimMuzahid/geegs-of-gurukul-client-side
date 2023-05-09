import React, { useContext } from "react";

const isPhoneVerified = (email) => {
  console.log("email: ", email);
  return fetch(
    `https://geeks-of-gurukul-server-side.vercel.app/checkuserphoneverified?email=${email}`
  );
};

export default isPhoneVerified;
