import React from 'react';
import { Outlet } from 'react-router-dom';
import Nvbar from './NvBar';
import './Layout.css';  // Import the CSS file

const Layout = () => {
    console.log('Layout component rendered');

  return (
    <div>
      <Nvbar  />
      {/* Dynamic Content */}
      <div className="content">
        <Outlet />  {/* This will render the content of the current route */}
      </div>
    </div>
  );
};

export default Layout;
