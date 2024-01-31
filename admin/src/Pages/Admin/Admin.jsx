import React from 'react';
import './Admin.css';
import Sidebar from '../../Components/Sidebar/Sidebar';
import { Routes, Route, useNavigate } from 'react-router-dom';
import AddProduct from '../../Components/AddProduct/AddProduct';
import ListProduct from '../../Components/ListProduct/ListProduct';
import Home from '../../Components/Home/Home';

const Admin = () => {
  const navigate = useNavigate();

  return (
    <div className='admin'>
      <Sidebar />
      <Routes>
        <Route
          path='/'
          element={
            <>
              {!['/addproduct', '/listproduct'].includes(window.location.pathname) && <Home />}
            </>
          }
        />
        <Route path='/addproduct' element={<AddProduct />} />
        <Route path='/listproduct' element={<ListProduct />} />
      </Routes>
    </div>
  );
};

export default Admin;
