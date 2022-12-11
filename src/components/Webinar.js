import React, { useContext, useMemo, useEffect, useState } from 'react';
import { GlobalContext } from '../context/GlobalContext';
import { useNavigate } from 'react-router-dom';
import CategoryBtn from './CategoryBtn';
import { BsHeartFill, BsHeart } from 'react-icons/bs';

function Webinar() {
  let navigate = useNavigate();
  const [kategori, setKategori] = useState('');
  const { contextState, contextFunctions } = useContext(GlobalContext);
  const { arrayWebinar, fetchStatus, setFetchStatus } = contextState;
  const { renderDataWebinar, getUID } = contextFunctions;

  const handleKategori = (event) => {
    event.preventDefault();
    setKategori(event.target.value);
  };

  const handleClear = (event) => {
    event.preventDefault();
    setKategori('');
  };
  const checkIfPostLiked = (id) => {
    const filteredDetail = arrayWebinar.find((el) => el.id === Number(id));
    //
    const likeArray = filteredDetail.like;
    if (likeArray === undefined) {
      return null;
    } else {
      const checkInclude = likeArray.includes(getUID());
      return checkInclude;
    }
  };
  const filteredWebinar = useMemo(() => {
    if (kategori === '') {
      return arrayWebinar;
    } else if (kategori !== null) {
      return arrayWebinar.filter((el) => el.kategori == kategori);
    }
  }, [kategori, arrayWebinar]);

  const handleDetail = (event) => {
    const id = parseInt(event.target.getAttribute('data-item'));

    navigate(`/webinar/${id}`);
    setFetchStatus(true);
  };

  useEffect(() => {
    if (fetchStatus === true) {
      renderDataWebinar();
    }
  }, [fetchStatus, setFetchStatus]);

  return (
    <div className="webinar-page py-4">
      <div className="container">
        <div className="webinar__head d-flex justify-content-between">
          <h2 className="fw-bold">Webinar</h2>
          <a className="fw-bold fs-1"></a>
        </div>
        <CategoryBtn
          kategori={kategori}
          handleClear={handleClear}
          handleKategori={handleKategori}
        />
        <div className="row">
          {filteredWebinar.length !== 0 ? (
            filteredWebinar.map((el) => (
              <div className="col-lg-4 col-md-6" key={el.id}>
                <div className="card card-item shadow mb-4">
                  <div className="card-title">
                    <img src={el.image} className="card-img-top" alt="" />
                  </div>

                  <div className="card-body">
                    <span className="">{el.kategori}</span>
                    {checkIfPostLiked(el.id) === true ? (
                      <p value={el.id}>
                        <BsHeartFill /> {el.like.length}
                      </p>
                    ) : (
                      <p value={el.id}>
                        <BsHeart /> {el.like.length}
                      </p>
                    )}
                    <h3>
                      <a onClick={handleDetail} data-item={el.id}>
                        {el.judul}
                      </a>
                    </h3>
                    <p className="deskripsi my-4">{el.deskripsi}</p>
                    <p>{el.tanggal}</p>
                    {/* {checkIfPostLiked(el.id) === true ? (
                      <button value={el.id} onClick={checkIfPostLiked}>
                        like
                      </button>
                    ) : (
                      <button value={el.id} onClick={checkIfPostLiked}>
                        dislike
                      </button>
                    )} */}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center">Tidak ada data</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Webinar;
