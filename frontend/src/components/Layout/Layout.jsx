import React from 'react'
import Routers from '../../router/Routers';
import Footer from '../Footer/Footer';
import Navbar from '../Navbar/Navbar';
import ChatWidget from '../Chat/ChatWidget';

const Layout = () => {
  return (
    <>
      <Navbar />
      <div style={{ paddingTop: '100px' }}>
        <Routers />
        <Footer />
      </div>
      <ChatWidget />
    </>
  );
};

export default Layout;
