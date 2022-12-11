import React, { useContext, useMemo, useEffect } from 'react';
import { GlobalContext } from '../context/GlobalContext';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const LikedPodcast = () => {
  let navigate = useNavigate();
  const userLocal = JSON.parse(Cookies.get('user'));
  const localUID = userLocal.uid;
  const { contextState, contextFunctions } = useContext(GlobalContext);

  const { arrayPodcast, fetchStatusPodcast, setFetchStatusPodcast } =
    contextState;
  const { renderDataPodcast } = contextFunctions;

  const handleDetail = (event) => {
    const id = parseInt(event.target.getAttribute('data-item'));
    navigate(`/podcast/${id}`);
    setFetchStatusPodcast(true);
  };

  const filteredPodcast = useMemo(() => {
    return arrayPodcast.filter((el) => el.like.includes(localUID));
  }, [arrayPodcast]);
  useEffect(() => {
    if (fetchStatusPodcast === true) {
      renderDataPodcast();
    }
  }, [fetchStatusPodcast, setFetchStatusPodcast]);

  return (
    <>
      <div className="webinar-page py-4">
        <div className="container">
          <h2>Podcast Disukai </h2>
          <div className="row">
            {filteredPodcast.length !== 0 ? (
              filteredPodcast.map((el) => (
                <div className="col-lg-4 col-md-6" key={el.id}>
                  <div className="card card-item shadow mb-5">
                    <div className="card-title">
                      <img src={el.image} className="card-img-top" alt="" />
                    </div>

                    <div className="card-body">
                      <span className="">{el.kategori}</span>

                      <h3>
                        <a onClick={handleDetail} data-item={el.id}>
                          {el.judul}
                        </a>
                      </h3>
                      <p className="deskripsi my-4">{el.deskripsi}</p>
                      <a href={el.link}>{el.link}</a>
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
              <h3>Belum ada podcast yang disukai</h3>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default LikedPodcast;
