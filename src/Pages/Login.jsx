import React from 'react'
import Form from '../Components/General/Form';
import img from '../assets/hero/img3.jpg';

function Login() {
  return (
    <div style={{ backgroundImage: `url(${img})` }} className='h-screen w-full bg-cover bg-center  bg-black bg-opacity-50'>
      <Form />
    </div>
  )
}

export default Login