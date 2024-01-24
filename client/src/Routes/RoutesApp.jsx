import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Row } from "react-bootstrap";
import NavBarApp from "../components/NavBarApp/NavBarApp";
import { Home } from "../pages/dashboard/Home/Home";
import { Register } from "../pages/auth/Register/Register";
import { Login } from "../pages/auth/Login/Login";
import { AdminHome } from "../pages/admin/AdminHome/AdminHome";
import { ErrorPageApp } from "../pages/dashboard/ErrorPage/ErrorPageApp";
import { AboutApp } from "../pages/dashboard/About/AboutApp";
import { Users } from "../pages/users/Users";
import { AllCourses } from "../pages/courses/AllCourses";
import { CreateCourse } from "../pages/courses/CreateCourse/CreateCourse";
import { OneCourse } from "../pages/courses/OneCourse/OneCourse";
import { Landing } from "../pages/dashboard/Landing/Landing";
import { Contact } from "../pages/dashboard/Contact/Contact";
import { RecoverPassword } from "../pages/auth/RecoverPassword/RecoverPassword";
import { CreateTrade } from "../pages/posts/trades/CreateTrade/CreateTrade";
import { Usuarios } from "../pages/admin/AdminUsuarios/Usuarios";
import { Estadisticas } from "../pages/admin/AdminEstadisticas/Estadisticas";
import { Cursos } from "../pages/admin/AdminCursos/Cursos";
import { useContext } from "react";
import { AscendioContext } from "../context/AscendioContext";
import { jwtDecode } from "jwt-decode";
import { PurchaseCourse } from "../pages/courses/PurchaseCourse/PurchaseCourse";
import { SaveCourse } from "../pages/courses/SaveCourse/SaveCourse";
import { MailRecoverPassword } from "../pages/auth/MailRecoverPassword/MailRecoverPassword";
import { ConfirmationUser } from "../pages/auth/Register/ConfirmationUser/ConfirmationUser";
import { AllTrades } from "../pages/posts/trades/AllTrades/AllTrades";
import { EditUser } from "../pages/users/EditUser/EditUser";

import { UserFollowers } from "../pages/users/UserFollowers/UserFollowers";
import { UserPosts } from "../pages/users/UserPosts/UserPosts";
import { UserFollowing } from "../pages/users/UserFollowing/UserFollowing";
import { OneUserCourses } from "../pages/courses/OneUserCourses/OneUserCourses";
import { AllPostsGenerals } from "../pages/posts/PostGeneral/AllPostsGenerals/AllPostsGenerals";
import { ShowAllUsers } from "../pages/users/ShowAllUsers/ShowAllUsers";
import { CreateGeneralPost } from "../pages/posts/PostGeneral/CreateGeneralPost/CreateGeneralPost";
import { OneTradePost } from "../pages/posts/Trades/OneTradePost/OneTradePost";

export const RoutesApp = () => {
  const { token } = useContext(AscendioContext);
  const [type, setType] = useState();

  useEffect(() => {
    if (token) {
      setType(jwtDecode(token).user.type);
    }
  }, [token]);

  return (
    <BrowserRouter>
      <Row>
        <NavBarApp />
        <Routes>
          {!token && (
            <>
              <Route path="/" element={<Landing />} />
              <Route path="/about" element={<AboutApp />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/register" element={<Register />} />
              <Route
                path="/confirmationuser/:token"
                element={<ConfirmationUser />}
              />
              <Route path="/login" element={<Login />} />
              <Route
                path="/recoverpassword/:token"
                element={<RecoverPassword />}
              />
              <Route
                path="/mailrecoverpassword"
                element={<MailRecoverPassword />}
              />
            </>
          )}
          {token && type === 2 && (
            <>
              <Route path="/home" element={<Home />} />
              <Route path="/profile" element={<Users />} />
              <Route path="/edituser" element={<EditUser />} />
              <Route path="/course/:course_id" element={<OneCourse />} />
              <Route path="/course" element={<OneCourse />} />
              <Route path="/allcourses" element={<AllCourses />} />
              <Route path="/createtrade" element={<CreateTrade />} />
              <Route
                path="/creategeneralpost"
                element={<CreateGeneralPost />}
              />
              <Route path="/allpoststrades" element={<AllTrades />} />
              <Route path="/onetradepost/:post_id" element={<OneTradePost />} />
              <Route path="/allpostsgenerals" element={<AllPostsGenerals />} />
              <Route path="/showallusers" element={<ShowAllUsers />} />
              <Route path="/createcourse" element={<CreateCourse />} />
              <Route path="/purchasecourse" element={<PurchaseCourse />} />
              <Route path="/savecourse" element={<SaveCourse />} />
              <Route path="/userfollowers/:id" element={<UserFollowers />} />
              <Route path="/userfollowing/:id" element={<UserFollowing />} />
              <Route path="/userposts/:id" element={<UserPosts />} />
              <Route
                path="/oneusercourses/:user_id"
                element={<OneUserCourses />}
              />
            </>
          )}

          {token && type === 1 && (
            <>
              <Route path="/admin" element={<AdminHome />}>
                <Route index element={<Usuarios />} />
                <Route path="allusers" element={<Usuarios />} />
                <Route path="allcourses" element={<Cursos />} />
                <Route path="alldata" element={<Estadisticas />} />
              </Route>
            </>
          )}

          <Route path="*" element={<ErrorPageApp />} />
        </Routes>
      </Row>
    </BrowserRouter>
  );
};
