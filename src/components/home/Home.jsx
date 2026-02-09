import React, { useState } from 'react';
import styles from './home.module.css';
import Navbar from '../Navbar/Navbar';
import Categories from '../categories/Categories';
import Footer from '../Footer/Footer';

const Home = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [activeCategory, setActiveCategory] = useState('All');
    const [currentPage, setCurrentPage] = useState(1);

    const handleCategoryChange = (category) => {
        setActiveCategory(category);
        setCurrentPage(1);
    };

    return (
        <div className={styles.home} id='home'>
            <div className={styles.container}>
                <Navbar />

                <header className={styles.hero}>
                    <p>Est. 2026</p>
                    <h2>Lumora by Camlightshop</h2>
                    <a href="/catalog" className={styles['explore-btn']}>Explore Catalog</a>
                </header>
                <section id="catalog" className={styles.homeCatalog}>
                    <Categories
                        activeCategory={activeCategory}
                        setActiveCategory={handleCategoryChange}
                        searchTerm={searchTerm}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                        loadMore={true}
                    />
                </section>
                <Footer />
            </div>
        </div>
    );
};

export default Home;
