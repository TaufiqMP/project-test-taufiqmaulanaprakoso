import { useState } from 'react'
import logoSuit from './assets/images/logo-suit.png'
import viteLogo from '/vite.svg'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div className="flex bg-[#f56a0a] h-[70px] sticky top-0 m-0 z-1000">
      <div className='flex-1 flex items-center justify-center'>
        <img src={logoSuit} alt="Suitmedia Logo" className='h-[70px] w-auto'/>
      </div>
      <div className='ml-100 flex-2 flex justify-center gap-6 items-center font-montserrat text-white font-weight-500'>
          <a href="#" class="relative pb-2 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full">Work</a>
          <a href="#" class="relative pb-2 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full">About</a>
          <a href="#" class="relative pb-2 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full">Services</a>
          <a href="#" class="relative pb-2 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full">Careers</a>
          <a href="#" class="relative pb-2 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full">Contact</a>
      </div>
    </div>
    </>
  )
}

export default App
