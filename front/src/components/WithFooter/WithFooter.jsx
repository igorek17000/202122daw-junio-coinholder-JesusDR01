import { Outlet } from 'react-router-dom';
import React from 'react';
import Footer from 'components/Footer';

export const WithFooter = () => (
  <>
    <Outlet />
    <Footer />
  </>
);
