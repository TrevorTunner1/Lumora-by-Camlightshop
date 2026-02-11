import React, { useState } from "react";
import Categories from '../categories/Categories'
import Footer from "../Footer/Footer";
import styles from "./catalog.module.css";
import Navbar from "../Navbar/Navbar";
const Catalog = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [activeCategory, setActiveCategory] = useState('All');
    const [currentPage, setCurrentPage] = useState(1);

    const handleCategoryChange = (category) => {
        setActiveCategory(category);
        setCurrentPage(1);
    };

    return (
        <section id="catalog" className={styles.catalog} >
            <Navbar />
            <div className={styles.container}>
                <form action="" className={styles.searchForm} onSubmit={(e) => e.preventDefault()}>
                    <input
                        type="text"
                        id="search"
                        name="search"
                        placeholder="search for a product..."
                        value={searchTerm}
                        onChange={(e) => {
                            setSearchTerm(e.target.value);
                            setCurrentPage(1);
                        }}
                    />
                </form>
                <Categories
                    activeCategory={activeCategory}
                    setActiveCategory={handleCategoryChange}
                    searchTerm={searchTerm}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />
            </div>
            <Footer />
        </section>
    )
}

export default Catalog;