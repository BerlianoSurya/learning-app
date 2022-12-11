import Cookies from 'js-cookie';
import React from 'react';
import { Navigate } from 'react-router-dom';
import LoginPage from '../pages/login';
import Navigation from './Navigation';
import Footer from './Footer';
import Swal from 'sweetalert2';

const LoginRoute = () => {
  if (Cookies.get('token') === undefined) {
    if (Cookies.get('admin') !== undefined) {
      Swal.fire({
        title: 'Error!',
        text: 'Anda login sebagai admin!',
        icon: 'error',
        confirmButtonText: 'OK',
      });
      return <Navigate to={'/admin/adminDashboard'} />;
    } else {
      return (
        <>
          <Navigation />
          <LoginPage />
          <Footer />
        </>
      );
    }
  } else if (Cookies.get('token') !== undefined) {
    window.alert('anda sudah login');
    return <Navigate to={'/'} />;
  }
};

export default LoginRoute;
