import Main from "../../Layouts/Main/Main";
import AddAssesment from "../../Pages/DashBoard/AdminPannel/AddAssesment/AddAssesment";
import AdminPannel from "../../Pages/DashBoard/AdminPannel/AdminPannel";
import AssesmentList from "../../Pages/DashBoard/AdminPannel/AssesmentList/AssesmentList";
import CSV from "../../Pages/DashBoard/AdminPannel/CSV/CSV";
import Users from "../../Pages/DashBoard/AdminPannel/Users/Users";
import Analysis from "../../Pages/DashBoard/Analysis/Analysis";
import Assesments from "../../Pages/DashBoard/Assesments/Assesments";
import Default from "../../Pages/DashBoard/Assesments/Default/Default";
import OnProcessinAssesments from "../../Pages/DashBoard/Assesments/OnProcessinAssesments/OnProcessinAssesments";
import DashBoard from "../../Pages/DashBoard/DashBoard";
import Practice from "../../Pages/DashBoard/Practice/Practice";
import Error from "../../Pages/Error/Error";
import Certification from "../../Pages/Profile/MyProfile/Certification/Certification";
import Education from "../../Pages/Profile/MyProfile/Education/Education";
import Genarel from "../../Pages/Profile/MyProfile/Genarel/Genarel";
import MyProfile from "../../Pages/Profile/MyProfile/MyProfile";
import ChangePassword from "../../Pages/Profile/MyProfile/Settings/ChangePassword/ChangePassword";
import EditProfile from "../../Pages/Profile/MyProfile/Settings/EditProfile/EditProfile";
import Settings from "../../Pages/Profile/MyProfile/Settings/Settings";
import Profile from "../../Pages/Profile/Profile";
import AddLectures from "../../Pages/DashBoard/AdminPannel/AddLectures/AddLectures";
import Home from "../../Pages/DashBoard/Home/Home";
import Announcement from "../../Pages/Announcement/Announcement";
import Bookmark from "../../Pages/Bookmark/Bookmark";
import LecturesList from "../../Pages/DashBoard/AdminPannel/LecturesList/LecturesList";
import AddAssignment from "../../Pages/DashBoard/AdminPannel/AddAssignment/AddAssignment";
import Courses from "../../Pages/DashBoard/MyCourses/Courses/Courses";
import MyCourses from "../../Pages/DashBoard/MyCourses/MyCourses";
import SpecificCourse from "../../Pages/DashBoard/MyCourses/SpecificCourse/SpecificCourse";
import Help from "../../Pages/Help/Help";
import AddBatch from "../../Pages/DashBoard/AdminPannel/AddBatch/AddBatch";
import AddCourse from "../../Pages/DashBoard/AdminPannel/AddCourse/AddCourse";
import BatchList from "../../Pages/DashBoard/AdminPannel/BatchList/BatchList";
import CourseList from "../../Pages/DashBoard/AdminPannel/CourseList/CourseList";
import AssignmentList from "../../Pages/DashBoard/AdminPannel/AssignmentList/AssignmentList";
import PhoneSignUp from "../../Pages/phoneSignUp/PhoneSignUp";
import Login from "../../Pages/login/Login";
import SignUp from "../../Pages/SignUp/SignUp";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import AnalysisLists from "../../Pages/DashBoard/Analysis/AnalysisLists/AnalysisLists";
import AddExercise from "../../Pages/DashBoard/AdminPannel/AddExercise/AddExercise";
import ExerciseList from "../../Pages/DashBoard/AdminPannel/ExerciseList/ExerciseList";
import CreateCoupon from "../../Pages/DashBoard/AdminPannel/CreateCoupon/CreateCoupon";
import CouponList from "../../Pages/DashBoard/AdminPannel/CouponList/CouponList";
import AddModule from "../../Pages/DashBoard/AdminPannel/AddModule/AddModule";
import ModuleList from "../../Pages/DashBoard/AdminPannel/ModuleList/ModuleList";
import AddProgram from "../../Pages/DashBoard/AdminPannel/AddProgram/AddProgram";
import ProgramList from "../../Pages/DashBoard/AdminPannel/ProgramList/ProgramList";
import Profession from "../../Pages/Profile/MyProfile/Profession/Profession";
import MySkills from "./../../Pages/Profile/MyProfile/MySkills/MySkills";
import ExerciseResponse from "./../../Pages/DashBoard/AdminPannel/ExerciseResponse/ExerciseResponse";
import AddStudent from "../../Pages/DashBoard/AdminPannel/AddStudent/AddStudent";
import SystemSettings from "../../Pages/Profile/MyProfile/Settings/SystemSettings/SystemSettings";

