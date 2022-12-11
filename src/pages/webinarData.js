import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../context/GlobalContext';

const WebinarData = () => {
  let num = 1;
  const { contextState, contextFunctions } = useContext(GlobalContext);
  const { arrayWebinar, setArrayWebinar, fetchStatus, setFetchStatus } =
    contextState;
  const {
    renderDataWebinar,
    handleEditWebinar,
    handleDeleteWebinar,
    showLocalDate,
  } = contextFunctions;

  useEffect(() => {
    if (fetchStatus === true) {
      renderDataWebinar();
    }
  }, [fetchStatus, setFetchStatus]);
  return (
    <div className="home container-fluid">
      <div className="">
        <h2 className='fw-bold text-center my-4'>Data Webinar</h2>
        <div className="table-data" id="table-data">
          <table className="table table-hover table-dark table-bordered table-striped">
            <thead>
              <tr>
                <th>No</th>
                <th>Judul</th>
                <th>Sumber</th>
                <th>Narasumber</th>
                <th>Deskripsi</th>
                <th>Via</th>
                <th>Link Daftar</th>
                <th>Kategori</th>
                <th>Gambar</th>

                <th>Tanggal</th>
                <th>Waktu</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {arrayWebinar.length !== 0 ? (
                arrayWebinar.map((el) => (
                  <tr key={el.id}>
                    <td>{num++}</td>
                    <td>{el.judul}</td>
                    <td>{el.sumber}</td>
                    <td>{el.narasumber}</td>
                    <td>{el.deskripsi}</td>
                    <td>{el.via}</td>
                    <td>{el.link_daftar}</td>
                    <td>{el.kategori}</td>
                    <td>
                      <img src={el.image} style={{ width: '100px' }} />{' '}
                    </td>
                    <td>{el.tanggal}</td>
                    <td>{el.waktu}</td>
                    <td className="flex gap-2">
                      <button
                        onClick={handleEditWebinar}
                        value={el.id}
                        className="btn btn-warning fw-bold p-3"
                      >
                        Edit
                      </button>
                      <button
                        onClick={handleDeleteWebinar}
                        value={el.id}
                        className="btn btn-danger fw-bold p-3"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="12" className="text-center">
                    Tidak ada data
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default WebinarData;
