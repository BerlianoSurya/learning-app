import React from 'react';
import { GlobalProvider } from '../context/GlobalContext';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from '../pages/home';
import AdminDashboard from '../pages/adminDashboard';
import WebinarData from '../pages/webinarData';
import PodcastData from '../pages/podcastData';
import AdminAddDataWebinar from '../pages/adminAddDataWebinar';
import AdminAddDataPodcast from '../pages/adminAddDataPodcast';
import LikedWebinar from '../pages/LikedWebinar';
import DetailSchedule from '../components/DetailSchedule';
import DetailPodcast from '../components/DetailPodcast';
import RegisterRoute from '../components/registerRoute';
import AdminLoginRoute from '../components/adminLoginRoute';
import AdminRoute from '../components/adminRoute';
import AdminLayout from '../components/adminLayout';
import Webinar from '../components/Webinar';
import Podcast from '../components/Podcast';
import LoginRoute from '../components/LoginRoute';
import RegulerUserRoute from '../components/regUserRoute';
import Profile from '../pages/Profile';
import LikedPodcast from '../pages/LikedPodcast';
import Page404 from '../components/Page404';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

const Routers = () => {
  return (
    <>
      <BrowserRouter>
        <GlobalProvider>
          <Routes>
            <Route path="*" element={<Page404 />} />
            <Route
              path="/"
              element={
                // <Layout>
                <>
                  <Navigation />
                  <Home />
                  <Footer />
                </>
                // </Layout>
              }
            />
            <Route
              path="/webinar"
              element={
                // <Layout>
                <>
                  <Navigation />
                  <Webinar />
                  <Footer />
                </>
                // </Layout>
              }
            />
            <Route
              path="/webinar/:id"
              element={
                // <Layout>
                <>
                  <Navigation />
                  <DetailSchedule />
                  <Footer />
                </>
                // </Layout>
              }
            />
            <Route
              path="/podcast"
              element={
                // <Layout>
                <>
                  <Navigation />
                  <Podcast />
                  <Footer />
                </>
                // </Layout>
              }
            />
            <Route
              path="/podcast/:id"
              element={
                // <Layout>
                <>
                  <Navigation />
                  <DetailPodcast />
                  <Footer />
                </>
                // </Layout>
              }
            />
            {/* <Route path="/login" element={<LoginRoute />} /> */}

            <Route path="/register" element={<RegisterRoute />} />
            <Route path="/login" element={<LoginRoute />} />
            <Route
              path="/profile"
              element={
                <RegulerUserRoute>
                  <Navigation />
                  <Profile />
                  <Footer />
                </RegulerUserRoute>
              }
            />
            <Route
              path="/webinar-disukai"
              element={
                <RegulerUserRoute>
                  <Navigation />
                  <LikedWebinar />
                  <Footer />
                </RegulerUserRoute>
              }
            />
            <Route
              path="/podcast-disukai"
              element={
                <RegulerUserRoute>
                  <Navigation />
                  <LikedPodcast />
                  <Footer />
                </RegulerUserRoute>
              }
            />
            <Route path="/adminLogin" element={<AdminLoginRoute />} />
            <Route
              path="/admin/adminDashboard"
              element={
                <AdminRoute>
                  <AdminLayout>
                    <AdminDashboard />
                  </AdminLayout>
                </AdminRoute>
              }
            />
            <Route
              path="/admin/dataWebinar"
              element={
                <AdminRoute>
                  <AdminLayout>
                    <WebinarData />
                  </AdminLayout>
                </AdminRoute>
              }
            />
            <Route
              path="/admin/InputWebinar"
              element={
                <AdminRoute>
                  <AdminLayout>
                    <AdminAddDataWebinar />
                  </AdminLayout>
                </AdminRoute>
              }
            />
            <Route
              path="/admin/InputWebinar/edit/:IdData"
              element={
                <AdminRoute>
                  <AdminLayout>
                    <AdminAddDataWebinar />
                  </AdminLayout>
                </AdminRoute>
              }
            />
            <Route
              path="/admin/dataPodcast"
              element={
                <AdminRoute>
                  <AdminLayout>
                    <PodcastData />
                  </AdminLayout>
                </AdminRoute>
              }
            />
            <Route
              path="/admin/InputPodcast"
              element={
                <AdminRoute>
                  <AdminLayout>
                    <AdminAddDataPodcast />
                  </AdminLayout>
                </AdminRoute>
              }
            />
            <Route
              path="/admin/InputPodcast/edit/:IdData"
              element={
                <AdminRoute>
                  <AdminLayout>
                    <AdminAddDataPodcast />
                  </AdminLayout>
                </AdminRoute>
              }
            />
          </Routes>
        </GlobalProvider>
      </BrowserRouter>
    </>
  );
};

export default Routers;
