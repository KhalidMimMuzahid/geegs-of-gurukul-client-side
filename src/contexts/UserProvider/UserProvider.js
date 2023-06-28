import React, { createContext, useEffect, useState } from "react";
import {
  confirmPasswordReset,
  createUserWithEmailAndPassword,
  FacebookAuthProvider,
  getAuth,
  GithubAuthProvider,
  GoogleAuthProvider,
  onAuthStateChanged,
  RecaptchaVerifier,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPhoneNumber,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import isPhoneVerified from "../../utilities/isPhoneVerified/isPhoneVerified";
import app from "../../firebase/firebase.init";

export const AuthContext = createContext();
const auth = getAuth(app);

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [shouldRefreshUser, setShouldRefreshUser] = useState(false);
  const [updateUser, setUpdateUser] = useState(null);
  const [justCreatedUser, setJustCreatedUser] = useState(false);

  useEffect(() => {
    if (updateUser?.email) {
      fetch(
        `https://api.geeksofgurukul.com/api/v1/users/userinfo/${updateUser?.email}`
      )
        .then((res) => res.json())
        .then((user) => {
          if (user?.email) {
            setUser(user);
            setJustCreatedUser(user?.justCreated);
            console.log("xxxxxxxxxxxxxxxxxxxxx");
            setLoading(false);
          } else {
            setLoading(false);
          }
        });
    }
  }, [updateUser, shouldRefreshUser]);
  // for the auth user verify
  const [tempUser, setTempUser] = useState(null);

  // is admin
  const [adminPart, setadmin] = useState(false);

  // loading
  const [loading, setLoading] = useState(true);

  // Providers
  const googleProvider = new GoogleAuthProvider();
  const facebookProvide = new FacebookAuthProvider();
  const gitHubProvide = new GithubAuthProvider();

  // OTP login
  function setUpRecaptha(number) {
    console.log("number frrom auth: ", number);
    const recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      {},
      auth
    );
    recaptchaVerifier.render();
    return signInWithPhoneNumber(auth, number, recaptchaVerifier);
  }

  // Gitbub log in
  const gitHubSignin = () => {
    setLoading(true);
    return signInWithPopup(auth, gitHubProvide);
  };
  // focebook log in
  const FaceboolSignin = () => {
    setLoading(true);
    return signInWithPopup(auth, facebookProvide);
  };

  // google sign in
  const googleSignIn = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  // signUp with eamil and password
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // login with eamil and password
  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // for reset password email
  const sendResetPassword = (email) => {
    setLoading(true);
    return sendPasswordResetEmail(auth, email);
  };

  const confirmPassword = (oobCode, password) => {
    setLoading(true);
    return confirmPasswordReset(auth, oobCode, password);
  };

  // for logOut
  const logOut = () => {
    return signOut(auth);
  };

  // for update the auth
  const updateUserProfile = (profile) => {
    // setLoading(true)
    // console.log("auth.currentUser: ", auth.currentUser)
    // console.log("temp usr: ", tempUser); // not phone
    // console.log(
    //   "profileeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
    //   profile
    // ); // not eamil
    return updateProfile(auth.currentUser, profile);
  };

  const verifyEmail = () => {
    return sendEmailVerification(auth.currentUser);
  };

  // authe state chane monitor
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log("current:", currentUser);
      if (currentUser?.emailVerified && currentUser?.email) {
        isPhoneVerified(currentUser?.email)
          .then((res) => res.json())
          .then((data) => {
            if (data?.isPhoneVerified) {
              setUpdateUser(currentUser);
            } else {
              setLoading(false);
            }
          });
      } else {
        setUser(null);
        setLoading(false);
      }
      if (currentUser?.email) {
        setTempUser(currentUser);
      }
    });
    return () => unsubscribe();
  });

  const authInfo = {
    user,
    googleSignIn,
    createUser,
    signIn,
    logOut,
    updateUserProfile,
    sendResetPassword,
    confirmPassword,
    FaceboolSignin,
    gitHubSignin,
    loading,
    setLoading,
    setadmin,
    adminPart,
    auth,
    setUpRecaptha,
    verifyEmail,
    tempUser,
    justCreatedUser,
    setJustCreatedUser,
    setUser,
    setShouldRefreshUser,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default UserProvider;
