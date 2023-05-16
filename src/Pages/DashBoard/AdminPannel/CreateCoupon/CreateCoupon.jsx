import React, { useContext } from 'react'
import { AuthContext } from '../../../../contexts/UserProvider/UserProvider';
import { useForm } from 'react-hook-form';
import style from './CreateCoupon.module.css'
import moment from 'moment';

const CreateCoupon = () => {
  const { user } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    const justNow = moment().format();
    const couponDetails = {
      couponCode: '',
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
    reset();
  };
  
  return (
    <div className="container p-8">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className=" font-poppins font-medium">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Discount */}
            <div className={style?.createCourse}>
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
              />
              {errors.discount && (
                <p
                  className="text-red-500 font-poppins font-medium"
                  role="alert"
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
                type="datetime-local"
                name="expiredAt"
                // onChange={handleInputChange}
                {...register("expiredAt", {
                  required: "Select an expire date",
                })}
                aria-invalid={errors.expiredAt ? "true" : "false"}
              />
              {errors.expiredAt && (
                <p
                  role="alert"
                  className="text-red-500 font-poppins font-medium"
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
          type="submit"
          class="group relative h-12 w-full overflow-hidden rounded-lg bg-white text-lg shadow"
        >
          <div class="absolute inset-0 w-3 bg-green-400 transition-all duration-[250ms] ease-out group-hover:w-full"></div>
          <span class="relative text-black group-hover:text-white font-poppins font-medium">
            Generaate Coupon
          </span>
        </button>
      </form>
    </div>
  )
}

export default CreateCoupon