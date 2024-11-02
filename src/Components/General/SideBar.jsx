import React from 'react'
import { Link } from 'react-router-dom';
import LOGO from '../../assets/211-removebg-preview.png'

function SideBar() {
    return (
      <aside className="h-screen p-4 bg-gray-200  w-60">
      <div className='flex justify-between mb-4'>
      <div><img src={LOGO} alt='logo' width={140} /></div>
      </div>
        <ul>
          <li><Link to='' className="block p-2">Utilisateurs</Link></li>
          <li><Link to='' className="block p-2">Matériels</Link></li>
          <li><Link to='' className="block p-2">Etudiants</Link></li>
          <li><Link to='' className="block p-2">Salles</Link></li>
          <li><Link to='' className="block p-2">Formations</Link></li>
          <li><Link to='' className="block p-2">Planning</Link></li>
          <li><Link to='' className="block p-2">Entrée</Link></li>
          <li><Link to='' className="block p-2">Sortie</Link></li>
          <li><Link to='' className="block p-2">Contrat</Link></li>
          <li><Link to='' className="block p-2">Présence</Link></li>
          <li><Link to='' className="block p-2">Departement</Link></li>
          <li><Link to='' className="block p-2">Paies</Link></li>
          {/* Ajoutez d'autres liens ici */}
        </ul>
      </aside>
    );
  }

export default SideBar