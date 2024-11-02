import React from 'react'
import imag from './../../assets/hero/img1.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import TestimonialCarousel from './TestimonialCarousel';
import ProposDeNous from './ProposDeNous';
import Footer from './Footer';


function Hero1() {
  const [suggestion, setSuggestion] = useState('');
  const [suggestionsList, setSuggestionsList] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (suggestion.trim()) {
      setSuggestionsList([...suggestionsList, suggestion]);
      setSuggestion('');
    }
  };
  return (
    <section className='h-full max-h-[640px] mb-8 xl:mb-24'>
      <div className='flex flex-col lg:flex-row'>
        <div className='lg:ml-8 xl:ml-[135px] flex flex-col items-center lg:items-start text-center lg:text-left justify-center flex-1 px-4 lg:px-0'>
          <h1 className='text-4xl lg:text-[58px] font-semibold leading-none mb-6'><span className='text-orange-600'>LOCALHOST ACADEMY</span> L'ecole des metiers du digital.</h1>
          <p className='max-w-[480px] mb-8'>
            Annoncez le déploiement d'une nouvelle plateforme e-learning, en présentant ses fonctionnalités et commentez y accéder
          </p>
        </div>
        <div className='hidden flex-1 lg:flex justify-center items-center py-2'>
          <div className='rounded-l-full overflow-hidden relative mt-8'>
            <img src={imag} alt='' width={500} height={1000} className=' mr-20  transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-105  duration-300' /></div>
        </div>
      </div>



      <div className='mt-12'>
        <div className='bg-orange-600 p-12 rounded-full'>
          <h1 className='text-4xl lg:text-[58px] font-semibold text-white text-center'>Nous offrons un engagement complet.</h1>
          <p className='text-center m-8 text-white text-xl'>Un plan de carrière bénéfique et enrichissant pour vous.</p>
        </div>
        <div className='mt-20'>
          <div className='flex justify-between   bg-white  z-10'>
            <div className='m-12 relative left-8 border-transparent drop-shadow-2xl bg-orange-100 p-8 transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-80  duration-300 hover:cursor-pointer'>
              <h2 className='text-xl'>Branchez sur le monde.  <i className="fas fa-globe text-black text-3xl"></i></h2>
            </div>
            <div className='m-12 relative right--12 border-transparent drop-shadow bg-orange-100 p-8 transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-80  duration-300 hover:cursor-pointer'>
              <h2 className='text-xl'>Nos missions sur <span className='text-orange-600 font-semibold text-3xl'>l'integration <br /> l'accompagnement</span>et  des jeunes. <i className='fas fa-handshake text-black  text-3xl'></i></h2>
            </div>
            <div className='m-12 relative right-12 border-transparent drop-shadow bg-orange-100 p-8 transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-80  duration-300 hover:cursor-pointer'>
              <h2 className='text-xl'>Vous avez <span className='text-orange-600 font-semibold text-3xl'>raison</span> <br />d'agir maintenant. <i className='fas fa-laptop text-black text-3xl'></i> </h2>
            </div>
          </div>
        </div>



        <div className="max-w-md mx-auto mt-10 p-5 border rounded-lg shadow-lg bg-orange-400">
          <h2 className="text-2xl font-bold mb-4">Boîte à Suggestions</h2>
          <form onSubmit={handleSubmit}>
            <textarea
              className="w-full p-2 border rounded-lg mb-4"
              rows="4"
              placeholder="Écrivez votre suggestion ici..."
              value={suggestion}
              onChange={(e) => setSuggestion(e.target.value)}
              required
            />
            <button
              type="submit"
              className="w-full bg-orange-600 text-white p-2 rounded-lg hover:bg-orange-300 transition">
              Soumettre
            </button>

            {suggestionsList.length > 0 && (
              <div className="mt-5">
                <h3 className="text-lg font-semibold mb-2">Suggestions soumises :</h3>
                <ul className="list-disc list-inside">
                  {suggestionsList.map((item, index) => (
                    <li key={index} className="mb-1">{item}</li>
                  ))}
                </ul>
              </div>
            )}
          </form>
        </div>

        <div className='mt-8'>
          <ProposDeNous />
        </div>

        <div className='mt-14'>
          <h1 className='text-3xl font-semibold m-8 text-center '>Temoignage de nos employés et étudiants</h1>
          <div className='border-2 border-orange-600 w-32 relative left-96 bottom-6'></div>
          <TestimonialCarousel />
        </div>
      </div>
      <Footer />
    </section>

  )
}

export default Hero1