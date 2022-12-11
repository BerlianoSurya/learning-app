import React, { useContext, useMemo, useEffect } from 'react';
import { GlobalContext } from '../context/GlobalContext';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const LikedWebinar = () => {
  let navigate = useNavigate();
  const userLocal = JSON.parse(Cookies.get('user'));
  const localUID = userLocal.uid;
  const { contextState, contextFunctions } = useContext(GlobalContext);

  const { arrayWebinar, fetchStatus, setFetchStatus } = contextState;
  const { renderDataWebinar } = contextFunctions;

  const handleDetail = (event) => {
    const id = parseInt(event.target.getAttribute('data-item'));
    navigate(`/webinar/${id}`);
    setFetchStatus(true);
  };

  const filteredWebinar = useMemo(() => {
    return arrayWebinar.filter((el) => el.like.includes(localUID));
  }, [arrayWebinar]);

  useEffect(() => {
    if (fetchStatus === true) {
      renderDataWebinar();
    }
  }, [fetchStatus, setFetchStatus]);

  return (
    <>
      <div className="webinar-page py-4">
        <div className="container">
          <h2>Webinar Disukai </h2>
          <div className="row">
            {filteredWebinar.length !== 0 ? (
              filteredWebinar.map((el) => (
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
              <h3>Belum ada webinar yang disukai</h3>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default LikedWebinar;
