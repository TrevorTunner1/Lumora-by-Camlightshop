import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../Footer/Footer';
import styles from './About.module.css';

const About = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <>
            <nav className={styles.navbar}>
                <div className={styles['brand-name']}>
                    <Link to="/">LAMOURA</Link>
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
                    <a href="/#catalog" onClick={() => setMenuOpen(false)}>Collection</a>
                    <Link to="/about" onClick={() => setMenuOpen(false)}>Bespoke</Link>
                    <a href="/#contact" onClick={() => setMenuOpen(false)}>Contact</a>
                </ul>
            </nav>
            <section className={styles.about} id="about">
                <h1 className={styles.title}>About LAMOURA</h1>
                <p className={styles.description}>Essentials is a carefully curated collection of timeless products designed to enhance everyday living. We believe that good design is simple, functional, and beautiful.</p>
                <ul>
                    <li>
                        <h2 className={styles.subtitle}>Our Mission</h2>
                        <p className={styles.text}>We are committed to providing our customers with high-quality essentials that stand the test of time. Every product in our collection is thoughtfully selected based on design, durability, and craftsmanship.</p>
                    </li>
                    <li>
                        <h2 className={styles.subtitle}>Our Vision</h2>
                        <p className={styles.text} >To be the leading source for timeless, high-quality home essentials that inspire and elevate everyday living.</p>
                    </li>
                    <li>
                        <h2 className={styles.subtitle}>Our Values</h2>
                        <p className={styles.text}>Quality, Simplicity, Functionality, Customer Satisfaction, Sustainability.</p>
                    </li>
                    <li>
                        <h2 className={styles.subtitle}>Our Story</h2>
                        <p className={styles.text}>Founded in 2026, LAMOURA began with a simple idea: to create a collection of essentials that combine timeless design with everyday functionality. Over the years, we have grown into a trusted brand known for our commitment to quality and customer satisfaction.</p>
                    </li>
                    <li>
                        <h2 className={styles.subtitle}>Why Choose Us?</h2>
                        <p className={styles.text}>At LAMOURA, we understand the importance of having reliable, well-designed essentials in your home. Our products are selected with care, ensuring that each item meets our high standards for quality and design. We are dedicated to providing exceptional customer service and building lasting relationships with our customers.</p>
                    </li>
                </ul>
                <ul>
                    <h2 className={styles.subtitle}>Our Values</h2>
                    <li className={styles.text}>Minimalism: Simplicity in design and function</li>
                    <li className={styles.text}>Quality: Excellence in craftsmanship</li>
                    <li className={styles.text}>Sustainability: Responsible sourcing and production</li>
                    <li className={styles.text}>Community: Building relationships with our customers</li>
                </ul>
            </section>
            <Footer />
        </>
    )
}

export default About;