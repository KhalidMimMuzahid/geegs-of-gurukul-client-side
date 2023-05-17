import React, { useContext } from "react";
import { AuthContext } from "../../../../contexts/UserProvider/UserProvider";
import { useForm } from "react-hook-form";
import style from "./CreateCoupon.module.css";
import moment from "moment";
import { toast } from "react-hot-toast";

const CreateCoupon = () => {
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
  console.log(user);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    const justNow = moment().format();
    let id = "";
    do {
      const charKey = Math.floor(Math.random() * 70);
      const char = generateKey(charKey);
      id = id.concat(char);
    } while (id?.length !== 20);
    console.log("id: ", id);
    const couponDetails = {
      couponCode: id,
      discount: data?.discount,
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
    console.log(couponDetails);

    fetch("http://localhost:5000/coupon-details", {
      method: "POST",
      body: JSON.stringify(couponDetails),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        toast.success("Coupon Created!");
      })
      .catch((error) => console.error(error));
    console.log(couponDetails);
    reset();
  };

  return (
    <div className='container p-8'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className=' font-poppins font-medium'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            {/* Discount */}
            <div className={style?.createCourse}>
              <label>Discount</label>
              <input
                type='number'
                // required
                name='discount'
                {...register("discount", {
                  required: "Enter discount amount",
                })}
                aria-invalid={errors.discount ? "true" : "false"}
                // onChange={handleInputChange}
              />
              {errors.discount && (
                <p
                  className='text-red-500 font-poppins font-medium'
                  role='alert'
                >
                  {errors.discount?.message}
                </p>
              )}
            </div>
            {/* Discount */}

            {/* Expired At */}
            <div className={style?.createCourse}>
              <label>Expired At</label>
              <input
                // required
                type='datetime-local'
                name='expiredAt'
                // onChange={handleInputChange}
                {...register("expiredAt", {
                  required: "Select an expire date",
                })}
                aria-invalid={errors.expiredAt ? "true" : "false"}
              />
              {errors.expiredAt && (
                <p
                  role='alert'
                  className='text-red-500 font-poppins font-medium'
                >
                  {errors.expiredAt?.message}
                </p>
              )}
            </div>
            {/* Expired At */}
          </div>
        </div>
        {/* Submit Button */}
        <button
          type='submit'
          class='group relative h-12 w-full overflow-hidden rounded-lg bg-white text-lg shadow'
        >
          <div class='absolute inset-0 w-3 bg-green-400 transition-all duration-[250ms] ease-out group-hover:w-full'></div>
          <span class='relative text-black group-hover:text-white font-poppins font-medium'>
            Generaate Coupon
          </span>
        </button>
      </form>
    </div>
  );
};

export default CreateCoupon;
