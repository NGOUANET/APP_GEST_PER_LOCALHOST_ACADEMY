import React, { useState } from 'react';
import Image1 from '../../assets/hero/img5.jpg';
import Image2 from '../../assets/hero/img7.jpg';
import Image3 from '../../assets/hero/img6.jpg';

const testimonies = [
  {
    id: 1,
    image: Image1, 
    text: 'Tres ravie de travailler dans cette structure, bonne ambiance et le personnel est chalereux.',
    author: 'Professeur Eras Kono'
  },
  {
    id: 2,
    image: Image2,
    text: 'Une expérience formidable, je recommande vivement !',
    author: 'Nelie patricia, etudiante'
  },
  {
    id: 3,
    image: Image3,
    text: 'Un service exceptionnel et une équipe fantastique.',
    author: 'Albert Zomo, etudiant'
  }
];

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonies.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonies.length) % testimonies.length);
  };

  return (
    <div className="relative w-full max-w-lg mx-auto">
      <div className="overflow-hidden rounded-lg">
        <img
          src={testimonies[currentIndex].image}
          alt={`Témoignage de ${testimonies[currentIndex].author}`}
          className="w-full h-64 object-cover"
        />
        <div className="p-4 bg-white shadow-lg rounded-lg">
          <p className="text-gray-600 italic">{testimonies[currentIndex].text}</p>
          <h3 className="font-bold">{testimonies[currentIndex].author}</h3>
        </div>
      </div>
      <div className="absolute inset-y-0 left-0 flex items-center">
        <button onClick={prevTestimonial} className="bg-gray-800 text-white p-2 rounded-full">
          &lt;
        </button>
      </div>
      <div className="absolute inset-y-0 right-0 flex items-center">
        <button onClick={nextTestimonial} className="bg-gray-800 text-white p-2 rounded-full">
          &gt;
        </button>
      </div>
    </div>
  );
};

export default Carousel;
