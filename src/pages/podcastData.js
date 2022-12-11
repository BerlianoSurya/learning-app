import React, { useContext, useEffect } from 'react';
import { GlobalContext } from '../context/GlobalContext';

const PodcastData = () => {
  let num = 1;
  const { contextState, contextFunctions } = useContext(GlobalContext);
  const { arrayPodcast, fetchStatusPodcast, setFetchStatusPodcast } =
    contextState;
  const { renderDataPodcast, handleEditPodcast, handleDeletePodcast } =
    contextFunctions;
  console.log(arrayPodcast);
  useEffect(() => {
    if (fetchStatusPodcast === true) {
      renderDataPodcast();
    }
  }, [fetchStatusPodcast, setFetchStatusPodcast]);
  return (
    <div className="home container-fluid">
      <div className="">
        <h2 className='fw-bold text-center my-4'>Data Podcast</h2>
        <div className="table-data">
          <table className="table table-hover table-dark table-bordered table-striped">
            <thead>
              <tr>
                <th>No</th>
                <th>Judul</th>
                <th>Sumber</th>
                <th>Narasumber</th>
                <th>Deskripsi</th>
                <th>Link</th>
                <th>Kategori</th>
                <th>Gambar</th>

                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {arrayPodcast.length !== 0 ? (
                arrayPodcast.map((el) => (
                  <tr key={el.id}>
                    <td>{num++}</td>
                    <td>{el.judul}</td>
                    <td>{el.sumber}</td>
                    <td>{el.narasumber}</td>
                    <td>{el.deskripsi}</td>
                    <td>{el.link}</td>
                    <td>{el.kategori}</td>
                    <td>
                      <img src={el.image} style={{ width: '100px' }} />{' '}
                    </td>
                    <td className="flex gap-2">
                      <button
                        onClick={handleEditPodcast}
                        value={el.id}
                        className="btn btn-warning fw-bold p-3"
                      >
                        Edit
                      </button>
                      <button
                        onClick={handleDeletePodcast}
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
                  <td colSpan="9" className="text-center">
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

export default PodcastData;
