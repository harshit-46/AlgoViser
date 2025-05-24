import { Routes , Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import About from './Components/About';
import Simulator from './Components/Simulator';
import Blog from './Components/Blog';
import Contact from './Components/Contact';
import Footer from './Components/Footer';
import ScrollToTop from './Components/ScrollToTop';
import './App.css';

function App() {
  return (
    <div className='bg-gradient-to-br from-black via-[#090B1F] to-black'>
      <ScrollToTop/>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/simulator" element={<Simulator />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer/>
    </div>
  )
}

export default App