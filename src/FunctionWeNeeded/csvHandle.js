// const [file, setFile] = useState();
// const fileReader = new FileReader();
// const handleOnChange = (e) => {
//     setFile(e.target.files[0]);
//   };
//   const csvFileToObject = (string, fileName) => {
//     // let collageName = [];
//     // console.log("string: ", string);
//     const csvRows = string.split("\n");
//     // console.log(csvRows);
//     // console.log(typeof csvRows);
//     // console.log("\nxxxxx: " + xxx);
//     const collageName = csvRows?.map((eachRows) => {
//       if (eachRows?.startsWith('"')) {
//         // do for eac that contain comma
//         const newRow = eachRows?.slice(1, -2);
//         return newRow;
//       } else {
//         // do for eac that not contain comma
//         const newRow = eachRows?.slice(0, -1);
//         return newRow;
//       }
//     });
//     // console.log("collageName: ", collageName);
//     const y = JSON.stringify(collageName);
//     console.log("y: ", y);
//   };
//   const handleOnSubmit = (e) => {
//     e.preventDefault();
//     if (file) {
//       fileReader.onload = function (event) {
//         const text = event.target.result;
//         // console.log("text: \n" + text);
//         csvFileToObject(text, file?.name);
//       };

//       fileReader.readAsText(file);
//     }
//   };
