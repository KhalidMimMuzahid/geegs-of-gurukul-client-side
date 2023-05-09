import React, { useContext } from "react";

const checkAlreadyUser = (email) => {
  console.log("email: ", email);
  return fetch(
    `https://geeks-of-gurukul-server-side.vercel.app/checkuseralreadyindatabase?email=${email}`
  );
};

export default checkAlreadyUser;
