import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
/*import { BrowserRouter, Routes, Route} from 'react-router-dom';*/
import { BrowserRouter, Routes, Route,} from 'react-router-dom';
import NavBar1 from './Components/General/Navbar1';
import Annonces from './Pages/Annonces';
import General from './Pages/General';
import Accueil from './Pages/Accueil';
import Home from './Pages/Home';
import Login from './Pages/Login';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <Routes>
    {/* <Route path="/no-navBar1" element={<Home />} /> */}
    <Route path="/home" element={<Home />} />
    </Routes>
      {/* <div className=' hidden'>
        <NavBar1 />
      </div> */}
      {window.location.pathname !== '/home/' && <NavBar1 />}
      <div className='content'>
        <Routes>
          <Route path="/" element={<Accueil />} />
          <Route path="/accueil/" element={<Accueil />} /> 
          <Route path="/login" element={<Login />} />
          <Route path="/general" element={<General />} />
          <Route path="/annonce/" element={<Annonces />} />
        </Routes>
      </div>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
