import React from "react";
import { useState } from 'react'
import LOGO from '../../assets/211.png'
import { Link } from 'react-router-dom';



function NavBar1({text}) {
  let Links = [
    { name: "Accueil", link: "/accueil/" },
    { name: "Annonce", link: "/annonce/" },

  ];

  let [open, setOpen] = useState(false);
  return (
    <div className='py-1 flex  md:px-14 px-1 justify-between bg-white shadow-md w-full fixed top-0 left-0 cursor-pointer z-30'>
      <div><img src={LOGO} alt='logo' width={140} /></div>

      <div onClick={() => setOpen(!open)} className='text-xl absolute right-12 top-2 cursor-pointer '>
      </div>
      <ul className={`md:flex gap-x-6 relative md:pb-0 pb-12 md:static md:z-auto z-[-1] md:pl-0 pl-9 transition-all duration-500 ease-in ${open ? 'top-6' : 'top-[-490px]'}`}>
        {
          Links.map((link) => (
            <li key={link.name} className='md:ml-8 text-xl md:my-0 my-7'>
              <a href={link.link} className='text-black-800 hover:text-orange-400 duration-500'>{link.name}</a>
            </li>
          ))
        }
      </ul>
    </div>
  )
}

export default NavBar1;