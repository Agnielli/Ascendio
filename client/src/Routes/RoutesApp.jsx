import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {Row} from 'react-bootstrap';
import NavBarApp from '../components/NavBarApp/NavBarApp';
import { Home } from '../pages/dashboard/Home/Home';
import { Register } from '../pages/auth/Register/Register';
import { Login } from '../pages/auth/Login/Login';
import { AdminHome } from '../pages/admin/AdminHome/AdminHome';
import { ErrorPageApp } from '../pages/dashboard/ErrorPage/ErrorPageApp';
import { AboutApp } from '../pages/dashboard/About/AboutApp';
import { Users } from '../pages/users/Users';
import { AllCourses } from '../pages/courses/AllCourses';
import { CreateCourse } from '../pages/courses/CreateCourse/CreateCourse';
import { OneCourse } from '../pages/courses/OneCourse/OneCourse';
import { Landing } from '../pages/dashboard/Landing/Landing';
import { Contact } from '../pages/dashboard/Contact/Contact';
import { RecoverPassword } from '../pages/auth/RecoverPassword/RecoverPassword';
export const RoutesApp = () => {
  return (
    <BrowserRouter> {/* de react-rouer-dom para llevar a cabo enrutamientos en una sola páginas */}
      <Row>
          <NavBarApp />
          <Routes>
            <Route path='/' element={<Landing />} />
            <Route path='/home' element={<Home />} />
            <Route path='/about' element={<AboutApp />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/profile' element={<Users />} />
            <Route path='/course' element={<OneCourse />} />
            <Route path='/allcourses' element={<AllCourses />} />
            <Route path='/createcourse' element={<CreateCourse />} />
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
            <Route path='/recoverpassword' element={<RecoverPassword />} />
            <Route path='/admin' element={<AdminHome />} />
            <Route path='*' element={<ErrorPageApp />} />
          </Routes>
      </Row>
    </BrowserRouter>
  )
}

/*          <Routes>
            {!token &&
            <>
            <Route path='/' element={<Landing />} />
            <Route path='/about' element={<AboutApp />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
            </>
            }

            {token && type === 2 &&
            <>
            <Route path='/home' element={<Home />} />
            <Route path='/profile' element={<Users />} />
            <Route path='/course' element={<OneCourse />} />
            <Route path='/allcourses' element={<AllCourses />} />
            <Route path='/createcourse' element={<CreateCourse />} />
            </>
            }

            {token && type === 1 &&
            <>
             <Route path='/admin' element={<AdminHome />} />
            </>
            }

            <Route path='*' element={<ErrorPageApp />} />
          </Routes>

*/

