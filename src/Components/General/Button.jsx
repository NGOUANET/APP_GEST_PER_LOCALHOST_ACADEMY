import React from 'react'

const Button = (props) => {
  return (
    <button className='bg-white text-black m-2 text-2xl font-[Poppins] py-2 px-8 rounded md:ml-8 hover:bg-orange-400 hover:text-white 
    duration-500 transition ease-in-out delay-150 bg-white-500 hover:-translate-y-1 hover:scale-110 hover:bg-orange-500 duration-300'>
      {props.children}
    </button>
  )
}

export default Button
