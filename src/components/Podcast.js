import React, { useContext, useMemo, useEffect, useState } from 'react';
import { GlobalContext } from '../context/GlobalContext';
import { useNavigate } from 'react-router-dom';
import CategoryBtn from './CategoryBtn';
import { BsHeartFill, BsHeart } from 'react-icons/bs';

function Podcast() {
  let navigate = useNavigate();
  const [kategori, setKategori] = useState('');
  const { contextState, contextFunctions } = useContext(GlobalContext);
  const { arrayPodcast, fetchStatusPodcast, setFetchStatusPodcast } =
    contextState;
  const { renderDataPodcast, getUID } = contextFunctions;

  const handleKategori = (event) => {
    event.preventDefault();
    setKategori(event.target.value);
  };

  const handleClear = (event) => {
    event.preventDefault();
    setKategori('');
  };

  const checkIfPostLiked = (id) => {
    const filteredDetail = arrayPodcast.find((el) => el.id === Number(id));
    //
    const likeArray = filteredDetail.like;
    const checkInclude = likeArray.includes(getUID());
    return checkInclude;
  };

  const filteredPodcast = useMemo(() => {
    if (kategori === '') {
      return arrayPodcast;
    } else if (kategori !== null) {
      return arrayPodcast.filter((el) => el.kategori == kategori);
    }
  }, [kategori, arrayPodcast]);

  const handleDetail = (event) => {
    const id = parseInt(event.target.getAttribute('data-item'));

    navigate(`/podcast/${id}`);
    setFetchStatusPodcast(true);
  };

  useEffect(() => {
    if (fetchStatusPodcast === true) {
      renderDataPodcast();
    }
  }, [fetchStatusPodcast, setFetchStatusPodcast, checkIfPostLiked]);
  return (
    <div className="podcast-page py-4">
      <div className="container">
        <div className="podcast__head d-flex justify-content-between mb-2">
          <h2 className="fw-bold">Podcast</h2>
        </div>
        <CategoryBtn
          kategori={kategori}
          handleClear={handleClear}
          handleKategori={handleKategori}
        />
        <div className="row">
          {filteredPodcast.length !== 0 ? (
            filteredPodcast.map((el) => (
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

export default Podcast;
