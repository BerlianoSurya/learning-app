import React, { createContext, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import {
  query,
  collection,
  getDocs,
  where,
  doc,
  updateDoc,
} from 'firebase/firestore';
import Swal from 'sweetalert2';

export const GlobalContext = createContext();

export const GlobalProvider = (props) => {
  let navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [fetchStatus, setFetchStatus] = useState(true);
  const [profile, setProfile] = useState([]);
  const [fetchStatusPodcast, setFetchStatusPodcast] = useState(true);
  const [arrayWebinar, setArrayWebinar] = useState([]);
  const [arrayPodcast, setArrayPodcast] = useState([]);
  const [currentId, setcurrentId] = useState(-1);
  const [inputWebinar, setInputWebinar] = useState({
    judul: '',
    sumber: '',
    narasumber: '',
    deskripsi: '',
    via: '',
    link_daftar: '',
    image: '',
    kategori: '',
    tanggal: '',
    waktu: '',
    like: [],
  });
  const [inputPodcast, setInputPodcast] = useState({
    judul: '',
    sumber: '',
    narasumber: '',
    deskripsi: '',
    link: '',
    image: '',
    kategori: '',
    like: [],
  });

  const renderDataWebinar = () => {
    axios
      .get('https://webinar-server-new.herokuapp.com/webinar')
      .then((res) => {
        const tempArr = res.data.map((el) => {
          return el;
        });
        setArrayWebinar(tempArr);
      })
      .catch((e) => console.log(e));

    setFetchStatus(false);
  };

  const getUID = () => {
    if (Cookies.get('user') == undefined) {
      return null;
    } else {
      const userLocal = JSON.parse(Cookies.get('user'));
      const localUID = userLocal.uid;
      return localUID;
    }
  };

  const renderDataPodcast = () => {
    axios
      .get('https://webinar-server-new.herokuapp.com/podcast')
      .then((res) => {
        const tempArr = res.data.map((el) => {
          return el;
        });
        setArrayPodcast(tempArr);
      })
      .catch((e) => console.log(e));
    setFetchStatusPodcast(false);
  };

  const handleChangeWebinar = (event) => {
    let value = event.target.value;
    let name = event.target.name;

    setInputWebinar({ ...inputWebinar, [name]: value });
  };

  const handleChangePodcast = (event) => {
    let value = event.target.value;
    let name = event.target.name;

    setInputPodcast({ ...inputPodcast, [name]: value });
  };

  const handleSubmitWebinar = (event) => {
    event.preventDefault();
    let {
      judul,
      sumber,
      narasumber,
      deskripsi,
      via,
      link_daftar,
      image,
      kategori,
      tanggal,
      waktu,
      like,
    } = inputWebinar;

    if (currentId === -1) {
      axios
        .post('https://webinar-server-new.herokuapp.com/webinar', {
          judul,
          sumber,
          narasumber,
          deskripsi,
          via,
          link_daftar,
          image,
          kategori,
          tanggal: showLocalDate(tanggal),
          waktu,
          like,
        })
        .then((response) => {
          setFetchStatus(true);
          navigate('/admin/dataWebinar');
        });
    } else {
      axios
        .put(`https://webinar-server-new.herokuapp.com/webinar/${currentId}`, {
          judul,
          sumber,
          narasumber,
          deskripsi,
          via,
          link_daftar,
          image,
          kategori,
          tanggal: showLocalDate(tanggal),
          waktu,
          like,
        })
        .then((response) => {
          setFetchStatus(true);
          navigate('/admin/dataWebinar');
        });
    }
    setcurrentId(-1);
    setInputWebinar({
      judul: '',
      sumber: '',
      narasumber: '',
      deskripsi: '',
      via: '',
      link_daftar: '',
      image: '',
      kategori: '',
      tanggal: '',
      waktu: '',
      like: [],
    });
  };

  const handleSubmitPodcast = (event) => {
    event.preventDefault();
    let { judul, sumber, narasumber, deskripsi, link, image, kategori, like } =
      inputPodcast;

    if (currentId === -1) {
      axios
        .post('https://webinar-server-new.herokuapp.com/podcast', {
          judul,
          sumber,
          narasumber,
          deskripsi,
          link,
          image,
          kategori,
          like,
        })
        .then((response) => {
          setFetchStatusPodcast(true);
          navigate('/admin/dataPodcast');
        });
    } else {
      axios
        .put(`https://webinar-server-new.herokuapp.com/podcast/${currentId}`, {
          judul,
          sumber,
          narasumber,
          deskripsi,
          link,
          image,
          kategori,
          like,
        })
        .then((response) => {
          setFetchStatusPodcast(true);
          navigate('/admin/dataPodcast');
        });
    }
    setcurrentId(-1);
    setInputPodcast({
      judul: '',
      sumber: '',
      narasumber: '',
      deskripsi: '',
      link: '',
      image: '',
      kategori: '',
      like: [],
    });
  };

  const handleEditWebinar = (event) => {
    const id = parseInt(event.target.value);
    setcurrentId(id);
    navigate(`/admin/InputWebinar/edit/${id}`);
    setFetchStatus(true);
  };

  const handleEditPodcast = (event) => {
    const id = parseInt(event.target.value);
    setcurrentId(id);
    navigate(`/admin/InputPodcast/edit/${id}`);
    setFetchStatusPodcast(true);
  };

  const handleDeleteWebinar = (event) => {
    const iddel = parseInt(event.target.value);
    axios
      .delete(`https://webinar-server-new.herokuapp.com/webinar/${iddel}`)
      .then((response) => {
        setFetchStatus(true);
      });
  };

  const handleDeletePodcast = (event) => {
    const iddel = parseInt(event.target.value);
    axios
      .delete(`https://webinar-server-new.herokuapp.com/podcast/${iddel}`)
      .then((response) => {
        setFetchStatusPodcast(true);
      });
  };

  const showLocalDate = (date) => {
    let newDate = new Date(date).toLocaleString('id-ID', {
      month: 'long',
      year: 'numeric',
      day: '2-digit',
    });
    return newDate;
  };
  const fetchProfile = async () => {
    try {
      const localUser = JSON.parse(Cookies.get('user'));
      const q = query(
        collection(db, 'users'),
        where('uid', '==', localUser.uid)
      );
      const doc = await getDocs(q);
      const data = doc.docs[0].data();
      setProfile(data);
    } catch (err) {
      Swal.fire({
        title: 'Error!',
        text: 'An error occured while fetching user data',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  };

  const contextState = {
    isLoggedIn,
    setIsLoggedIn,
    arrayWebinar,
    setArrayWebinar,
    arrayPodcast,
    setArrayPodcast,
    fetchStatus,
    setFetchStatus,
    fetchStatusPodcast,
    setFetchStatusPodcast,
    inputWebinar,
    setInputWebinar,
    inputPodcast,
    setInputPodcast,
    profile,
    setProfile,
    fetchProfile,
  };

  const contextFunctions = {
    handleChangeWebinar,
    handleChangePodcast,
    renderDataWebinar,
    renderDataPodcast,
    handleSubmitWebinar,
    handleSubmitPodcast,
    handleEditWebinar,
    handleEditPodcast,
    handleDeleteWebinar,
    handleDeletePodcast,
    showLocalDate,
    getUID,
  };

  return (
    <GlobalContext.Provider
      value={{
        contextState,
        contextFunctions,
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};
