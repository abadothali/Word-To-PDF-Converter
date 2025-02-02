import React from 'react';

function Navbar() {
  return (
    <div className='max-w-screen-2xl mx-auto container px-6 py-2.5 md:px-40 shadow-lg h-16 fixed'>
      <div className='flex justify-between'>
        <h1 className='text-2xl cursor-pointer font-bold'>Word<span className='text-3xl text-red-800'>To</span>PDF</h1>
        <h1 className='text-2xl mt-1 hover:scale-125 duration-300 cursor-pointer font-bold'>Home</h1>
      </div>
    </div>
  )
}

export default Navbar;