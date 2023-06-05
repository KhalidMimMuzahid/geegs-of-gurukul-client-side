import React, { useContext } from "react";

const checkPhoneAlreadyInUsed = (number) => {
  console.log("numbervavavavaaa: ", number);
  return fetch(
    `http://3.84.19.169:5000/api/v1/users/checkphonealreadyinused/${number}`
  );
};

export default checkPhoneAlreadyInUsed;
