import React from 'react';
import img from '../../assets/hero/img2.jpg';
import Button from './Button';
import {Link} from 'react-router-dom';



function Section1 () {
    
  return (
      <div
      className="h-screen w-full bg-cover bg-center"
      style={{ backgroundImage: `url(${img})` }}
    >
      <div className="flex flex-col  items-center justify-center h-full bg-black bg-opacity-50">
        <h1 className="text-white text-6xl m-8 text-center">Bienvenue à LOCALHOST ACADEMY</h1>
        <Button className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in`} >
         <Link to="/login/" label='Login' rel="noopener noreferrer">Login</Link>
        </Button>
      </div>
    </div>
  
  );
}

 

export default Section1