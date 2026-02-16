import React, { useState, useEffect } from 'react';
import styles from './home.module.css';
import Navbar from '../Navbar/Navbar';
import Categories from '../categories/Categories';
import Footer from '../Footer/Footer';
import Products from '../product/Products';
import { Link } from 'react-router-dom';
const HERO_SLIDES = [
    {
        id: 1,
        title: "Lumora Elegance",
        subtitle: "EST. 2026",
        image: "/images/patrick-schneider-mFnbFaCIu1I-unsplash (1).jpg"   // ← add / at start, remove public
    },
    {
        id: 2,
        title: "Modern Luxe",
        subtitle: "HANDMADE COLLECTION",
        image: "/images/hero_background_image.jpg"
    },
    {
        id: 3,
        title: "Bespoke Art",
        subtitle: "CUSTOM DESIGNS",
        image: "/images/waldemar-brandt-QxUszVGKt98-unsplash.jpg"
    }
];

const Home = () => {
    const [current, setCurrent] = useState(0);

    // Auto-slide every 10 seconds
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent((prev) => (prev === HERO_SLIDES.length - 1 ? 0 : prev + 1));
        }, 10000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className={styles.home}>
            <Navbar />

            <div className={styles.heroContainer}>
                {HERO_SLIDES.map((slide, index) => (
                    <div
                        key={slide.id}
                        className={`${styles.slide} ${index === current ? styles.active : ''}`}
                    >
                        {/* Image Layer */}
                        <div className={styles.imageWrapper}>
                            <img src={slide.image} alt={slide.title} className={styles.heroImage} />
                            <div className={styles.overlay}></div>
                        </div>

                        {/* Text Overlay Layer */}
                        <div className={styles.content}>
                            <p className={styles.subtitle}>{slide.subtitle}</p>
                            <h2 className={styles.title}>{slide.title}</h2>
                            <Link to="/catalog" className={styles.exploreLink}>Explore Catalog</Link>
                        </div>
                    </div>
                ))}

                {/* Dots Indicator */}
                <div className={styles.dots}>
                    {HERO_SLIDES.map((_, i) => (
                        <span key={i} className={i === current ? styles.dotActive : styles.dot}></span>
                    ))}
                </div>
            </div>

            <header className={styles.header}>
                <span className={styles.subtitle}>Curated Selection</span>
                <h3 className={styles.headerTitle}>Lumora by camlightshop</h3>
            </header>

            <section id="catalog" className={styles.homeCatalog}>
                <Products view="home" />

                <div className={styles.viewAll}>
                    <a href="/catalog" className={styles.view}>VIEW ALL PRODUCT</a>
                </div>
            </section>
            <section className={styles.features}>
                <div className={styles.featureGrid}>
                    <div className={styles.featureItem}>
                        <span className={styles.icon}>✦</span>
                        <h4>Handcrafted in Nigeria</h4>
                        <p>Every piece is thoughtfully designed and assembled with premium materials.</p>
                    </div>
                    <div className={styles.featureItem}>
                        <span className={styles.icon}>🚚</span>
                        <h4>Fast Delivery to PH & Beyond</h4>
                        <p>Reliable shipping across Rivers State and nationwide.</p>
                    </div>
                    <div className={styles.featureItem}>
                        <span className={styles.icon}>♻️</span>
                        <h4>Sustainable Luxury</h4>
                        <p>Eco-conscious materials without compromising elegance.</p>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    );
};

export default Home;


