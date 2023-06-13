import { City, Country, State } from "country-state-city";
import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { uploadFile } from "react-s3";
import { AuthContext } from "../../../../../contexts/UserProvider/UserProvider";
window.Buffer = window.Buffer || require("buffer").Buffer;
const config = {
  bucketName: "all-files-for-gog",
  dirName: "assets/any-types",
  region: "ap-south-1",
  accessKeyId: process.env.REACT_APP_S3AccessKeyId,
  secretAccessKey: process.env.REACT_APP_S3SecretAccessKey,
};

const EditingMode = ({ setIsEditing }) => {
  const { user, setShouldRefreshUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(user?.photoURL);
  // get country
  let countryData = Country.getAllCountries();
  const [country, setCountry] = useState(
    countryData.find(
      (country) => country.name === user?.profession?.address?.country
    )
  );
  // get state
  let stateData = State.getStatesOfCountry(country?.isoCode);
  const [state, setState] = useState(
    stateData.find((ech) => ech.name === user?.profession?.address?.state)
  );

  // get city
  const cityData = City.getCitiesOfState(country?.isoCode, state?.isoCode);
  const [city, setCity] = useState(user?.profession?.city);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();

  console.log("first", user);
  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      if (value?.photoURL[0]) {
        const file = value?.photoURL[0];
        setImage(URL.createObjectURL(file));
        console.log(file);
      }
      // country data set
      if (name === "country") {
        countryData?.forEach((each) => {
          if (each?.name === value?.country) {
            setCountry({
              country: each?.name,
              isoCode: each?.isoCode,
            });
            return;
          }
        });
      }

      // state data set
      if (name === "state") {
        stateData?.forEach((each) => {
          if (each?.name === value?.state) {
            setState({
              state: each?.name,
              isoCode: each?.isoCode,
            });
            return;
          }
        });
      }
      if (name === "city") {
        setCity(value?.city);
      }
      if (name === "currentlyStudy") {
        console.log(value?.currentlyStudy);
      }
      return;
    });
    return () => subscription.unsubscribe();
  });

  const onSubmit = (data) => {
    setLoading(true);
    if (data?.photoURL[0]) {
      const file = data?.photoURL[0];
      uploadFile(file, config)
        .then((fileData) => {
          const updatedUser = {
            name: data?.name,
            photoURL: fileData?.location,
            address: {
              country: data?.country,
              state: data?.state,
              city: data?.city,
            },
          };
          setImage(fileData?.location);
          userProfileUpdate(updatedUser);
          console.log("fileData", fileData);
        })
        .catch((err) => {
          toast.error(err?.message);
          setLoading(false);
        });
    } else {
      const updatedUser = {
        name: data?.name,
        address: {
          country: data?.country,
          state: data?.state,
          city: data?.city,
        },
      };
      userProfileUpdate(updatedUser);
    }
  };

  const userProfileUpdate = (updatedUser) => {
    // return;
    fetch(
      `https://api.geeksofgurukul.com/api/v1/users/edit-user/${user?.email}`,
      {
        method: "PUT",
        body: JSON.stringify(updatedUser),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data?.success) {
          toast.success(data?.message);
          console.log(data);
          setLoading(false);
          setShouldRefreshUser((prev) => !prev);
          setIsEditing(false);
          reset();
        } else {
          toast.error(data?.message);
          setLoading(false);
        }
      })
      .catch((error) => {
        console.error(error);

        setLoading(false);
      });
  };

  return (
    <>
      <div className="container">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="font-poppins font-medium">
            <div className="flex flex-col justify-center mb-5">
              <img
                src={image}
                className="h-36 w-36 rounded-full border-2 border-green-400 shadow-lg"
                alt=""
              />
              <div className="relative my-4">
                <button className="px-4 py-2 bg-green-500 text-white">
                  Upload Image
                </button>
                <input
                  type="file"
                  name="photoURL"
                  {...register("photoURL")}
                  id=""
                  className="absolute top-0 left-0 opacity-0"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="assesmentList">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  name="Name"
                  defaultValue={user?.name}
                  {...register("name")}
                  placeholder="Write name"
                />
              </div>
              <div className="assesmentList">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  name="email"
                  value={user?.email}
                  readOnly
                  {...register("email")}
                  nonce=""
                  placeholder="Email address in required"
                />
              </div>
              <div className="assesmentList">
                <label htmlFor="phoneNumber">Phone Number</label>
                <input
                  type="phone"
                  name="phoneNumber"
                  defaultValue={user?.phoneNumber}
                  readOnly
                  {...register("phoneNumber")}
                  placeholder="Write Phone Number"
                />
              </div>
              <div className="w-full mb-4">
                <label htmlFor="country">Country</label>
                <select
                  id="country"
                  {...register("country")}
                  defaultValue={user?.address?.country}
                  className="p-2 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
                >
                  <option disabled selected>
                    Select Country
                  </option>
                  {countryData?.length > 0 &&
                    countryData?.map((country, index) => (
                      <option key={index} value={country?.name}>
                        {country?.name}
                      </option>
                    ))}
                </select>
              </div>
              <div className="w-full mb-4">
                <label htmlFor="state">State</label>
                <select
                  id="state"
                  defaultValue={user.address?.state}
                  {...register("state")}
                  className="p-2 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
                >
                  <option disabled selected>
                    Select State
                  </option>
                  {stateData.length > 0 &&
                    stateData?.map((state, index) => (
                      <option key={index} value={state.name}>
                        {state?.name}
                      </option>
                    ))}
                </select>
              </div>
              <div className="w-full mb-4">
                <label htmlFor="city">City</label>
                <select
                  id="city"
                  defaultValue={user?.address?.city}
                  {...register("city")}
                  className="p-2 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
                >
                  <option disabled selected>
                    Select City
                  </option>
                  {cityData?.length > 0 &&
                    cityData?.map((city, index) => (
                      <option key={index} value={city?.name}>
                        {city?.name}
                      </option>
                    ))}
                </select>
              </div>

              <div className="flex gap-4">
                <div className="">
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-10 py-3
                text-white hover:text-green-500
                bg-green-500 hover:bg-white
                border-green-500 rounded-lg border-4
                transition-all duration-300"
                  >
                    {loading ? "Saving..." : "Save"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditingMode;
