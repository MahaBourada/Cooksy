import React from 'react'
import { UserRound } from 'lucide-react';
import { IconButton } from '../Global/Buttons';
import { Link } from 'react-router-dom';

const NoSearchHeader = () => {
  return (
    <header className='relative px-8 pt-7 pb-14 bg-[url("assets/vectors/small_bottom_shape.svg")] bg-bottom bg-cover'>
      <div className='flex justify-between items-center'>
        <img src='/assets/vectors/Logo.svg' alt="Logo" className='w-60 h-auto' />
        <nav className='flex items-center space-x-4'>
          <ul className='flex justify-between items-center list-none text-xl p-2'>
            <li className='m-2 hover:underline hover:translate-x-[1px] hover:translate-y-[1px]'>
              <Link to='/'>Accueil</Link>
            </li>
            <li className='m-2 hover:underline hover:translate-x-[1px] hover:translate-y-[1px]'>
              <Link to='/recettes'>Liste des recettes</Link>
            </li>
          </ul>
          <Link to='/connexion'>
            <IconButton icon={<UserRound color="#0F0F0F" />} label="Connexion" />
          </Link>
        </nav>
      </div>
    </header>
  )
}

export default NoSearchHeader