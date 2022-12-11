import React, { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { GlobalContext } from '../context/GlobalContext';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { BsHeartFill, BsHeart, BsArrowLeftShort } from 'react-icons/bs';

function DetailPodcast() {
  let navigate = useNavigate();
  const { id } = useParams();
  const [filtered, setFiltered] = useState([]);
  const [length, setLength] = useState();
  const [likeArray, setLikeArray] = useState([]);
  const { contextState, contextFunctions } = useContext(GlobalContext);
  const { setFetchStatusPodcast, fetchStatusPodcast } = contextState;
  const { getUID } = contextFunctions;

  const checkIfPostLiked = () => {
    const checkInclude = likeArray.includes(getUID());
    return checkInclude;
  };

  const handleDisLike = () => {
    if (checkIfPostLiked() === true) {
      const i = likeArray.indexOf(getUID());
      likeArray.splice(i, 1);
      axios
        .put(`https://webinar-server-new.herokuapp.com/podcast/${id}`, {
          ...filtered,
          like: likeArray,
        })
        .then((response) => {
          setFetchStatusPodcast(true);
        });
    }
  };

  const handleLike = () => {
    if (checkIfPostLiked() === false) {
      if (getUID() == null) {
        Swal.fire({
          title: 'Gagal Menyukai!',
          text: 'Silahkan login untuk menyukai',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      } else {
        axios
          .put(`https://webinar-server-new.herokuapp.com/podcast/${id}`, {
            ...filtered,
            like: [...likeArray, getUID().toString()],
          })
          .then((response) => {
            setFetchStatusPodcast(true);
          });
      }
    }
  };

  const handleback = () => {
    navigate('/podcast');
    setFetchStatusPodcast(true);
  };

  useEffect(() => {
    if (fetchStatusPodcast === true) {
      axios
        .get(`https://webinar-server-new.herokuapp.com/podcast/${id}`)
        .then((response) => {
          const res = response.data;
          setFiltered(res);
          setLikeArray(res.like);
          setLength(res.like.length);
          setFetchStatusPodcast(false);
        });
    }
  }, [fetchStatusPodcast, setFetchStatusPodcast]);
  return (
    <div className="detail-page py-4">
      <div className="detail-page__image px-5 py-2">
        <img className="img-fluid rounded-3" src={filtered.image} />
      </div>
      <div className="detail-page__body container text-lg-start mt-5">
        {checkIfPostLiked(filtered.id) ? (
          <button
            className="text-center rounded"
            value={filtered.id}
            onClick={handleDisLike}
          >
            <BsHeartFill /> {length}
          </button>
        ) : (
          <button
            className="text-center rounded"
            value={filtered.id}
            onClick={handleLike}
          >
            <BsHeart /> {length}
          </button>
        )}
        <h2 className="fw-bold mb-3">{filtered.judul}</h2>
        <span className="kategori py-2 px-4 text-center rounded-3">
          {filtered.kategori}
        </span>
        <h5 className="mt-3 fw-bold">Narasumber: {filtered.narasumber}</h5>
        <p className="fw-500 fs-5">Sumber: {filtered.sumber}</p>
        <div className="detail-page__desrkipsi">
          <span className="fw-bold">Deskripsi:</span>
          <p>{filtered.deskripsi}</p>
        </div>
        <a
          className="detail-page__button btn position-relative px-5"
          href={filtered.link}
          target="_blank"
          rel="noreferrer"
        >
          {filtered.link}
        </a>
      </div>
    </div>
  );
}

export default DetailPodcast;
