import React, { useState } from "react";
import Categories from '../categories/Categories'
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";
import styles from "./catalog.module.css";

const Catalog = () => {
    const [activeCategory, setActiveCategory] = useState('All');

    return (
        <section id="catalog" className={styles.catalog}>
            <Navbar />
            <div className={styles.container}>
                <header className={styles.catalogHeader}>
                    <h1>Our Collection</h1>
                    <p>Discover lighting that defines your space.</p>
                </header>

                <Categories
                    activeCategory={activeCategory}
                    setActiveCategory={setActiveCategory}
                />

                {/* <Products
                    view="catalog"
                    activeCategory={activeCategory}
                /> */}
            </div>
            <Footer />
        </section>
    );
};

export default Catalog;