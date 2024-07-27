import React from 'react'
import { Button } from '../button'

function Header() {
  return (
    <div className='p-3 shadow-md bg-gradient-to-t from-blue-300 to-teal-100 flex justify-between items-center px-5 '>
        <img src="/logo.svg" alt="" />
        <div>
            <Button>Sign In</Button>
        </div>
    </div>
  )
}

export default Header