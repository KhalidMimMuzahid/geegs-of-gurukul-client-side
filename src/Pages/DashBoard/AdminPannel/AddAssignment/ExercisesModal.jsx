import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { BsXCircleFill } from "react-icons/bs";
import { MdAdd } from "react-icons/md";
import { BsFillPlusCircleFill } from "react-icons/bs";
import TableLoader from "./Loader/TableLoader";

const ExercisesModal = ({ setExercisesModal, setExercisesId, exercisesId }) => {
  const { register, handleSubmit, reset } = useForm();
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);

  // console.log(items);

  const onSubmit = (data) => {
    console.log("data :", data);
    // setLoading(true);
    fetch(`http://localhost:5000/exerciseSearch`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        data: JSON.stringify(data),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        if (result?.success) {
          const data = result?.data;
          console.log("first", data);
          setItems(data);
          setLoading(false);
        } else {
          toast.error(result?.message);
          setLoading(false);
        }
      })
      .catch((err) => {
        toast.error(err.message);
        setLoading(false);
      });
  };

  const handelToAddItem = (id) => {
    setExercisesId([...exercisesId, id]);
    setItems(items);
    // console.log(id);
  };

  const handelToRemoveItem = (id) => {
    const frr = exercisesId?.filter((arr) => arr !== id);
    setExercisesId(frr);
    setItems(items);
  };
  console.log(exercisesId);
  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-hidden fixed inset-0 z-[20010] outline-none focus:outline-none h-100 mx-4">
        <div className="relative w-full h-[600px] sm:w-[500px] md:w-[750px] lg:w-[900px]  py-2 sm:py-4 lg:py-4 px-2 sm:px-4 md:px-6 mx-4 bg-white rounded-lg shadow-2xl">
          <div className="px-2 pt-2 flex w-full justify-between">
            <h3 className="font-semibold">Add exercises</h3>
            <button
              onClick={() => setExercisesModal(false)}
              className="hover:rotate-90 transition-all duration-500"
            >
              <BsXCircleFill color="red" size={25} />
            </button>
          </div>
          {/* Content */}
          <div className="px-2 w-full mx-auto my-6">
            {/* form */}
            <form
              className="grid grid-cols-1 md:grid-cols-2 gap-2"
              onSubmit={handleSubmit(onSubmit)}
            >
              <input
                type="search"
                {...register("exerciseName")}
                id="search"
                placeholder="search exercises..."
                className="p-2 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
              />

              <input
                type="search"
                id="topic"
                {...register("topic")}
                placeholder="Topic "
                className="p-2 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
              />

              <input
                type="search"
                id="subTopic"
                {...register("subTopic")}
                placeholder="Sub Topic "
                className="p-2 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
              />

              <select
                id="type"
                {...register("type")}
                className="p-2 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
              >
                <option value="project">project</option>
                <option value="evaluation">evaluation</option>
                {/* <option value="assignments">Assignments</option> */}
              </select>
              <button
                type="submit"
                className="bg-green-400 rounded-lg text-white hover:bg-green-500 py-2 md:col-span-2"
              >
                {loading ? "Loading" : "Search"}
              </button>
            </form>
            {/* Form */}

            {/* Table */}
            <p className="text-sm mt-5">Selected: {exercisesId.length}</p>
            <div className="flex flex-col w-full h-80">
              <div className="overflow-x-auto overflow-y-auto">
                <div className="py-2 align-middle inline-block min-w-full">
                  <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th
                            scope="col"
                            className="px-6 py-2 text-left text-xs font-medium text-gray-500 tracking-wider"
                          >
                            Exercise Name
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-2 text-left text-xs font-medium text-gray-500 tracking-wider"
                          >
                            Topic
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-2 text-left text-xs font-medium text-gray-500 tracking-wider"
                          >
                            Sub Topic
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-2 text-left text-xs font-medium text-gray-500 tracking-wider"
                          >
                            Type
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-2 text-left text-xs font-medium text-gray-500 tracking-wider"
                          >
                            Add/remove
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {loading ? (
                          <TableLoader />
                        ) : (
                          items.map((item, index) => (
                            <tr key={index}>
                              <td
                                scope="row"
                                className="px-6 py-3 whitespace-nowrap"
                              >
                                <div className="text-sm font-medium text-gray-900">
                                  {item?.exerciseName}
                                </div>
                              </td>
                              <td
                                scope="row"
                                className="px-6 py-3 whitespace-nowrap"
                              >
                                <div className="text-sm font-medium text-gray-900">
                                  {item?.topic}
                                </div>
                              </td>
                              <td
                                scope="row"
                                className="px-6 py-3 whitespace-nowrap"
                              >
                                <div className="text-sm font-medium text-gray-900">
                                  {item?.subTopic}
                                </div>
                              </td>
                              <td
                                scope="row"
                                className="px-6 py-3 whitespace-nowrap"
                              >
                                <div className="text-sm font-medium text-gray-900">
                                  {item?.type}
                                </div>
                              </td>

                              <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-500 flex align-center justify-center">
                                {exercisesId?.includes(item?._id) ? (
                                  <button
                                    type="button"
                                    onClick={() => {
                                      handelToRemoveItem(item?._id);
                                    }}
                                    className="px-3 rounded-lg py-2"
                                  >
                                    <BsFillPlusCircleFill
                                      className="rotate-45 duration-200"
                                      color="red"
                                      size={17}
                                    />
                                  </button>
                                ) : (
                                  <button
                                    type="button"
                                    onClick={() => {
                                      handelToAddItem(item?._id);
                                    }}
                                    className="px-3 rounded-lg py-2"
                                  >
                                    <BsFillPlusCircleFill
                                      className="duration-200"
                                      color="#22c55e"
                                      size={17}
                                    />
                                  </button>
                                )}
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            {/* Table */}
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0  z-[20000] bg-black"></div>
    </>
  );
};

export default ExercisesModal;
