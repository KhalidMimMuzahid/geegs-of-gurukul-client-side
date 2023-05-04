import React, { useEffect, useState } from 'react'
import style from './courseList.module.css'
import deleteIcon from "../../../../assets/icons/delete.svg";
import editIcon from "../../../../assets/icons/edit.svg";
import copyIcon from "../../../../assets/icons/copy.svg";
const CourseList = () => {
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    fetch('http://localhost:5000/course-list')
      .then(res => res.json())
      .then(data => setCourses(data))
  }, [courses]);
  //delete a course
  const handelDeleteCourse = (id) => {
    fetch(`http://localhost:5000/course/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));
}
  
  return (
      <div>
          
          <div className="container mt-5">
        <form>
          <div className="font-poppins font-medium p-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className={style?.courseList}>
                <p>Course Name</p>
                <input type="text" />
              </div>

              <div className={style?.courseList}>
                <p>Course ID</p>
                <input type="text" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className={style?.courseList}>
                <p>Programe Name</p>
                <input type="text" />
              </div>

              <div className="">
                <button
                  type="submit"
                  className="px-16 py-3 mt-7 text-white rounded-lg bg-green-500"
                >
                  Search
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>

          {/* Table */}
      <div class="flex flex-col justify-center h-full mx-auto text-center">
        <div class="w-full mx-auto bg-white shadow-lg rounded-sm border border-gray-200">
          <header class="px-5 py-4 border-b border-gray-100">
            <h2 class="font-semibold font-poppins text-gray-800">Courses</h2>
          </header>
          <div class="p-3">
            <div class="max-w-[90vw] overflow-x-scroll">
              <table class="table-auto w-full font-poppins font-medium overflow-x-auto">
                <thead class="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
                  <tr>
                    <th class="p-2 whitespace-nowrap">
                      <div class="font-semibold text-left">SL No:</div>
                    </th>
                    <th class="p-2 whitespace-nowrap">
                      <div class="font-semibold text-left">Course Name </div>
                    </th>
                    <th class="p-2 whitespace-nowrap">
                      <div class="font-semibold text-left">Course ID</div>
                    </th>
                    <th class="p-2 whitespace-nowrap">
                      <div class="font-semibold text-center">Duration</div>
                    </th>
                    <th class="p-2 whitespace-nowrap">
                      <div class="font-semibold text-center">Program Name</div>
                    </th>
                    <th class="p-2 whitespace-nowrap">
                      <div class="font-semibold text-center">Price</div>
                    </th>
                    <th class="p-2 whitespace-nowrap">
                      <div class="font-semibold text-center">Status</div>
                    </th>
                    <th class="p-2 whitespace-nowrap">
                      <div class="font-semibold text-center">Action</div>
                    </th>
                  </tr>
                </thead>
                <tbody class="text-sm divide-y divide-gray-100">
                  {courses.map((course, i) => (
                    <tr key={i}>
                      <td class="p-2 whitespace-nowrap text-center">
                        <div class="flex items-center">{i + 1}</div>
                      </td>
                      <td class="p-2 whitespace-nowrap text-center">
                        {course?.courseName}
                      </td>
                      <td class="p-2 whitespace-nowrap text-center">{course?.courseId}</td>
                      <td class="p-2 whitespace-nowrap text-center">{course?.duration}</td>
                      <td class="p-2 whitespace-nowrap text-center">{course?.programName}</td>
                      <td class="p-2 whitespace-nowrap text-center">{course?.regularPrice}</td>
                          <td class="p-2 whitespace-nowrap text-center">
                              {/* isActive */}
            <div className={style?.addBatch}>
            <label
                for="isActive"
                class="flex items-center cursor-pointer relative mb-4"
              >
                <input
                  type="checkbox"
                  id="isActive"
                  name="isActive"
                  class="sr-only"
                />
                <div class="toggle-bg bg-gray-200 border-2 border-gray-200 h-6 w-11 rounded-full"></div>
                <span class="ml-3 text-gray-900 text-sm font-medium">
                  isActive
                </span>
              </label>
            </div>
            {/* isActive */}
                      </td>
                      <td class="p-2 whitespace-nowrap flex gap-2">
                        <div class="mx-auto flex w-[100px] gap-2">
                          <button
                            type="button"
                            className="px-1 py-1 "
                            onClick={()=>handelDeleteCourse(course?._id)}
                          >
                            {/* svg */}
                            <img
                              height="15px"
                              width="15px"
                              src={deleteIcon}
                              alt=""
                            />
                          </button>
                          <button
                            type="button"
                            className="px-1 py-1"
                          >
                            {/* svg */}
                            <img
                              height="15px"
                              width="15px"
                              src={editIcon}
                              alt=""
                            />
                          </button>

                          <button
                            data-modal-target="staticModal"
                            data-modal-toggle="staticModal"
                            class="px-1 py-1 "
                            type="button"
                          >
                            {/* svg */}
                            <img
                              height="15px"
                              width="15px"
                              src={copyIcon}
                              alt=""
                            />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
    </div>
  )
}

export default CourseList;