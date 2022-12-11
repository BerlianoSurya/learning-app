import React, { useEffect, useContext } from 'react';
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';
import { logout } from '../firebase';
import { GlobalContext } from '../context/GlobalContext';
import { useState } from 'react';
import { FaRegUser } from 'react-icons/fa';
import '../Responsive.css';
import { Link, useNavigate } from 'react-router-dom';

function Navigation() {
  let navigate = useNavigate();
  const { contextState, contextFunctions } = useContext(GlobalContext);
  const {
    setIsLoggedIn,
    isLoggedIn,
    profile,
    setFetchStatusPodcast,
    setFetchStatus,
    fetchProfile,
  } = contextState;
  const [fix, setFix] = useState(false);
  const [user, setUser] = useState();
  function setFixed() {
    if (window.scrollY >= 10) {
      setFix(true);
    } else {
      setFix(false);
    }
  }
  window.addEventListener('scroll', setFixed);

  const isUser = () => {
    if (isLoggedIn) {
      return (
        <li className="nav-login nav-item dropdown fw-bold fs-5">
          <a
            className="nav-link dropdown-toggle"
            href="#"
            id="navbarScrollingDropdown"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <img src={profile.profile_image} className="profile-image" />
          </a>
          <ul
            className="dropdown-menu dropdown-menu-right p-2"
            aria-labelledby="navbarScrollingDropdown"
          >
            <li className="mb-2">
              <Link className="nav-link" to="/profile">
                Profile
              </Link>
            </li>
            <li className="mb-2">
              <button
                className="nav-link redirect-btn"
                onClick={handleLikedWebinar}
              >
                Webinar Disukai
              </button>
            </li>
            <li className="mb-2">
              <button
                className="nav-link redirect-btn"
                onClick={handleLikedPodcast}
              >
                Podcast Disukai
              </button>
            </li>
            <li>
              <button
                onClick={logouthandler}
                className="dropdown-item btn bg-danger button-logout"
              >
                Logout
              </button>
            </li>
          </ul>
        </li>
      );
    } else {
      return (
        <li className="nav-login nav-item dropdown fw-bold fs-5">
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
              <Link className="nav-link" to="/login">
                Login
              </Link>
            </li>
          </ul>
        </li>
      );
    }
  };

  function logouthandler() {
    const confirmation = window.confirm('Yakin ingin logout?');
    if (confirmation) {
      logout();
      Cookies.remove('token');
      Cookies.remove('user');
      setIsLoggedIn(false);
      Swal.fire({
        title: 'Berhasil!',
        text: 'Logout berhasil!',
        icon: 'success',
        confirmButtonText: 'OK',
      });
    }
    navigate('/');
    setFetchStatus(true);
    setFetchStatusPodcast(true);
  }

  const handleLikedWebinar = () => {
    navigate('/webinar-disukai');
    setFetchStatus(true);
  };

  const handleLikedPodcast = () => {
    navigate('/podcast-disukai');
    setFetchStatusPodcast(true);
  };

  useEffect(() => {
    if (Cookies.get('token') !== undefined) {
      setIsLoggedIn(true);
      setUser(JSON.parse(Cookies.get('user')));
      fetchProfile();
    }
  }, []);
  return (
    <nav
      className={
        fix
          ? 'navbar fixed-top navbar-expand-lg bg-light shadow active'
          : 'navbar fixed-top navbar-expand-lg'
      }
    >
      <div className="container">
        <span className="navbar-brand fw-bold">
          <img src="/logo.png" width="50" alt="" />
          Learning App
        </span>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/webinar">
                Webinar
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/podcast">
                Podcast
              </Link>
            </li>
            {isUser()}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
