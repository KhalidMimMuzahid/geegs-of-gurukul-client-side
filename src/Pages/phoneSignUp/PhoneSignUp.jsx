import React, { useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";

import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { useContext } from "react";
// import "./PhoneSignUp.css";
import { toast } from "react-hot-toast";
import { AuthContext } from "../../contexts/UserProvider/UserProvider";
import Loading from "../../Components/Loading/Loading";

const PhoneSignUp = () => {
  const [error, setError] = useState("");
  const [number, setNumber] = useState("");
  const [flag, setFlag] = useState(false);
  const [otp, setOtp] = useState("");
  const [result, setResult] = useState("");
  const [updateUserInfo, setUpdateUserInfo] = useState(null);
  const {
    setUpRecaptha,
    setLoading,
    user,
    loading,
    tempUser,
    updateUserProfile,
    auth,
  } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  //console.log("Temp userrrrrrrrrrrrrrrrrrrr", tempUser);

  // receving the desiger location
  const pathName = location?.pathname;
  //console.log("location: ", location)
  const search = location?.search;
  //console.log("search: ", search);

  // set the destination into from
  const from = search?.slice(12) || "/";

  console.log("Frommmmmmmmmmmmmmmm", from);

  const [numberUser, setNumberUser] = useState("");
  // loading
  const [loadingState, setLoadingState] = useState(false);

  const getOtp = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    //console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx", number, name);
    setNumberUser(number);
    console.log("number: ", number);
    setError("");

    // those for the user namae update
    const email = tempUser?.email;
    const usersInfo = {
      name,
      email,
      phoneNumber: number,
    };
    setUpdateUserInfo(usersInfo);
    if (number === "" || number === undefined)
      return setError("Please enter a valid phone number!");
    // if (!tempUser?.phoneNumber) {

    // const getCapta = async () => {
    try {
      console.log("numberrrrrrrrrrrrrrrrrrrrrrrr", number);
      const response = await setUpRecaptha(number);
      console.log(
        "responsesssssssssssssssssssssssssssssssssssssssssssss",
        response
      );
      setResult(response);
      console.log("auth: ", auth);
      setFlag(true);
      //console.log("This is the second of opt");
    } catch (err) {
      setError(err);
      console.log("ERRorrrrrrrrrrrrrrrrrr", err);
      // setError("Please, input a valid phone number");
    }
    // };
    // getCapta();

    return;
  };

  const updateUser = () => {
    // navigate(from, { replace: true });

    const displayName = updateUserInfo?.name;
    const phoneNumber = updateUserInfo?.phoneNumber;
    const email = updateUserInfo?.email;
    console.log("it should be the next step");

    if (email && phoneNumber) {
      // xxxxxxxxxxxxxxxxxxxxxxx
      fetch("http://localhost:5000/update-phone", {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ email, phoneNumber, displayName }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("data: ", data);
          if (data?.modifiedCount) {
            // navigate("/login");
            // navigate(`/login?targetPath=${from}`);
            alert("you are successfully verified, login again.");
            //  return  <Navigate to='/login' state={{ from }} replace></Navigate>
            navigate(`/login?targetPath=${from}`);
          } else {
            alert("something went wrong, please login again");
          }
        });
    } else {
      // user need to re verify again
      alert("something went wrong, please login again");
    }
  };
  const verifyOtp = async (e) => {
    e.preventDefault();
    setError("");
    if (otp === "" || otp === null) return;
    try {
      await result.confirm(otp);
      //console.log("SaveUSER::::::", saveUser);
      //console.log("USRData.......", user);
      //navigate("/");
      updateUser();
      // console.log("auth: ", auth)
    } catch (err) {
      console.log("errrorrrr: ", err);
      setError(err);
    }
  };

  const saveUser = (name, email, phone) => {
    const user = { name, email, phone };

    fetch("https://geeks-of-gurukul-server-side.vercel.app/users", {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("data: ", data);
        if (data?.acknowledged) {
          toast.success("Phone verification successful.");
          // setLoading(false);
          navigate(from, { replace: true });
        } else {
          toast.error("Please verify you phone");
        }
        //console.log("save user", data);
      });
  };

  if (loading) {
    return <div>loading</div>;
  }
  return (
    <>
      <div className="col-md-12  mb-5 custom-mergin">
        <div className="box  new-login-from-phone">
          {error && (
            <div className=" border border-red-600 bg-red-300 px-4 py-8">
              {error}
            </div>
          )}
          <form onSubmit={getOtp} style={{ display: !flag ? "block" : "none" }}>
            <div className="single-from-admissionPhone ma-btt">
              <h5 className="mb-3">Full Name</h5>
              <input
                type="text"
                required
                name="name"
                defaultValue={tempUser?.displayName}
              />
            </div>
            <h5 className="mb-3">Phone number</h5>
            <div className="mb-3" controlId="formBasicEmail">
              <PhoneInput
                defaultCountry="IN"
                value={number}
                onChange={setNumber}
                placeholder="Enter Phone Number"
              />
              <div id="recaptcha-container"></div>
            </div>
            <div className="button-right">
              &nbsp;
              <button type="submit" className="btn">
                Continue
              </button>
            </div>
          </form>

          <form
            onSubmit={verifyOtp}
            style={{ display: flag ? "block" : "none" }}
          >
            <h2 className="mb-3">Enter your OTP</h2>
            <div className="mb-3" controlId="formBasicOtp">
              <input
                type="otp"
                className="border-2"
                placeholder="Enter OTP"
                onChange={(e) => setOtp(e.target.value)}
              />
            </div>
            <div className="flex gap-4">
              <Link to="/" className="px-4 py-2 border">
                <button className="text-black">Cancel</button>
              </Link>
              &nbsp;
              <button type="submit" className="px-4 text-black py-2 border">
                Verify
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default PhoneSignUp;
