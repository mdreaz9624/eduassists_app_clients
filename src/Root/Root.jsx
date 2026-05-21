import { createBrowserRouter } from "react-router-dom";



import RootLayout from "../RootLayout/RootLayout";
import HomePage from "../Pages/Home/HomePage/HomePage";
import AuthLayout from "../RootLayout/AuthLayout/AuthLayout";
import Login from "../Pages/UserAccount/Login/Login";
import Registration from "../Pages/UserAccount/Registration/Registration";
import ErrorPage from "../Pages/ErrorElement/ErrorElement";
import CourseDetails from "../Pages/FiteringSystem/CourseDetails";
import Contract from "../Pages/Contract/Contract";
import Gallery from "../Pages/Gallery/Gallery";
import EduBlog from "../Pages/EduBlog/EduBlog";
import Scholarship from "../Pages/Scholarship/Scholarship";
import StudentProfile from "../Pages/StudentProfile/StudentProfile";
import ReferralDashboard from "../Pages/UserAccount/ReferralDashboard/ReferralDashboard";
import FranchiseProfile from "../Pages/UserAccount/FranchiseProfile/FranchiseProfile";
import DeveloperProfile from "../Pages/DeveloperProfile/DeveloperProfile";
import Service from "../Pages/Service/Services/Service";
import IeltsCard from "../Pages/Service/IeltsCard/IeltsCard";
import ToeflCard from "../Pages/Service/ToeflCard/ToeflCard";
import WebDevCard from "../Pages/Service/WebDevCard/WebDevCard";
import FilterRow from "../Pages/FiteringSystem/FilterRow";
import WatchStory from "../Pages/WatchStory/WatchStory";

import ScrollToTop, { ScrollToTopWrapper } from "../hooks/ScrollToTop";
import AdminLayout from "../RootLayout/AdminLayout/AdminLayout";
import AdminDeshboard from "../Admin/AdminDeshboard/AdminDeshboard";
import PrivateRoutes from "../Routes/PrivateRoutes";
import AdminRoute from "../Routes/AdminRoute";
import Analytics from "../Admin/AdminDeshboard/Dashboard Analytics/Analytics";
import UsersManagement from "../Admin/ManageUsers/UsersManagement";
import StudyDataManagement from "../Admin/ManageUniversities/StudyDataManagement";
import AddUniversity from "../Admin/ManageUniversities/AddUniversity";
import ScholarshipDetails from "../Pages/Scholarship/ScholarshipDetails/ScholarshipDetails";



const Layout = ({ children }) => {
  return (
    <>
      <ScrollToTopWrapper />
      {children}
    </>
  );
};


export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      { ScrollToTopWrapper },
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "/service",
        element: <Service></Service>
      },
      {
        path: "/contract",
        element: <Contract></Contract>
      },
      {
        path: "/gallery",
        element: <Gallery></Gallery>
      },
      {
        path: "/edublog",
        element: <EduBlog></EduBlog>
      },
      {
        path: "/scholarship",
        element: <Scholarship></Scholarship>
      },
      {

        path: "/scholarship/:id",
        element: <ScholarshipDetails />

      },
      {
        path: "/ieltsCard",
        element: <IeltsCard></IeltsCard>

      },
      {
        path: "/toefl",
        element: <ToeflCard></ToeflCard>
      },
      {
        path: "/web-dev-card",
        element: <WebDevCard></WebDevCard>
      },
      {
        path: "/developer-profile",
        element: <DeveloperProfile></DeveloperProfile>
      },
      {
        path: "/eligibility",
        element: <FilterRow></FilterRow>
      },
      {
        path: "/watch-story",
        element: <WatchStory></WatchStory>
      }

    ]
  },
  {
    path: "/",
    element: <AuthLayout></AuthLayout>,
    children: [
      {
        path: "/login",
        element: <Login></Login>
      },
      {
        path: "/registration",
        element: <Registration></Registration>
      },
      {
        path: "/course-details/:id",
        element: <CourseDetails></CourseDetails>
      },
      {
        path: "/student-profile",
        element: <StudentProfile></StudentProfile>
      },
      {
        path: "/franchise-profile",
        element: <FranchiseProfile></FranchiseProfile>
      },
      {
        path: "/referral",
        element: <ReferralDashboard></ReferralDashboard>
      }

    ]

  },
  {
    path: "/admin",
    element: <AdminRoute><AdminLayout></AdminLayout></AdminRoute>,
    children: [
      {
        index: true,
        // element: <AdminDeshboard></AdminDeshboard>
        element: <Analytics></Analytics>
      },
      {
        path: "users",
        element: <UsersManagement></UsersManagement>
      },
      {
        path: "study-data",
        element: <StudyDataManagement></StudyDataManagement>
      },
      {
        path: "add-university",
        element: <StudyDataManagement></StudyDataManagement>
      },
      {
        path: "edit-university/:id",
        element: <AddUniversity></AddUniversity>
      },
      {
        path: "analytics",
        element: <Analytics></Analytics>
      }
    ]
  }
]);
