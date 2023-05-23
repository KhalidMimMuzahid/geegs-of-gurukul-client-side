import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { BsXCircleFill } from "react-icons/bs";
import { AuthContext } from "../../../../../contexts/UserProvider/UserProvider";
import moment from "moment";
import { toast } from "react-hot-toast";

const AddModuleModel = ({
  setAddNewModule,
  program,
  course,
  batch,
  setRefreshModules,
}) => {
  const [loading, setLoading] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const { user } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    if (!program?.program_id) {
      toast.error("Please select the program");
      return;
    } else if (!course?.course_id) {
      toast.error("Please select the course");
      return;
    } else if (!batch?.batch_id) {
      toast.error("Please select the batch");
      return;
    }
    const justNow = moment().format();

    const moduleDetails = {
      moduleName: data.moduleName,
      type: "module",
      program,
      course,
      batch,
      actionsDetails: {
        isDeleted: false,
        creation: {
          createdAt: justNow,
          creatorEmail: user?.email,
        },
        updation: {
          updatedAt: justNow,
          updatorEmail: user?.email,
        },
      },
    };

    fetch(`https://geeks-of-gurukul-server-side.vercel.app/moduleDetails`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(moduleDetails),
    })
      .then((res) => res?.json())
      .then((result) => {
        if (result?.success) {
          setIsSaved(true);
          // setAddNewModule(false);
          toast?.success(result?.message);
          setLoading(false);
          setRefreshModules((prev) => !prev);
        } else {
          toast.error(result?.error);
          setLoading(false);
        }
      })
      .catch((error) => {
        toast.error(error.message);
        setLoading(false);
      });
    // console.log(moduleDetails);
  };
  return (
    <>
      <div className='justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-[20010] outline-none focus:outline-none'>
        <div className='relative w-[350px] h-[200px] sm:w-[400px] md:w-[450px]  py-2 sm:py-4 lg:py-4 px-2 sm:px-4 md:px-6 mx-4 bg-white rounded-lg shadow-2xl'>
          <div className='px-1 pt-2 flex w-full justify-between'>
            <h4 className='font-semibold'>Create New Module</h4>
            <button onClick={() => setAddNewModule(false)}>
              <BsXCircleFill size={25} color='red' />
            </button>
          </div>
          {/* Contents */}
          <div className='w-full mx-auto my-6'>
            <form className='' onSubmit={handleSubmit(onSubmit)}>
              <div className='relative'>
                <div className='w-full'>
                  <input
                    type='text'
                    name='moduleName'
                    required
                    {...register("moduleName")}
                    className='w-full border-2 border-green-400 rounded-xl'
                  />
                </div>

                <div className='w-full flex justify-end mt-2'>
                  <button
                    disabled={loading}
                    type='submit'
                    className='px-2 py-2 bg-green-500 text-white font-poppins font-medium rounded-lg mb-3'
                  >
                    {loading ? "Saving" : isSaved ? "Saved" : "Save"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className='opacity-25 fixed inset-0  z-[20000] bg-black'></div>
    </>
  );
};

export default AddModuleModel;
