import React from 'react';
import Cookies from 'js-cookie';
import { Link, useNavigate } from 'react-router-dom';
import { FaRegUser } from 'react-icons/fa';
import Swal from 'sweetalert2';

const AdminNavbar = () => {
  let navigate = useNavigate();
  function logouthandler() {
    const confirmation = window.confirm('Yakin ingin logout?');
    if (confirmation) {
      Cookies.remove('admin');
      Swal.fire({
        title: 'Berhasil!',
        text: 'Logout sebagai admin berhasil!',
        icon: 'success',
        confirmButtonText: 'OK',
        allowOutsideClick: false,
      });
      navigate(`/adminLogin`);
    }
  }
  return (
    <div className="home">
      <nav className="navbar navbar-light navbar-expand-md bg-faded justify-content-center shadow-sm p-3 mb-5 bg-body rounded">
        <div className="container">
          <a href="#" className="navbar-brand d-flex w-50 me-auto fw-bold fs-4">
            Home Admin
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapsingNavbar3"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="navbar-collapse collapse w-100"
            id="collapsingNavbar3"
          >
            <ul className="nav navbar-nav ms-auto w-100 justify-content-end">
              <li className="nav-item">
                <Link
                  className="nav-link fw-bold fs-5"
                  to="/admin/adminDashboard"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item dropdown fw-bold fs-5">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="navbarScrollingDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {' '}
                  Webinar{' '}
                </a>
                <ul
                  className="dropdown-menu dropdown-menu-right"
                  aria-labelledby="navbarScrollingDropdown"
                >
                  <li>
                    <Link className="dropdown-item" to="/admin/dataWebinar">
                      <button className="navhome btn">Data Webinar</button>
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/admin/InputWebinar">
                      <button className="navhome btn">
                        Tambah Data Webinar
                      </button>
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="nav-item dropdown fw-bold fs-5">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="navbarScrollingDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {' '}
                  Podcast{' '}
                </a>
                <ul
                  className="dropdown-menu dropdown-menu-right"
                  aria-labelledby="navbarScrollingDropdown"
                >
                  <li>
                    <Link className="dropdown-item" to="/admin/dataPodcast">
                      <button className="navhome btn">Data Podcast</button>
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/admin/InputPodcast">
                      <button className="navhome btn">
                        Tambah Data Podcast
                      </button>
                    </Link>
                  </li>
                </ul>
              </li>
              {Cookies.get('admin') !== undefined && (
                <li className="nav-item dropdown fw-bold fs-5">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    id="navbarScrollingDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <FaRegUser />
                  </a>
                  <ul
                    className="dropdown-menu dropdown-menu-right p-2"
                    aria-labelledby="navbarScrollingDropdown"
                  >
                    <li className="mb-2">
                      <button className="dropdown-item">Admin</button>
                    </li>
                    <li>
                      <button
                        className="dropdown-item btn bg-danger button-logout"
                        onClick={logouthandler}
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
      {Cookies.get('token') !== undefined && (
        <button onClick={logouthandler}>Logout</button>
      )}
    </div>
  );
};

export default AdminNavbar;
