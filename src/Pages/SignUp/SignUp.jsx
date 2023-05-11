import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { AuthContext } from "../../contexts/UserProvider/UserProvider";
import style from "./SignUp.module.css";

import {
  AiOutlineEyeInvisible,
  AiOutlineEye,
  AiFillFacebook,
  AiFillGithub,
  AiOutlinePhone,
} from "react-icons/ai";
import moment from "moment";
import checkAlreadyUser from "../../utilities/checkAlreadyUser/checkAlreadyUser";
import isPhoneVerified from "../../utilities/isPhoneVerified/isPhoneVerified";
import ModalForAlert from "../../Components/modalForAlert/ModalForAlert";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm(); // ract hook from
  const {
    createUser,
    updateUserProfile,
    verifyEmail,
    googleSignIn,
    FaceboolSignin,
    gitHubSignin,
    setLoading,
    auth,
    setUpRecaptha,
  } = useContext(AuthContext);
  const [signUpError, setSignUPError] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  // for hide and show pass
  const [showPassword, setShowPassword] = useState(false);

  // receving the desiger location
  const pathName = location?.pathname;
  //console.log("location: ", location);
  const search = location?.search;
  //console.log("search: ", search);

  // set the destination into from
  const [ModalForAlertCom, setModalForAlertCom] = useState(null);
  const verifyYourEmail = (link) => {
    setModalForAlertCom(
      <ModalForAlert
        alertMessage={"Please, check your mail and verify & log in."}
        modalIsOpenTemp={true}
        isForEmailVerification={true}
        setModalForAlertCom={setModalForAlertCom}
        link={link}
      />
    );
  };

  const from = location.state?.from?.pathname || search?.slice(12) || "/";

  // console.log("Fommmmmmmmmmmmmmmmmm", from);

  const handleSignUp = (data) => {
    console.log(data);
    setSignUPError("");

    // for the password cheack
    if (data.password !== data.passwordConfirm) {
      return setSignUPError("Password did not matched!");
    }

    createUser(data.email, data.password)
      .then((result) => {
        const user = result.user;
        //console.log("USRr friom sign uppppppppppppppppppppp",user);
        // const userInfo = {
        //   displayName: data.name,
        //   phoneNumber: data.phone,
        // };
        // console.log("USer info0000000000000000000", userInfo);

        // to do user info updated into firebase
        // toast.success("Please verify your email address before login.");
        //console.log("USer updatedddddddddddddddddddddddddddddd")
        updateUserProfile({ displayName: data.name })
          .then(() => {
            // Profile updated!
            // ...
            verifyEmail()
              .then(() => {
                const justNow = moment().format();
                const userBasicDetails = {
                  justCreated: true,
                  name: data.name,
                  email: user?.email,
                  phoneNumber: "",
                  createdAt: justNow,
                  updatedAt: justNow,
                  photoURL: user?.photoURL,
                  role: "student",
                };
                //console.log("User basic detailsssssssssssssssssssssss",userBasicDetails)

                saveUser(userBasicDetails);
                // alert("Please, check your mail and verify & log in.");
                // verifyYourEmail()
              })
              .catch((error) => console.error(error));
          })
          .catch((error) => {
            // An error occurred
            // ...
          });

        setLoading(false);
        // navigate(`/signup/phone-sign-up?targetPath=${from}`);

        // .then(() => {
        //console.log("Save Use: ", userInfo);
        //saveUser(data.name, data.email, data.phone);

        //navigate("/signup/auto-name-fill");
        // })
        // .catch((err) => console.log(err));
      })
      .catch((error) => {
        // console.log(error);
        // console.log("error.messageeeeee", error.message);
        setSignUPError(
          error.message === "Firebase: Error (auth/email-already-in-use)."
            ? "This Email is already in use"
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
              toast.success("Successfully logged in.");

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
              saveUserForGoogle(userBasicDetails);
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

  // email verification send
  const handleEmailVerification = () => {
    verifyEmail();
    // .than(() => {})
    // .catch(error => console.error(error));
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

        verifyYourEmail(`/phone-sign-up?targetPath=${from}`);

        // navigate(`/phone-sign-up?targetPath=${from}`);
      });
  };
  const saveUserForGoogle = (userBasicDetails) => {
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

        // verifyYourEmail(`/phone-sign-up?targetPath=${from}`);

        navigate(`/phone-sign-up?targetPath=${from}`);
      });
  };

  return (
    <div className={style?.singup}>
      <div className="mt-4 mb-5 ">
        <div className={style?.formclass}>
          {/* ----------------------------start resgistration from  =-----------------------------*/}
          <div className="md:w-full">
            <div className={style?.newloginfrom}>
              <div className={style?.titlesing}>
                <h2>
                  <Link to={`/signup?targetPath=${from}`}>Sign Up</Link>
                </h2>
                <Link to={`/login?targetPath=${from}`}>Sign in</Link>
              </div>
              <div className={style.googlesingin}>
                <div className={`${style.textcenter} ${style.googelIcon}`}>
                <div className="font-poppins font-normal">
                  <button
                    className="flex py-2 justify-center  gap-4 items-center border border-black rounded-2xl my-2 bg-white text-black hover:bg-black hover:text-white"
                    onClick={handleGoogleSignIn}
                    style={{ width: "100%", borderRadius: "30px" }}
                  >
                    <FcGoogle />
                    <span>CONTINUE WITH GOOGLE</span>
                  </button>
                </div>
                </div>
                <p style={{ marginTop: "-20px", fontSize: "12px" }}>
                  Or use your Email and Mobile Number for registration{" "}
                </p>
                <form onSubmit={handleSubmit(handleSignUp)}>
                  <div className={style.fromboxsing}>
                    <div className={style.fromboxinput}>
                      <input
                        type="text"
                        name="name"
                        placeholder="Full Name"
                        {...register("name", {
                          required: "Name is Required",
                        })}
                      />
                    </div>
                    {errors.name && (
                      <p className="text-red-500">{errors.name.message}</p>
                    )}
                    <div className={style.fromboxinput}>
                      <input
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        {...register("email", {
                          required: "Email is Requried",
                        })}
                      />
                    </div>
                    {errors.email && (
                      <p className="text-red-500">{errors.email.message}</p>
                    )}
                    {/* <div className="from-box-input">
                      <input
                        type="text"
                        placeholder="Mobile Number"
                        name="phone"
                        {...register("phone", {
                          required: "Phone is Requried",
                          pattern: {
                            value: /^(0|91)?[6-9][0-9]{9}$/,
                            message: "Please provide valid phone number",
                          },
                        })}
                      />
                    </div> */}
                    {/* {errors.phone && (
                      <p className="text-red-500">{errors.phone.message}</p>
                    )} */}
                    <div className={style.fromboxinput}>
                      <div className={style.passfild}>
                        <input
                          type={showPassword ? "text" : "password"}
                          name="password"
                          placeholder="Password"
                          {...register("password", {
                            required: "Password is required",
                            minLength: {
                              value: 6,
                              message: "Password must be 6 characters long",
                            },
                            pattern: {
                              value: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])/,
                              message:
                                "Password must have uppercase, number and special characters",
                            },
                          })}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <AiOutlineEyeInvisible />
                          ) : (
                            <AiOutlineEye />
                          )}
                        </button>
                      </div>
                    </div>
                    {errors.password && (
                      <p className="text-red-500">{errors.password.message}</p>
                    )}
                    <div className={style.fromboxinput}>
                      <div className={style.passfild}>
                        <input
                          type={showPassword ? "text" : "password"}
                          name="passwordConfirm"
                          placeholder="Confirm Password"
                          {...register("passwordConfirm", {
                            required: "Confirm Password is Requried",
                          })}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <AiOutlineEyeInvisible />
                          ) : (
                            <AiOutlineEye />
                          )}
                        </button>
                      </div>
                    </div>
                    {errors.passwordConfirm && (
                      <p className="text-red-500">
                        {errors.passwordConfirm.message}
                      </p>
                    )}
                    <div className={style.singupsubmit}>
                      <button type="submit">SIGN UP</button>
                    </div>
                    {signUpError && (
                      <p className="text-red-500-pass">{signUpError}</p>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>
          {/* --------------------------end rgitration from---------------------  */}
        </div>
      </div>
      {ModalForAlertCom}
    </div>
  );
};

export default SignUp;
