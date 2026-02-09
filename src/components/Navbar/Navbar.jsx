import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/cart-context';
import styles from './navbar.module.css';

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const { cartCount, setShowCart } = useCart(); // Get cart count and toggle function

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const handleCartClick = () => {
        setShowCart(true); // Open cart sidebar
        setMenuOpen(false); // Close mobile menu if open
    };

    return (
        <nav className={styles.navbar}>
            <div className={styles['brand-name']}>
                <a href="/">LAMOURA</a>
            </div>
            <button
                className={styles['hamburger']}
                onClick={toggleMenu}
                aria-label="Toggle menu"
            >
                <span className={`${styles['hamburger-line']} ${menuOpen ? styles.active : ''}`}></span>
                <span className={`${styles['hamburger-line']} ${menuOpen ? styles.active : ''}`}></span>
                <span className={`${styles['hamburger-line']} ${menuOpen ? styles.active : ''}`}></span>
            </button>
            <ul className={`${styles['nav-links']} ${menuOpen ? styles['nav-open'] : ''}`}>
                <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
                <a href="/catalog" onClick={() => setMenuOpen(false)}>Collection</a>
                <Link to="/about" onClick={() => setMenuOpen(false)}>Bespoke</Link>
                <a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
            </ul>
            <div className={styles['cart-icon']}>
                <button
                    onClick={handleCartClick}
                    className={styles['cart-link']}
                    aria-label="View cart"
                    style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={styles['cart-svg']} aria-hidden="true">
                        <circle cx="9" cy="21" r="1"></circle>
                        <circle cx="20" cy="21" r="1"></circle>
                        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                    </svg>
                    <span className={styles['cart-count']}>{cartCount}</span>
                </button>
            </div>
        </nav>
    );
};

export default Navbar;