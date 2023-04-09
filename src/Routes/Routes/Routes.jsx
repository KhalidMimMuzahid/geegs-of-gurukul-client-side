import Main from "../../Layouts/Main/Main";
import Career from "../../Pages/Career/Career";
import Courses from "../../Pages/Courses/Courses";
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
import Home from "../../Pages/Home/Home";
import Learn from "../../Pages/Learn/Learn";
import Announcement from "../../Pages/Profile/Announcement/Announcement";
import Bookmark from "../../Pages/Profile/Bookmark/Bookmark";
import LeaderBoard from "../../Pages/Profile/LeaderBoard/LeaderBoard";
import Certification from "../../Pages/Profile/MyProfile/Certification/Certification";
import Education from "../../Pages/Profile/MyProfile/Education/Education";
import Genarel from "../../Pages/Profile/MyProfile/Genarel/Genarel";
import MyProfile from "../../Pages/Profile/MyProfile/MyProfile";
import ChangePassword from "../../Pages/Profile/MyProfile/Settings/ChangePassword/ChangePassword";
import EditProfile from "../../Pages/Profile/MyProfile/Settings/EditProfile/EditProfile";
import Settings from "../../Pages/Profile/MyProfile/Settings/Settings";
import Profile from "../../Pages/Profile/Profile";

const { createBrowserRouter } = require("react-router-dom");

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/courses",
        element: <Courses />,
      },
      {
        path: "/career",
        element: <Career />,
      },
      // {
      //   path: "/learn",
      //   element: <Learn />,
      // },
      {
        path: "/dashboard",
        element: <DashBoard />,
        children: [
          {
            path: "/dashboard/assessment",
            element: <Assesments />,
            children: [
              {
                path: "/dashboard/assessment",
                element: <Default />,
              },
              {
                path: "/dashboard/assessment/on-processing",
                element: <OnProcessinAssesments />,
              },
            ],
          },
          {
            path: "/dashboard/analysis",
            element: <Analysis />,
          },
          {
            path: "/dashboard/practice",
            element: <Practice />,
          },
          {
            path: "/dashboard/admin-pannel",
            element: <AdminPannel />,
            children: [
              {
                path: "/dashboard/admin-pannel",
                element: <AddAssesment />,
              },
              {
                path: "/dashboard/admin-pannel/assesment-list",
                element: <AssesmentList />,
              },
              {
                path: "/dashboard/admin-pannel/upload-csv",
                element: <CSV />,
              },
              {
                path: "/dashboard/admin-pannel/users",
                element: <Users />,
              },
            ],
          },
        ],
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
                ],
              },
            ],
          },
          {
            path: "/profile/announcement",
            element: <Announcement />,
          },
          {
            path: "/profile/bookmark",
            element: <Bookmark />,
          },
          {
            path: "/profile/leaderboard",
            element: <LeaderBoard />,
          },
        ],
      },
    ],
  },
]);

export default router;
