import React from 'react';
import Navbar from './adminNavbar';

const AdminLayout = (props) => {
  return (
    <div>
      <Navbar />
      {props.children}
    </div>
  );
};

export default AdminLayout;
