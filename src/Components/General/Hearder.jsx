import React from 'react'
import Button from './Button';
import { Link } from 'react-router-dom';

function Hearder() {
    return (
      <header className="p-4 text-white bg-gray-800">
      <Button className={`md:flex justify-between relative right-6 transition-all duration-500 ease-in`} >
         <Link to="/" label='Login' rel="noopener noreferrer">Deconnexion</Link>
        </Button>
        <h1 className="text-lg">Tableau de Bord</h1>
      </header>
    );
  }
  
export default Hearder