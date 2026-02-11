import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/cart-context';
import styles from './navbar.module.css';

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const { cartCount, setShowCart } = useCart();

    const toggleMenu = () => setMenuOpen(!menuOpen);

    return (
        <nav className={styles.navbar}>
            {/* 1. Brand Logo */}
            <Link to="/" className={styles['brand-name']}>
                LAMOURA
            </Link>

            {/* 2. Central Navigation */}
            <ul className={`${styles['nav-links']} ${menuOpen ? styles['nav-open'] : ''}`}>
                <li><Link to="/" onClick={() => setMenuOpen(false)}>Home</Link></li>
                <li><a href="/catalog" onClick={() => setMenuOpen(false)}>Collection</a></li>
                <li><Link to="/about" onClick={() => setMenuOpen(false)}>Bespoke</Link></li>
                <li><a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a></li>
            </ul>

            {/* 3. Actions (Search + Cart + Mobile Menu) */}
            <div className={styles['nav-actions']}>
                <div className={styles['search-container']}>
                    <svg className={styles['search-icon']} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                    </svg>
                    <input type="text" placeholder="Search products..." className={styles['search-input']} />
                </div>

                <button onClick={() => setShowCart(true)} className={styles['cart-link']} aria-label="View cart">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={styles['cart-svg']}>
                        <circle cx="9" cy="21" r="1"></circle>
                        <circle cx="20" cy="21" r="1"></circle>
                        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                    </svg>
                    {cartCount > 0 && <span className={styles['cart-count']}>{cartCount}</span>}
                </button>

                <button className={styles.hamburger} onClick={toggleMenu}>
                    <div className={styles['hamburger-line']}></div>
                    <div className={styles['hamburger-line']}></div>
                    <div className={styles['hamburger-line']}></div>
                </button>
            </div>
        </nav>
    );
};

export default Navbar;