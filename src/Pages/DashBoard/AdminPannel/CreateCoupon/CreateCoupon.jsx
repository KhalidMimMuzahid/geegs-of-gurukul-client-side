import React, { useContext, useRef, useState } from "react";
import { AuthContext } from "../../../../contexts/UserProvider/UserProvider";
import { useForm } from "react-hook-form";
import style from "./CreateCoupon.module.css";
import moment from "moment";
import { toast } from "react-hot-toast";

const CreateCoupon = () => {
  const inputStyle =
  "border-[#D0D5DD] hover:border-[#4BA25D] hover:shadow hover:shadow-[#4BA25D] focus:border-[#4BA25D] focus:shadow focus:shadow-[#4BA25D] focus:ring-0 duration-200 rounded-lg w-full mt-1";
  const [generating, setGenerating] = useState(false);
  const [couponInfo, setCouponInfo] = useState(null);
  const [isCopied, setIsCopied] = useState(false);
  const generateKey = (charKey) => {
    if (charKey < 10) {
      return charKey;
    } else {
      switch (charKey) {
        case 10:
          return "a";

        case 11:
          return "b";

        case 12:
          return "c";

        case 13:
          return "d";

        case 14:
          return "e";

        case 15:
          return "f";

        case 16:
          return "g";

        case 17:
          return "h";

        case 18:
          return "i";

        case 19:
          return "j";

        case 20:
          return "k";

        case 21:
          return "l";

        case 22:
          return "m";

        case 23:
          return "n";

        case 24:
          return "o";

        case 25:
          return "p";

        case 26:
          return "q";

        case 27:
          return "r";

        case 28:
          return "s";

        case 29:
          return "t";

        case 30:
          return "u";

        case 31:
          return "v";

        case 32:
          return "w";

        case 33:
          return "x";

        case 34:
          return "y";

        case 35:
          return "z";

        case 36:
          return "A";

        case 37:
          return "B";

        case 38:
          return "C";

        case 39:
          return "D";

        case 40:
          return "E";

        case 41:
          return "F";

        case 42:
          return "G";

        case 43:
          return "H";

        case 44:
          return "I";

        case 45:
          return "J";

        case 46:
          return "K";

        case 47:
          return "L";

        case 48:
          return "M";

        case 49:
          return "N";

        case 50:
          return "O";

        case 51:
          return "P";

        case 52:
          return "Q";

        case 53:
          return "R";

        case 54:
          return "S";

        case 55:
          return "T";

        case 56:
          return "U";

        case 57:
          return "V";

        case 58:
          return "W";

        case 59:
          return "X";

        case 60:
          return "Y";

        case 61:
          return "Z";

        case 62:
          return "@";

        case 63:
          return "#";

        case 64:
          return "$";

        case 65:
          return "%";

        case 66:
          return "^";

        case 67:
          return "&";

        case 68:
          return "*";

        case 69:
          return "!";

        default:
          return;
        // code block
      }
    }
  };

  const { user } = useContext(AuthContext);
  // console.log(user);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    setGenerating(true);
    const justNow = moment().format();
    let id = "";
    const discountAmount = parseInt(data.discount);
    // console.log(typeof discountAmount)

    do {
      const charKey = Math.floor(Math.random() * 70);
      const char = generateKey(charKey);
      id = id.concat(char);
    } while (id?.length !== 20);
    // console.log("id: ", id);
    const couponDetails = {
      couponLabel: data.couponLebel,
      couponCode: id,
      discount: discountAmount,
      expireAt: data?.expiredAt,

      actionsDetails: {
        isDeleted: false,
        creation: {
          createdAt: justNow,
          creatorEmail: user.email,
        },
        updation: {
          updatedAt: justNow,
          updaterEmail: user.email,
        },
      },
    };
    // console.log(couponDetails);
    setCouponInfo(couponDetails);
    console.log(couponInfo);
    fetch("https://api.geeksofgurukul.com/api/v1/coupons/coupon-details", {
      method: "POST",
      body: JSON.stringify(couponDetails),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setGenerating(false);
        console.log(data);
        toast.success("Coupon Created!");
      })
      .catch((error) => console.error(error));
    console.log(couponDetails);
    reset();
  };

  // copy preview text

  const htmlElement = useRef(null);

  const handleCopy = () => {
    const htmlText = htmlElement.current.innerHTML;
    navigator.clipboard.writeText(htmlText);
    setIsCopied(true);
    toast.success("Coppied!");
    // setIsCopied(false)
  };

  return (
    <div className="container p-8">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className=" font-poppins font-medium">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Label */}
            <div>
              <label>Coupon Label</label>
              <input
                type="text"
                // required
                name="couponLebel"
                {...register("couponLebel", {
                  required: "Enter Coupon Name",
                })}
                aria-invalid={errors.couponLebel ? "true" : "false"}
                className={`${inputStyle} input border-[#5FB370]`}
                // onChange={handleInputChange}
              />
              {errors.couponLebel && (
                <p style={{color:'red', fontSize:'14px'}}
                  className="text-red-500 font-poppins font-medium"
                  role="alert"
                >
                  {errors.couponLebel?.message}
                </p>
              )}
            </div>
            {/* Discount */}
            {/* Discount */}
            <div>
              <label>Discount</label>
              <input
                type="number"
                // required
                name="discount"
                {...register("discount", {
                  required: "Enter discount amount",
                })}
                aria-invalid={errors.discount ? "true" : "false"}
                // onChange={handleInputChange}
                className={`${inputStyle} input border-[#5FB370]`}
              />
              {errors.discount && (
                <p style={{color:'red', fontSize:'14px'}}
                className="text-red-500 font-poppins font-medium"
                role="alert"
              >
                  {errors.discount?.message}
                </p>
              )}
            </div>
            {/* Discount */}

            {/* Expired At */}
            <div>
              <label>Expired At</label>
              <input
                // required
                type="datetime-local"
                name="expiredAt"
                // onChange={handleInputChange}
                {...register("expiredAt", {
                  required: "Select an expire date",
                })}
                aria-invalid={errors.expiredAt ? "true" : "false"}
                className={`${inputStyle} input border-[#5FB370]`}
              />
              {errors.expiredAt && (
                <p style={{color:'red', fontSize:'14px'}}
                className="text-red-500 font-poppins font-medium"
                role="alert"
              >
                  {errors.expiredAt?.message}
                </p>
              )}
            </div>
            {/* Expired At */}
          </div>
          {/* Preview */}
          <div className={style?.createCourse}>
            <div className="flex items-center justify-between p-1">
              <label>Preview</label>{" "}
              <button
                onClick={handleCopy}
                className=" px-2 py-2 bg-green-400 text-white text-center"
              >
                {isCopied ? "Copied" : "Copy"}
              </button>
            </div>
            <div class="w-full">
              <textarea
                disabled
                class={`border textarea border-gray-300 rounded-lg p-1 w-full h-32 resize-none col-span-12 overflow-y-auto`}
                readOnly
                ref={htmlElement}
                defaultValue={`
                Coupon Info :
                  Coupon Label : ${couponInfo?.couponLabel},
                  Coupon Code : ${couponInfo?.couponCode},
                  Expire At : ${couponInfo?.expireAt},
                  Discount : ${couponInfo?.expireAt},
                  Creator Email : ${couponInfo?.actionsDetails?.creation?.creatorEmail}
              `}
              ></textarea>
            </div>
          </div>
          {/* Preview */}
        </div>
        {/* Submit Button */}
        <div className="w-full flex items-center justify-center">
        <button
          type="submit"
          class="group relative h-12 w-full md:w-60 overflow-hidden rounded-lg bg-white text-lg shadow my-3"
        >
          <div class="absolute inset-0 w-3 bg-green-400 transition-all duration-[250ms] ease-out group-hover:w-full"></div>
          <span class="relative text-black group-hover:text-white font-poppins font-medium">
            {generating ? `Generating` : `Generate Coupon`}
          </span>
        </button>
        </div>
      </form>
    </div>
  );
};

export default CreateCoupon;