const { createBrowserRouter } = require("react-router-dom");
const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: (
          <PrivateRoute>
            <DashBoard />
          </PrivateRoute>
        ),
        children: [
          {
            path: "/",
            element: <Home />,
          },

          {
            path: "/dashboard/assessment",
            element: <Assesments />,
            children: [
              {
                path: "/dashboard/assessment",
                element: <Default />,
              },
            ],
          },
          {
            path: "/dashboard/analysis",
            element: <AnalysisLists />,
          },
          {
            path: "/dashboard/analysis/specific/:_id",
            loader: async ({ params }) =>
              fetch(
                `https://api.geeksofgurukul.com/api/v1/assessments/assessment-response?_id=${params?._id}`
              ),
            element: <Analysis />,
          },
          {
            path: "/dashboard/practice",
            element: <Practice />,
          },
          {
            path: "/dashboard/courses",
            element: <MyCourses />,
            children: [
              { path: "/dashboard/courses", element: <Courses /> },
              {
                path: "/dashboard/courses/course/:queries",
                loader: async ({ params }) => {
                  // console.log("queries: ", params?.queries);
                  // return params?.queries;
                  return fetch(
                    `https://api.geeksofgurukul.com/api/v1/modules/modulesbycourseandbatch?${params?.queries}`
                  );
                },
                element: <SpecificCourse />,
              },
            ],
          },
          {
            path: "/dashboard/admin-pannel",
            element: <AdminPannel />,
            children: [
              {
                path: "/dashboard/admin-pannel/assessment/add-assessment",
                element: <AddAssesment />,
              },
              {
                path: "/dashboard/admin-pannel/assessment/assesment-list",
                element: <AssesmentList />,
              },
              {
                path: "/dashboard/admin-pannel/lecture/add-lectures",
                element: <AddLectures />,
              },
              {
                path: "/dashboard/admin-pannel/assessment/upload-csv",
                element: <CSV />,
              },
              {
                path: "/dashboard/admin-pannel/others/users",
                element: <Users />,
              },
              {
                path: "/dashboard/admin-pannel/lecture/lectures-list",
                element: <LecturesList />,
              },
              {
                path: "/dashboard/admin-pannel/lecture/add-assignment",
                element: <AddAssignment />,
              },
              {
                path: "/dashboard/admin-pannel/lecture/add-exercise",
                element: <AddExercise />,
              },
              {
                path: "/dashboard/admin-pannel/course/add-course",
                element: <AddCourse />,
              },
              {
                path: "/dashboard/admin-pannel/course/add-batch",
                element: <AddBatch />,
              },
              {
                path: "/dashboard/admin-pannel/course/batch-list",
                element: <BatchList />,
              },
              {
                path: "/dashboard/admin-pannel/course/course-list",
                element: <CourseList />,
              },
              {
                path: "/dashboard/admin-pannel/lecture/assignment-list",
                element: <AssignmentList />,
              },
              {
                path: "/dashboard/admin-pannel/lecture/exercise-list",
                element: <ExerciseList />,
              },
              {
                path: "/dashboard/admin-pannel/others/create-coupon",
                element: <CreateCoupon />,
              },
              {
                path: "/dashboard/admin-pannel/others/coupon-list",
                element: <CouponList />,
              },
              {
                path: "/dashboard/admin-pannel/others/exercise-response",
                element: <ExerciseResponse />,
              },
              {
                path: "/dashboard/admin-pannel/others/add-student",
                element: <AddStudent />,
              },
              {
                path: "/dashboard/admin-pannel/lecture/add-module",
                element: <AddModule />,
              },
              {
                path: "/dashboard/admin-pannel/lecture/module-list",
                element: <ModuleList />,
              },
              {
                path: "/dashboard/admin-pannel/course/add-program",
                element: <AddProgram />,
              },
              {
                path: "/dashboard/admin-pannel/course/program-list",
                element: <ProgramList />,
              },
            ],
          },
        ],
      },
      {
        path: "/announcement",
        element: <Announcement />,
      },
      {
        path: "/bookmark",
        element: <Bookmark />,
      },
      {
        path: "/help",
        element: <Help />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
      {
        path: "/phone-sign-up",
        element: <PhoneSignUp />,
      },

      {
        path: "/profile",
        element: <Profile />,
        children: [
          {
            path: "/profile/my-profile",
            element: <MyProfile />,
            children: [
              {
                path: "/profile/my-profile",
                element: <Genarel />,
              },
              {
                path: "/profile/my-profile/education",
                element: <Education />,
              },
              {
                path: "/profile/my-profile/certification",
                element: <Certification />,
              },
              {
                path: "/profile/my-profile/profession",
                element: <Profession />,
              },
              {
                path: "/profile/my-profile/my-skills",
                element: <MySkills />,
              },
              {
                path: "/profile/my-profile/settings",
                element: <Settings />,
                children: [
                  {
                    path: "/profile/my-profile/settings/change-password",
                    element: <ChangePassword />,
                  },
                  {
                    path: "/profile/my-profile/settings/edit-profile",
                    element: <EditProfile />,
                  },
                  {
                    path: "/profile/my-profile/settings//system-settings",
                    element: <SystemSettings />,
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    path: "on-processing/:_id",
    loader: async ({ params }) =>
      fetch(
        `https://api.geeksofgurukul.com/api/v1/assessments/assessment?_id=${params?._id}`
      ),
    element: <OnProcessinAssesments />,
  },
]);

export default router;
