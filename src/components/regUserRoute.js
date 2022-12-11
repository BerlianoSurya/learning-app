import Cookies from 'js-cookie';
import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const RegulerUserRoute = (props) => {
  let navigate = useNavigate();
  if (Cookies.get('admin') !== undefined) {
    Swal.fire({
      title: 'Error!',
      text: 'Anda login sebagai admin!',
      icon: 'error',
      confirmButtonText: 'OK',
    });
    return <Navigate to={'/admin/adminDashboard'} />;
  } else {
    if (Cookies.get('token') !== undefined) {
      return props.children;
    } else {
      return <Navigate to={'/login'} />;
    }
  }
};

export default RegulerUserRoute;
