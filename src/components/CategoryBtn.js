import React from 'react';
import Kategori from '../kategori.json';
import { MdCancel } from 'react-icons/md';

const CategoryBtn = ({ kategori, handleKategori, handleClear }) => {
  return (
    <div className="kategori-list d-flex my-4">
      {kategori !== '' ? (
        <button className='kategori py-2 px-4 text-center rounded-3' onClick={handleClear}>
          {kategori}
          <MdCancel className='icon-kategori fw-bold fs-5 ms-2' />
        </button>
      ) : null}
      {Kategori.map((e, key) => (
        <button className='kategori py-2 px-4 text-center rounded-3' key={key} value={e} onClick={handleKategori}>
          {e}
        </button>
      ))}
    </div>
  );
};

export default CategoryBtn;
