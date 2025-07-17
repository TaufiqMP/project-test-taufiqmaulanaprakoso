import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Bannerpict from './assets/images/banner.jpg';
import Header from './assets/components/header.jsx';
import Banner from "./assets/components/banner.jsx";
import Pagination from "./assets/components/pagination.jsx"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Header />
    <Banner imageUrl={Bannerpict} />
    <Pagination />
  </StrictMode>,
)
