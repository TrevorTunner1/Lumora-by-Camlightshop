import React, { useRef } from 'react';
import styles from './categories.module.css';
import Products from '../product/Products';

const CategoryFilter = ({ activeCategory = 'All', setActiveCategory = () => { }, searchTerm = '', currentPage = 1, setCurrentPage = () => { }, loadMore = false }) => {
    const categoriesContainerRef = useRef(null);

    const scrollLeft = () => {
        if (categoriesContainerRef.current) {
            categoriesContainerRef.current.scrollBy({ left: -200, behavior: 'smooth' });
        }
    };

    const scrollRight = () => {
        if (categoriesContainerRef.current) {
            categoriesContainerRef.current.scrollBy({ left: 200, behavior: 'smooth' });
        }
    };

    const categories = [
        'All',
        'Chandeliers',
        'Wall Lights',
        'Pendants',
        'Floor Lamps',
        'Table Lamps',
        'Desk Lamps',
        'Ceiling Lights',
        'Sconces',
        'Track Lighting',
        'Recessed Lighting',
        'Outdoor Lighting',
        'Bathroom Lighting',
        'Kitchen Lighting',
        'Bedroom Lighting',
        'Living Room Lighting',
        'Entryway Lighting',
        'Corridor Lighting',
        'Accent Lighting',
        'Decorative Lighting',
        'Minimalist',
        'Vintage',
        'Modern',
        'Contemporary',
        'Rustic',
        'Industrial',
        'Art Deco',
        'Crystal Fixtures',
        'Brass Fixtures',
        'Glass Fixtures',
        'Smart Lighting'
    ];

    return (
        <div id='catalog' className={styles.container}>

            <div className={styles.innerContainer}>
                <h3 className={styles.title}>
                    Filter by Category
                </h3>

                <div className={styles.buttonsWrapper}>
                    {/* Left scroll button */}
                    <button className={styles.scrollButton} onClick={scrollLeft}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2">
                            <path d="M15 18l-6-6 6-6" />
                        </svg>
                    </button>

                    {/* Category buttons container */}
                    <div className={styles.categoriesContainer} ref={categoriesContainerRef}>
                        {categories.map((category) => {
                            const isActive = activeCategory === category;
                            return (
                                <button
                                    key={category}
                                    onClick={() => setActiveCategory(category)}
                                    className={`${styles.categoryButton} ${isActive ? styles.active : ''}`}
                                >
                                    {category}
                                </button>
                            );
                        })}
                    </div>

                    {/* Right scroll button */}
                    <button className={styles.scrollButton} onClick={scrollRight}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2">
                            <path d="M9 18l6-6-6-6" />
                        </svg>
                    </button>
                </div>
            </div>
            <Products category={activeCategory} searchTerm={searchTerm} currentPage={currentPage} setCurrentPage={setCurrentPage} loadMore={loadMore} />
        </div>
    );
};

export default CategoryFilter;