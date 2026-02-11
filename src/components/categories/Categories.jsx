import React, { useRef } from 'react';
import styles from './categories.module.css';
import Products from '../product/Products';

const CategoryFilter = ({ activeCategory = 'All', setActiveCategory = () => { }, searchTerm = '', currentPage = 1, setCurrentPage = () => { }, loadMore = false }) => {
    const categoriesContainerRef = useRef(null);

    const scroll = (offset) => {
        if (categoriesContainerRef.current) {
            categoriesContainerRef.current.scrollBy({ left: offset, behavior: 'smooth' });
        }
    };

    const categories = [
        'All', 'Chandeliers', 'Wall Lights', 'Pendants', 'Floor Lamps', 'Table Lamps',
        'Desk Lamps', 'Ceiling Lights', 'Sconces', 'Track Lighting', 'Minimalist',
        'Vintage', 'Modern', 'Contemporary', 'Crystal Fixtures', 'Brass Fixtures', 'Smart Lighting'
    ];

    return (
        <div id='catalog' className={styles.container}>
            <div className={styles.innerContainer}>
                <header className={styles.header}>
                    <span className={styles.subtitle}>Curated Selection</span>
                    <h3 className={styles.title}>Shop by Category</h3>
                </header>

                <div className={styles.filterWrapper}>
                    {/* Left Scroll Trigger */}
                    <button className={styles.navButton} onClick={() => scroll(-250)} aria-label="Scroll left">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M15 19l-7-7 7-7" /></svg>
                    </button>

                    <div className={styles.scrollArea}>
                        <div className={styles.categoriesList} ref={categoriesContainerRef}>
                            {categories.map((category) => (
                                <button
                                    key={category}
                                    onClick={() => setActiveCategory(category)}
                                    className={`${styles.categoryChip} ${activeCategory === category ? styles.active : ''}`}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                        {/* Elegant fade masks */}
                        <div className={styles.fadeLeft}></div>
                        <div className={styles.fadeRight}></div>
                    </div>

                    {/* Right Scroll Trigger */}
                    <button className={styles.navButton} onClick={() => scroll(250)} aria-label="Scroll right">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 5l7 7-7 7" /></svg>
                    </button>
                </div>
            </div>

            <Products
                category={activeCategory}
                searchTerm={searchTerm}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                loadMore={loadMore}
            />
        </div>
    );
};

export default CategoryFilter;