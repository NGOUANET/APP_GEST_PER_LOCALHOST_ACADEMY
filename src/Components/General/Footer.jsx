import React from 'react';
import { Link } from 'react-router-dom';
import LOGO from '../../assets/211-removebg-preview.png'
const Footer = () => {
  return (
    <footer className="py-6 text-white bg-black">
      <div className="container flex flex-col justify-between mx-auto md:flex-row">
        <div className="mb-4 md:mb-0">
        <div className='flex justify-between mb-4 bg-white'>
      <div><img src={LOGO} alt='logo' width={140} /></div>
      </div>
          <p className="text-sm">L'école des métiers du digital.</p>
        </div>
        <div className="mb-4 md:mb-0">
          <h3 className="font-semibold text-center">Liens utiles</h3>
          <div className='relative mt-8 border-2 border-orange-600 w-14 left-20 bottom-6'></div>
          <ul className='flex gap-x-4'>
            <li><Link to='/accueil/' className="text-white hover:text-orange-600">Accueil</Link></li>
            <li><Link to='/annonce' className="text-white hover:text-orange-600">Annonce</Link></li>
            <li><Link to='/home/' className="text-white hover:text-orange-600">Home</Link></li>
            <li><Link to='/login/' className="text-white hover:text-orange-600">Login</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold">Suivez-nous</h3>
          <div className="flex space-x-4">
          <Link to='/' className=""> <i className="text-2xl text-white fab fa-facebook"></i></Link>
            <Link to='/' className=""> <i className="text-3xl text-white fab fa-twitter"></i></Link>
            <Link to='/' className=""> <i className="text-3xl text-white fab fa-whatsapp"></i></Link>
            <Link to='/' className=""> <i className="text-3xl text-white fab fa-linkedin"></i></Link>
          </div>
        </div>
      </div>
      <div className="mt-4 text-center">
        <p className="text-sm">&copy; {new Date().getFullYear()} LOCALHOST ACADEMY. Tous droits réservés.</p>
      </div>
    </footer>
  );
};

export default Footer;
