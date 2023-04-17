import React, { useRef } from "react";
// import styles from "./csv.module.css";
import { useState } from "react";
import { useEffect } from "react";
import "./CSV.css";
const CSV = () => {
  const [assessment, setAssessment] = useState();
  const [questions, setQuestions] = useState([]);
  const [error, setError] = useState(null);
  const [errorInRowColumnPairs, setErrorInRowColumnPairs] = useState([]);
  const [isCopied, setIsCopied] = useState(false);
  //   {
  //     _id: "givenByThe_MongoDB",
  //     assessmentName: "random_Topics",
  //     timeDuration: "total_Ques * time_for_Each_Ques",
  //     totalQues: "the total number of the questions",
  //   }
  const removeDuplicateQuestions = (allQuestions) => {
    let newArray = [];
    console.log("allQuestions xxxxxxxxxx: ", allQuestions);
    allQuestions.forEach((eachQuesion) => {
      // console.log(
      //   "eachQuesion xxxxxxxxxxxxxxxxxxxxxxxxxxx",
      //   eachQuesion?.questionName
      // );
      const isAlreadeyInArray = newArray.find(
        (each) => each?.questionName === eachQuesion?.questionName
      );
      // console.log("isAlreadeyInArray:  ", isAlreadeyInArray);
      if (!isAlreadeyInArray) {
        newArray.push(eachQuesion);
      }
    });
    return newArray;
  };
  const [file, setFile] = useState();
  const fileReader = new FileReader();

  const handleOnChange = (e) => {
    setFile(e.target.files[0]);
  };
  // useEffect(() => {
  //   console.log("questions: ", questions);
  // }, [questions]);
  const csvFileToObject = (string, fileName) => {
    let noOfRow = 1;
    let pushCount = 0;
    let isError = false;
    const csvHeader = string.slice(0, string.indexOf("\r\n")).split(",");
    // console.log("\ncsvHeader: ", csvHeader);
    const csvRows = string.slice(string.indexOf("\n") + 1).split("\r\n");
    // console.log("\ncsvRows: xxxxxxxxxxx", csvRows);
    const allQuestions = [];

    csvRows.forEach((eachRow, i) => {
      noOfRow += 1;

      try {
        // Try to run this code
        if (eachRow?.length !== 0) {
          // console.log("\n", eachRow);
          const tempQues = eachRow?.slice(0, eachRow.indexOf(',"{""'));
          let question;

          // console.log("\n", tempQues);
          if (tempQues.startsWith('"')) {
            question = tempQues.slice(1, tempQues.length - 1);
          } else {
            question = tempQues;
          }
          // if (noOfRow === 3) {
          //   console.log(
          //     "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx\nrow = ",
          //     noOfRow,
          //     "\nquestion= ",
          //     question
          //   );
          // }
          // console.log("\n", question);
          let tempOptionObjectString = eachRow?.slice(
            eachRow.indexOf(',"{""') + 2,
            eachRow.indexOf('}}",') + 2
          );
          // console.log("\ntempOptionObjectString: ", tempOptionObjectString);
          while (tempOptionObjectString.includes('""')) {
            tempOptionObjectString = tempOptionObjectString.replace('""', '"');
          }
          const optionObject = JSON.parse(tempOptionObjectString);
          // console.log("\noptionObject : ", optionObject);
          let tempOtherParametereArray = eachRow
            ?.slice(eachRow.indexOf('}}",') + 4)
            .split(",");
          // console.log("tempOtherParametere: ", tempOtherParametereArray);
          const topicName = tempOtherParametereArray[0];
          const difficultyLevel = tempOtherParametereArray[1];
          const marks = tempOtherParametereArray[2];
          const newQuestion = {
            questionName: question,
            optionObject,
            topicName,
            difficultyLevel,
            marks,
          };
          pushCount += 1;
          allQuestions.push(newQuestion);
          const newQuestions = [...questions, newQuestion];
          setQuestions(newQuestions);
        }

        if (eachRow?.length !== 0) {
          // console.log("\n", eachRow);
          const tempQues = eachRow?.slice(0, eachRow.indexOf(',"{""'));
          let question;

          // console.log("\n", tempQues);
          if (tempQues.startsWith('"')) {
            question = tempQues.slice(1, tempQues.length - 1);
          } else {
            question = tempQues;
          }
          if (noOfRow === 3) {
            console.log(
              "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx\nrow = ",
              noOfRow,
              "\nquestion= ",
              question
            );
          }
          // console.log("\n", question);
          let tempOptionObjectString = eachRow?.slice(
            eachRow.indexOf(',"{""') + 2,
            eachRow.indexOf('}}",') + 2
          );
          // console.log("\ntempOptionObjectString: ", tempOptionObjectString);
          while (tempOptionObjectString.includes('""')) {
            tempOptionObjectString = tempOptionObjectString.replace('""', '"');
          }

          // xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
          const optionObject = JSON.parse(tempOptionObjectString);
          // console.log("\noptionObject : ", optionObject);
          let tempOtherParametereArray = eachRow
            ?.slice(eachRow.indexOf('}}",') + 4)
            .split(",");
          // console.log("tempOtherParametere: ", tempOtherParametereArray);
          const topicName = tempOtherParametereArray[0];
          const difficultyLevel = tempOtherParametereArray[1];
          const marks = tempOtherParametereArray[2];
          const newQuestion = {
            questionName: question,
            optionObject,
            topicName,
            difficultyLevel,
            marks,
          };
          allQuestions.push(newQuestion);
          const newQuestions = [...questions, newQuestion];
          setQuestions(newQuestions);
        }
      } catch (err) {
        // if any error, Code throws the error
        console.log(err);
        console.log("row= ", noOfRow);
        const newErrorInRowColumnPairs = [...errorInRowColumnPairs];
        newErrorInRowColumnPairs.push({ row: noOfRow, column: "unknown" });
        setErrorInRowColumnPairs(newErrorInRowColumnPairs);
        // if (err) {
        //   setErrorInRowColumnPairs((prev) => [
        //     ...prev,
        //     { row: noOfRow, column: "unknown" },
        //   ]);
        // }

        // if (!error) {
        setError({
          errorType: "formatError",
          message: `There have some provlem in your ${fileName}`,
        });
        isError = true;
        // }
      } finally {
      }
    });
    if (!isError) {
      console.log(allQuestions);
      const withNonDuplicateQuestions = removeDuplicateQuestions(allQuestions);
      // console.log("withNonDuplicateQuestions: ", withNonDuplicateQuestions);
      fetch("http://localhost:5000/add-csv-data", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(withNonDuplicateQuestions),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data?.acknowledged) {
            //   TODO:    show confirmationMessage
            //   clear all form and errors
            window.alert("succesfully confirmed");
          } else {
            //   TODO:    show error Message
            window.alert("something went wrong");
          }
        });
      // setAssessment((prevAssessment) => {
      //   const newAssessment = { ...prevAssessment };
      //   newAssessment.allQuestions = allQuestions;
      //   return newAssessment;
      // });
    } else {
      return;
    }
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    setIsCopied(false);
    setError(null);
    setErrorInRowColumnPairs([]);
    // console.log("file: ", file);
    if (!file?.name?.endsWith(".csv")) {
      // to do: show an error. cause this is not CSV file
      setError({
        errorType: "invalidFile",
        message: "please provide a valid file (csv file)",
      });
      return;
    }
    if (file) {
      fileReader.onload = function (event) {
        const text = event.target.result;
        // console.log("text: \n" + text);
        csvFileToObject(text, file?.name);
      };

      fileReader.readAsText(file);
    }
  };

  // copy error text

  const htmlElement = useRef(null);

  const handleClick = () => {
    const htmlText = htmlElement.current.innerHTML;
    navigator.clipboard.writeText(htmlText);
    setIsCopied(true);
  };

  return (
    <div className="container mt-4">
      <form>
        <div className="d-flex flex-row gap-3">
          {/* <input
            type={"file"}
            id={"csvFileInput"}
            accept={".csv"}
            onChange={handleOnChange}
          /> */}

          <div class="max-w-2xl mx-auto">
            <div class="flex items-center justify-center w-full">
              <label
                for="csvFileInput"
                class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
              >
                <div class="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg
                    class="w-10 h-10 mb-3 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    ></path>
                  </svg>
                  <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span class="font-semibold">Click to upload</span> or drag
                    and drop
                  </p>
                  <p class="text-xs text-gray-500 dark:text-gray-400">
                    File Supported : CSV
                  </p>
                </div>
                <input
                  id={"csvFileInput"}
                  type={"file"}
                  accept={".csv"}
                  onChange={handleOnChange}
                  className="hidden"
                />
              </label>
            </div>

            <div className=" ltems-center justify-center my-6 gap-4">
              <div className=" text-center">
                {/* button */}
                <button
                  type="button"
                  onClick={(e) => {
                    handleOnSubmit(e);
                  }}
                  class="group rounded-2xl h-12 w-48 bg-green-500 font-bold text-lg text-white relative overflow-hidden"
                >
                  Add
                  <div class="absolute duration-300 inset-0 w-full h-full transition-all scale-0 group-hover:scale-100 group-hover:bg-white/30 rounded-2xl"></div>
                </button>
              </div>
              {/* Error code */}
              {error && (
                <div>
                  {error?.errorType === "invalidFile" && (
                    <div className="message-error">
                      <h1 className="">Error</h1>
                      <h5 className="" ref={htmlElement}>
                        {error?.message}
                      </h5>
                      <span className="copy-btu" onClick={handleClick}>
                        {isCopied ? "Copied" : "Copy"}
                      </span>
                    </div>
                  )}
                  {error?.errorType === "formatError" && (
                    <div>
                      {errorInRowColumnPairs?.length !== 0 &&
                        errorInRowColumnPairs?.map((eachPairs) => (
                          <div>
                            <h1 onClick={handleClick}>
                              row = {eachPairs?.row}, column ={" "}
                              {eachPairs?.column}
                            </h1>
                          </div>
                        ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
        {/* errorType: "invalidFile", message: "please provide a valid file (csv
        file)", */}
        {/* setError({
            errorType: "formatError",
            message: `There have some provlem in your ${fileName}`,
          }); */}
      </form>
    </div>
  );
};

export default CSV;
