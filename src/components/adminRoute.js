import Cookies from 'js-cookie';
import React from 'react';
import { Navigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const AdminRoute = (props) => {
  if (Cookies.get('token') !== undefined && Cookies.get('user') !== undefined) {
    alert('Anda sudah login sebagai user, silahkan logout terlebih dahulu');
    return <Navigate to={'/'} />;
  } else {
    if (Cookies.get('admin') === undefined) {
      Swal.fire({
        title: 'Anda Belum Login Sebagai Admin!',
        text: 'Silahkan login terlebih dahulu',
        icon: 'error',
        confirmButtonText: 'OK',
        allowOutsideClick: false,
      });
      return <Navigate to={'/adminLogin'} />;
    } else if (Cookies.get('admin') !== undefined) {
      return props.children;
    }
  }
};

export default AdminRoute;
