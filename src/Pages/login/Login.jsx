import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { Link, useLocation, useNavigate } from "react-router-dom";

import "./Login.css";

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
      toast.success("Successfully logged in.");
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
                if (user?.email) {
                  navigate(from, { replace: true });
                } else {
                  verifyEmail()
                    .then(() => {
                      navigate(`/login?targetPath=${from}`);
                      alert("Please, check your mail and verify & log in.");
                    })
                    .catch((error) => console.error(error));
                }
              } else {
                navigate(`/phone-sign-up?targetPath=${from}`);
              }
            });
        } else {
          alert("Please, verify your mail and login again ");
        }
      })

      .catch((error) => {
        console.log(error);
        setSignUPError(error.message);
      });
  };

  // google sign in handle
  const handleGoogleSignIn = () => {
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
        // saveUser(user.displayName, user.email);
        //navigate(from, { replace: true });

        // if (user?.phoneNumber) {
        //   navigate(from, { replace: true });
        // } else {
        //   console.log("before")
        //   // setLoading(true)
        //   navigate(`/login/phone-sign-up?targetPath=${from}`);
        // }
        //console.log(user);
        // saveUser(user.displayName, user.email);
        // toast.success('Successfully logged in');
        // setLoading(false)
        // // checking the phone is verified or not
        // fetch(`https://geeks-of-gurukul-server-side.vercel.app/userinfoforphone/${user.email}`)
        // .then(res => res.json())
        // .then(data =>{
        //     // setusername(data) ;
        //     // setLoading(false)
        //     console.log(data);
        //     if(data.status === 200) {
        //       navigate(from, { replace: true });
        //     } else{
        //       navigate(`/login/phone-sign-up?targetPath=${from}`);
        //     }
        // } )

        // //navigate(from, { replace: true });
        // navigate("/login/phone-sign-up");
      })
      .catch((error) => console.error(error));
  };

  // for facebook signin
  const handleFaceboolSignin = () => {
    FaceboolSignin()
      .then((result) => {
        const user = result.user;
        //console.log("Facebook user: ", user);
        saveUser(user.displayName, user.email);
        toast.success("Successfully logged in");
        setLoading(false);
        // checking the phone is verified or not
        fetch(
          `https://geeks-of-gurukul-server-side.vercel.app/userinfoforphone/${user.email}`
        )
          .then((res) => res.json())
          .then((data) => {
            // setusername(data) ;
            // setLoading(false)
            console.log(data);
            if (data.status === 200) {
              navigate(from, { replace: true });
            } else {
              navigate(`/phone-sign-up?targetPath=${from}`);
            }
          });
        // //navigate(from, { replace: true });
        // navigate("/login/phone-sign-up");
      })
      .catch((error) => console.error(error));
  };

  // for GitHub signin
  const handlegitHubSignin = () => {
    gitHubSignin()
      .then((result) => {
        const user = result.user;
        //console.log("GitHub User ", user);
        //saveUser(user.displayName, user.email);
        setLoading(false);
        //toast.success("Successfully logged in");
        //navigate(from, { replace: true });
        navigate("/login/phone-sign-up");
      })
      .catch((error) => console.error(error));
  };

  const saveUser = (userBasicDetails) => {
    fetch("http://localhost:5000/usersbasics", {
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
    <div className="sing-up">
      <div className="mt-4 mb-5 ">
        <div className="form-class ">
          <div className="col-md-12">
            <div className="new-login-from">
              <div className="title-sing">
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
                <div className="border rounded-2xl bg-blue-500 my-2">
                  <button
                    className="flex py-2 justify-center  gap-4 items-center"
                    onClick={handleFaceboolSignin}
                    style={{ width: "100%", borderRadius: "30px" }}
                  >
                    <AiFillFacebook />
                    <span className="text-black">CONTINUE WITH FACEBOOK</span>
                  </button>
                </div>
                {/* <div className='button-google-custom'>
                  <button className="btn-customize btn-github btn btn-outline" onClick={handlegitHubSignin} style={{ width: "100%", borderRadius: "30px" }}>
                    <AiFillGithub /> <span>CONTINUE WITH GITHUB</span>
                  </button>
                </div> */}
                {/* <div className='button-google-custom'>
                    <Link to='phone-sign-up'>
                    <button className="btn-customize btn-phone btn btn-outline"  style={{ width: "100%", borderRadius: "30px" }}>
                      <AiOutlinePhone /> <span>CONTINUE WITH PHONE</span>
                    </button>
                    </Link>
                </div> */}
                <p className="form-text">Continue with your accout </p>
                <form onSubmit={handleSubmit(handleSignUp)}>
                  <div className="from-box-sing">
                    <div className="from-box-input">
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

                    <div className="from-box-input">
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
                      <p className=" form-text">Forget Your Password?</p>
                    </Link>

                    <div className="sing-up-submit">
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
    </div>
  );
};

export default Login;
