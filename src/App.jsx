// App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.css';

import Home from './components/home/Home';
import About from './components/OtherComponents/About';
import Catalog from './components/ProductCatalog/catalog';

import { CartProvider } from './components/context/cart-context';
import { SearchProvider } from './components/context/search-context';

import Login from './components/authentication/login';
import ProtectedAdmin from './components/authentication/admin-panel/ProtectedAdmin';
import AdminPanel from './components/authentication/admin-panel/AdminPanel';
import PublicOnlyRoute from './components/authentication/admin-panel/PublicOnlyRoute';

function App() {
  return (
    <CartProvider>
      <SearchProvider>
        <BrowserRouter>
          <Routes>

            {/* Public routes – everyone can access these */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/catalog" element={<Catalog />} />

            {/* Admin login – public (no protection) */}
            <Route element={<PublicOnlyRoute />}>
              <Route path="/admin-login" element={<Login />} />
            </Route>

            {/* Protected admin area – wrap once, add many pages later */}
            <Route element={<ProtectedAdmin />}>
              <Route path="/admin" element={<AdminPanel />} />
              {/* Example future routes */}
              {/* <Route path="/admin/products" element={<AdminProducts />} /> */}
              {/* <Route path="/admin/orders" element={<AdminOrders />} />   */}
            </Route>

            {/* Optional: 404 catch-all */}
            <Route path="*" element={<div>404 - Page not found</div>} />

          </Routes>
        </BrowserRouter>
      </SearchProvider>
    </CartProvider>
  );
}

export default App;