import { useState, useEffect } from 'react'

function Banner({ imageUrl }) {
  const [offsetY, setOffsetY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setOffsetY(window.scrollY)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div
      className="relative h-[500px] bg-cover bg-center overflow-hidden mb-20"
      style={{
        backgroundImage: `url(${imageUrl})`,
        clipPath: 'polygon(0 0, 100% 0, 100% 85%, 0% 100%)',
        backgroundPositionY: `${offsetY * 0.5}px`, 
      }}
    >
      <div className="h-full flex items-center justify-center text-white">
        <div className="text-center" style={{ transform: `translateY(${offsetY * 0.2}px)` }}>
          <h1 className="text-4xl font-bold">Ideas</h1>
          <p className="text-lg">Where all our great things begin</p>
        </div>
      </div>
    </div>
  )
}

export default Banner
