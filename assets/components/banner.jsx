import { useState } from 'react'
import banner from '../images/banner.jpg';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div
      className="relative h-[400px] bg-cover bg-center mb-20"
      style={{
        backgroundImage: `url(${banner})`,
        clipPath: 'polygon(0 0, 100% 0, 100% 60%, 0% 100%)',
      }}
    >
      <div className="h-full flex items-center justify-center text-white">
        <div className="text-center">
          <h1 className="text-4xl font-weight-500">Ideas</h1>
          <p className="text-lg">Where all our great things begin</p>
        </div>
      </div>
    </div>
    </>
  )
}

export default App
