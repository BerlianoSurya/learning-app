import axios from 'axios';
import React, { useContext, useEffect } from 'react';
import { GlobalContext } from '../context/GlobalContext';
import { useParams } from 'react-router-dom';
import Kategori from '../kategori.json';

const AdminAddDataWebinar = () => {
  let { IdData } = useParams();
  const { contextState, contextFunctions } = useContext(GlobalContext);
  const { arrayWebinar, inputWebinar, setInputWebinar } = contextState;
  const { handleChangeWebinar, handleSubmitWebinar } = contextFunctions;

  useEffect(() => {
    if (IdData !== undefined) {
      axios
        .get(`https://webinar-server-new.herokuapp.com/webinar/${IdData}`)
        .then((response) => {
          setInputWebinar({
            judul: response.data.judul,
            sumber: response.data.sumber,
            narasumber: response.data.narasumber,
            deskripsi: response.data.deskripsi,
            via: response.data.via,
            link_daftar: response.data.link_daftar,
            image: response.data.image,
            kategori: response.data.kategori,
            tanggal: response.data.tanggal,
            waktu: response.data.waktu,
            like: response.data.like,
          });
        });
    }
  }, []);
  return (
    <div className="home container-fluid">
      <div className="container">
        <h2 className='text-center'>Admin Input Data</h2>
        <form onSubmit={handleSubmitWebinar} className="row g-3">
          <div className="col-12">
            <label htmlFor="judul" className="form-label">
              Judul
            </label>
            <input
              type="text"
              className="form-control"
              id="judul"
              onChange={handleChangeWebinar}
              value={inputWebinar.judul}
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
              onChange={handleChangeWebinar}
              value={inputWebinar.sumber}
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
              onChange={handleChangeWebinar}
              value={inputWebinar.narasumber}
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
              onChange={handleChangeWebinar}
              value={inputWebinar.deskripsi}
              name="deskripsi"
              placeholder="deskripsi..."
            />
          </div>

          <div className=" col-md-6">
            <label htmlFor="via" className="form-label">
              Via
            </label>
            <input
              type="text"
              className="form-control"
              id="via"
              onChange={handleChangeWebinar}
              value={inputWebinar.via}
              name="via"
              placeholder="Zoom/ youtube/ ig live..."
            />
          </div>

          <div className=" col-md-6">
            <label htmlFor="link_daftar" className="form-label">
              Link Daftar
            </label>
            <input
              type="text"
              className="form-control"
              id="link_daftar"
              onChange={handleChangeWebinar}
              value={inputWebinar.link_daftar}
              name="link_daftar"
              placeholder="Link pendaftaran..."
            />
          </div>

          <div className=" col-12">
            <label htmlFor="image" className="form-label">
              Link Foto
            </label>
            <input
              type="text"
              className="form-control"
              id="image"
              onChange={handleChangeWebinar}
              value={inputWebinar.image}
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
              onChange={handleChangeWebinar}
              value={inputWebinar.kategori}
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

          <div className=" col-md-4">
            <label htmlFor="waktu" className="form-label">
              Waktu
            </label>
            <input
              type="text"
              className="form-control"
              id="waktu"
              onChange={handleChangeWebinar}
              value={inputWebinar.waktu}
              name="waktu"
              placeholder="waktu..."
            />
          </div>

          <div className=" col-md-4">
            <label htmlFor="tanggal" className="form-label">
              Tanggal
            </label>
            <input
              type="date"
              className="form-control"
              id="tanggal"
              onChange={handleChangeWebinar}
              value={inputWebinar.tanggal}
              name="tanggal"
              placeholder="tanggal..."
            />
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

export default AdminAddDataWebinar;
