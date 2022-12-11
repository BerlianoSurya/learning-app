import axios from 'axios';
import React, { useContext, useEffect } from 'react';
import { GlobalContext } from '../context/GlobalContext';
import { useParams } from 'react-router-dom';
import Kategori from '../kategori.json';

const AdminAddDataPodcast = () => {
  let { IdData } = useParams();
  const { contextState, contextFunctions } = useContext(GlobalContext);
  const { inputPodcast, setInputPodcast } = contextState;
  const { handleChangePodcast, handleSubmitPodcast } = contextFunctions;

  useEffect(() => {
    if (IdData !== undefined) {
      axios
        .get(`https://webinar-server-new.herokuapp.com/podcast/${IdData}`)
        .then((response) => {
          setInputPodcast({
            judul: response.data.judul,
            sumber: response.data.sumber,
            narasumber: response.data.narasumber,
            deskripsi: response.data.deskripsi,
            link: response.data.link,
            image: response.data.image,
            kategori: response.data.kategori,
            like: response.data.like,
          });
        });
    }
  }, []);
  return (
    <div className="home container-fluid">
      <div className="container">
        <h2 className='text-center'>Admin Input Data Podcast</h2>
        <form onSubmit={handleSubmitPodcast} className="row g-3">
          <div className="col-12">
            <label htmlFor="judul" className="form-label">
              Judul
            </label>
            <input
              type="text"
              className="form-control"
              id="judul"
              onChange={handleChangePodcast}
              value={inputPodcast.judul}
              name="judul"
              placeholder="judul..."
            />
          </div>

          <div className=" col-md-6">
            <label htmlFor="sumber" className="form-label">
              Sumber
            </label>
            <input
              type="text"
              className="form-control"
              id="sumber"
              onChange={handleChangePodcast}
              value={inputPodcast.sumber}
              name="sumber"
              placeholder="sumber..."
            />
          </div>

          <div className=" col-md-6">
            <label htmlFor="narasumber" className="form-label">
              Narasumber
            </label>
            <input
              type="text"
              className="form-control"
              id="narasumber"
              onChange={handleChangePodcast}
              value={inputPodcast.narasumber}
              name="narasumber"
              placeholder="narasumber..."
            />
          </div>

          <div className=" col-12">
            <label htmlFor="deskripsi" className="form-label">
              Deskripsi
            </label>
            <textarea
              type="text"
              className="form-control"
              id="deskripsi"
              onChange={handleChangePodcast}
              value={inputPodcast.deskripsi}
              name="deskripsi"
              placeholder="deskripsi..."
            />
          </div>

          <div className=" col-md-4">
            <label htmlFor="link" className="form-label">
              Link
            </label>
            <input
              type="text"
              className="form-control"
              id="link"
              onChange={handleChangePodcast}
              value={inputPodcast.link}
              name="link"
              placeholder="Link..."
            />
          </div>

          <div className=" col-md-4">
            <label htmlFor="image" className="form-label">
              Link foto
            </label>
            <input
              type="text"
              className="form-control"
              id="image"
              onChange={handleChangePodcast}
              value={inputPodcast.image}
              name="image"
              placeholder="Foto..."
            />
          </div>

          <div className=" col-md-4">
            <label htmlFor="kategori" className="form-label">
              Kategori
            </label>
            <select
              name="kategori"
              onChange={handleChangePodcast}
              value={inputPodcast.kategori}
              className="form-control"
            >
              {Kategori.map((e, key) => {
                return (
                  <option key={key} value={e}>
                    {e}
                  </option>
                );
              })}
            </select>
          </div>

          <button
            type="submit"
            className="ButtonForm btn btn-primary my-5 fw-semibold rounded-pill"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminAddDataPodcast;
