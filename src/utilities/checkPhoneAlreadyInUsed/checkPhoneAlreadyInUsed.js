import React, { useContext } from "react";

const checkPhoneAlreadyInUsed = (number) => {
  console.log("numbervavavavaaa: ", number);
  return fetch(
    `https://api.geeksofgurukul.com/api/v1/users/checkphonealreadyinused/${number}`
  );
};

export default checkPhoneAlreadyInUsed;
