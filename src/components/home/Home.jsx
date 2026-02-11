import React, { useState, useEffect } from 'react';
import styles from './home.module.css';
import Navbar from '../Navbar/Navbar';
import Categories from '../categories/Categories';
import Footer from '../Footer/Footer';

const HERO_SLIDES = [
    {
        id: 1,
        title: "Lumora Elegance",
        subtitle: "EST. 2026",
        image: "/public/images/patrick-schneider-mFnbFaCIu1I-unsplash (1).jpg"
    },
    {
        id: 2,
        title: "Modern Luxe",
        subtitle: "HANDMADE COLLECTION",
        image: "/public/images/hero_background_image.jpg"
    },
    {
        id: 3,
        title: "Bespoke Art",
        subtitle: "CUSTOM DESIGNS",
        image: "/public/images/waldemar-brandt-QxUszVGKt98-unsplash.jpg"
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
                            <button className={styles.exploreBtn}>Explore Catalog</button>
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

            <section id="catalog" className={styles.homeCatalog}>
                <Categories
                // activeCategory={activeCategory}
                // setActiveCategory={setActiveCategory}
                // searchTerm={searchTerm}
                />
            </section>
            <Footer />
        </div>
    );
};

export default Home;


