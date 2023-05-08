
import React, { useContext } from "react";

const checkPhoneAlreadyInUsed = (number) => {
    console.log("numbervavavavaaa: ",number)
  return fetch(
    `https://geeks-of-gurukul-server-side.vercel.app/checkphonealreadyinused/${number}`
  );
};

export default checkPhoneAlreadyInUsed;
