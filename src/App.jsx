import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './components/home/Home';
import About from './components/OtherComponents/About';
import Catalog from './components/ProductCatalog/catalog';
import { CartProvider } from './components/context/cart-context';
import { SearchProvider } from './components/context/search-context';

function App() {
  return (
    <SearchProvider>
      <CartProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/catalog" element={<Catalog />} />
          </Routes>
        </Router>
      </CartProvider>
    </SearchProvider>
  );
}

export default App;