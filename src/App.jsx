import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './components/home/Home'
import About from './components/OtherComponents/About'
import Catalog from './components/ProductCatalog/catalog'
import { CartProvider } from './components/context/cart-context' // Import CartProvider

function App() {
  return (
    <CartProvider> {/* Wrap everything with CartProvider */}
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/catalog" element={<Catalog />} />
        </Routes>
      </Router>
    </CartProvider>
  )
}

export default App
