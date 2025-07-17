import { useState, useEffect } from 'react'
import logoSuit from '../images/logo-suit.png'

export default function Header() {
  const [showHeader, setShowHeader] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setShowHeader(false) // scroll down -> hide
      } else {
        setShowHeader(true) // scroll up -> show
      }
      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  return (
    <div
      className={`
        fixed top-0 left-0 w-full z-50
        transition-all duration-500 ease-in-out
        bg-[rgba(237,99,40,0.9)]
      `}
      style={{
        transform: showHeader ? 'translateY(0)' : 'translateY(-100%)',
        opacity: showHeader ? 1 : 0,
      }}
    >
      <div className="flex h-[70px] px-6 justify-between items-center">
        <img src={logoSuit} alt="Suitmedia Logo" className="h-[70px] w-auto ml-20" />
        <div className="flex gap-6 items-center font-montserrat text-white font-weight-550 mr-25">
          {['Work', 'About', 'Services', 'Ideas', 'Careers', 'Contact'].map((item) => (
            <a
              key={item}
              href="#"
              className="relative pb-2 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full"
            >
              {item}
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
