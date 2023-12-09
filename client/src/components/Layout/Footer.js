import React from 'react'
import { Link } from 'react-router-dom';
import About from './../../pages/About';
import Contact from './../../pages/Contact';
import Policy from './../../pages/Policy';

const Footer = () => {
  return (
    <div className="footer">
        <h1 className='text-center'>
            All right Reserved &copy; panton8
        </h1>
        <p className='text-center mt-3'>
          <Link to="/about">About</Link>

          <Link to="/contact">Contact</Link>

          <Link to="/policy">Privacy Policy</Link>
        </p>
    </div>
  );
};

export default Footer;