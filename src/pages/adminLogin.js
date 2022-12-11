import React from 'react';
import { useState } from 'react';
import Cookies from 'js-cookie';
import { useNavigate, Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const AdminLogin = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    email: '',
    password: '',
  });

  const handleChange = (event) => {
    let value = event.target.value;
    let name = event.target.name;

    setInput({ ...input, [name]: value });
  };

  const handleLogin = (event) => {
    event.preventDefault();

    let { email, password } = input;
    if (email === 'admin' && password === '123') {
      Cookies.set('admin', '1', { expires: 1 });
      navigate('/admin/adminDashboard');
    } else {
      Swal.fire({
        title: 'Error!',
        text: 'Username atau password salah!',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  };

  return (
    <div className="login d-flex justify-content-center">
      <form onSubmit={handleLogin}>
        <h2 className="text-center">Admin Login</h2>
        <div className="form-group">
          <label htmlFor="email" className="form-label">
            Username
          </label>
          <input
            type="text"
            name="email"
            className="form-control"
            onChange={handleChange}
            value={input.email}
            placeholder="Email..."
          />
        </div>
        <br />
        <div className=" form-group">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            className="form-control"
            type="password"
            name="password"
            onChange={handleChange}
            value={input.password}
            placeholder="Password..."
          />
        </div>
        <button
          className="btn btn-success rounded-pill float-end mt-3"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
