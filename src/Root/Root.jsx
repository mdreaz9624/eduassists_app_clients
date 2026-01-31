import { createBrowserRouter } from "react-router-dom";



import RootLayout from "../RootLayout/RootLayout";
import HomePage from "../Pages/Home/HomePage/HomePage";
import Services from "../Pages/Service/Services/Services";
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



export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />, 
    errorElement:<ErrorPage></ErrorPage> ,
    children: [
      {
        index: true,
        element: <HomePage />, 
      },
      {
        path: "/service",
        element: <Services></Services> 
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
        path:"/referral",
        element:<ReferralDashboard></ReferralDashboard>
      },
      {
        path:"/franchise-profile",
        element:<FranchiseProfile></FranchiseProfile>
      }
      
    ]
  },
  {
    path: "/",
    element:<AuthLayout></AuthLayout>,
    children:[
      {
        path:"/login",
        element:<Login></Login>
      },
      {
        path:"/registration",
        element:<Registration></Registration>
      },
      {
        path:"/course-details",
        element:<CourseDetails></CourseDetails>
      },
      {
        path:"/student-profile",
        element:<StudentProfile></StudentProfile>
      }
    ]

  }
]);
