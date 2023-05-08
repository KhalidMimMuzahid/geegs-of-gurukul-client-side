import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { Link, useLocation, useNavigate } from "react-router-dom";
import style from "./Login.module.css";

import {
  AiFillFacebook,
  AiFillGithub,
  AiOutlinePhone,
  tempUser,
} from "react-icons/ai";
import moment from "moment/moment";
import { AuthContext } from "../../contexts/UserProvider/UserProvider";
import isPhoneVerified from "../../utilities/isPhoneVerified/isPhoneVerified";
import checkAlreadyUser from "../../utilities/checkAlreadyUser/checkAlreadyUser";
import ModalForAlert from "../../Components/modalForAlert/ModalForAlert";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm(); // ract hook from
  const {
    signIn,
    googleSignIn,
    FaceboolSignin,
    gitHubSignin,
    setLoading,
    user,
    verifyEmail,
  } = useContext(AuthContext);
  const [signUpError, setSignUPError] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const [ModalForAlertCom, setModalForAlertCom] = useState(null);
  const verifyYourEmail = () => {
    setModalForAlertCom(
      <ModalForAlert
        alertMessage={"Please, check your mail and verify & log in."}
        modalIsOpenTemp={true}
        isForEmailVerification={true}
        setModalForAlertCom={setModalForAlertCom}
      />
    );
  };

  //console.log("Temp userrrrrrrrrrrrrrrrrrrr", tempUser);

  // receving the desiger location
  const pathName = location?.pathname;
  //console.log("location: ", location)
  const search = location?.search;
  //console.log("search: ", search);

  // set the destination into from
  // const from = search?.slice(12) || "/";
  const from = location.state?.from?.pathname || search?.slice(12) || "/";
  //console.log("formmmmmmmmmmmmmmmmmmmmmmmmmmmm:", from)

  useEffect(() => {
    //console.log("userrrrrrrrrrrrrrrr", user);
    if (user?.email) {
      //toast.success("Successfully logged in. 0000000000000000000");
      navigate(from, { replace: true });
    }
  }, [user]);
  const handleSignUp = (data) => {
    //console.log("Handle sign in");
    setSignUPError("");
    signIn(data.email, data.password)
      .then((result) => {
        const user = result.user;

        if (user?.emailVerified) {
          isPhoneVerified(user?.email)
            .then((res) => res.json())
            .then((data) => {
              if (data?.isPhoneVerified) {
                navigate(from, { replace: true });

                // if (user?.email) {
                //   navigate(from, { replace: true });
                // } else {
                //   verifyEmail()
                //     .then(() => {
                //       navigate(`/?targetPath=${from}`);
                //       // alert("Please, check your mail and verify & log in.");
                //       verifyYourEmail()
                //     })
                //     .catch((error) => console.error(error));
                // }
              } else {
                navigate(`/phone-sign-up?targetPath=${from}`);
              }
            });
        } else {
          // alert("Please, verify your mail and login again ");

          verifyEmail()
            .then(() => {
              // alert("Please, check your mail and verify & log in.");
              verifyYourEmail();
            })
            .catch((error) => console.error(error));

          // verifyYourEmail()
        }
      })

      // this is the eerror cathch more check

      .catch((error) => {
        console.log(error);
        console.log("error message", error.message);

        setSignUPError(
          error.message === "Firebase: Error (auth/wrong-password)."
            ? "Please input valid password"
            : error.message === "Firebase: Error (auth/user-not-found)."
            ? "User not found"
            : error.message
        );
      });
  };

  // google sign in handle
  const handleGoogleSignIn = () => {
    setSignUPError("");
    setLoading(true);
    googleSignIn()
      .then((result) => {
        const user = result.user;

        //console.log("Facebook user: ", user);
        checkAlreadyUser(user?.email)
          .then((res) => res.json())
          .then((data) => {
            if (data?.isUserAlreadyExists) {
              // to do : user is alrady reistered
              //console.log("old user")
              //toast.success("Successfully logged in.");

              isPhoneVerified(user?.email)
                .then((res) => res.json())
                .then((data) => {
                  if (data?.isPhoneVerified) {
                    navigate(from, { replace: true });
                  } else {
                    navigate(`/phone-sign-up?targetPath=${from}`);
                  }
                });
            } else {
              // to do : this is the new user
              //console.log("new user")
              const justNow = moment().format();
              const userBasicDetails = {
                justCreated: true,
                name: user?.displayName,
                email: user?.email,
                phoneNumber: "",
                createdAt: justNow,
                updatedAt: justNow,
                emailVaifiedAt: justNow,
                photoURL: user?.photoURL,
                role: "student",
              };
              toast.success("Successfully registered.");
              saveUser(userBasicDetails);
            }
          });
      })
      .catch((error) => {
        // console.error(error);
        // console.log("error.messagessssssssss", error.message);
        setSignUPError(
          error.message === "Firebase: Error (auth/popup-closed-by-user)."
            ? "Auth/Popup has been closed by you"
            : error.message
        );
      });
  };

  const saveUser = (userBasicDetails) => {
    fetch("https://geeks-of-gurukul-server-side.vercel.app/usersbasics", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(userBasicDetails),
    })
      .then((res) => res.json())
      .then((data) => {
        //console.log("save user", data);
        //navigate('/');

        // navigate(from, { replace: true });
        navigate(`/phone-sign-up?targetPath=${from}`);
      });
  };

  return (
    <div className={style.singup}>
      <div className="mt-4 mb-5 ">
        <div className={style.formclass}>
          <div className="md:w-full">
            <div className={style.newloginfrom}>
              <div className={style.titlesing}>
                <Link to={`/signup?targetPath=${from}`}>Sign Up</Link>
                <h2>
                  <Link to={`/login?targetPath=${from}`}>Sign in</Link>
                </h2>
              </div>
              <div className="google-sing-in">
                <div className="border rounded-2xl bg-gray-300 my-2">
                  <button
                    className="flex py-2 justify-center  gap-4 items-center"
                    onClick={handleGoogleSignIn}
                    style={{ width: "100%", borderRadius: "30px" }}
                  >
                    <FcGoogle />
                    <span className="text-black">CONTINUE WITH GOOGLE</span>
                  </button>
                </div>

                <p className={style?.formText}>Continue with your accout </p>
                <form onSubmit={handleSubmit(handleSignUp)}>
                  <div className={style?.formBoxSing}>
                    <div className={style.fromboxinput}>
                      <input
                        type="email"
                        name="email"
                        //onChange={(e) => setUser(e.target.value)}
                        placeholder="Email Address"
                        {...register("email", {})}
                      />
                    </div>
                    {errors.email && (
                      <p className="text-red-500">{errors.email.message}</p>
                    )}

                    <div className={style.fromboxinput}>
                      <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        {...register("password", {})}
                      />
                    </div>
                    {errors.password && (
                      <p className="text-red-500">{errors.password.message}</p>
                    )}

                    <Link to="/forget-pass">
                      <p className={style?.formText}>Forget Your Password?</p>
                    </Link>

                    <div className={style.singupsubmit}>
                      <button type="submit">SIGN IN</button>
                    </div>
                    {signUpError && (
                      <p className="text-red-500-pass">{signUpError}</p>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      {ModalForAlertCom}
    </div>
  );
};

export default Login;
