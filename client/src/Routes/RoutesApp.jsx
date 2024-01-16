import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {Row} from 'react-bootstrap';
import { NavBarApp } from '../components/NavBarApp/NavBarApp';
import { Home } from '../pages/dashboard/Home/Home';
import { Register } from '../pages/auth/Register/Register';
import { Login } from '../pages/auth/Login/Login';
import { AdminHome } from '../pages/admin/AdminHome/AdminHome';
import { ErrorPageApp } from '../pages/dashboard/ErrorPage/ErrorPageApp';

export const RoutesApp = () => {
  return (
    <BrowserRouter> {/* de react-rouer-dom para llevar a cabo enrutamientos en una sola páginas */}
      <Row>
          <NavBarApp />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
            <Route path='/admin' element={<AdminHome />} />
            <Route path='*' element={<ErrorPageApp />} />
          </Routes>
      </Row>
    </BrowserRouter>
  )
}
