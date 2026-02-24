import React, { useState, useEffect } from "react";
import { useCart } from '../context/cart-context';
import { useSearch } from '../context/search-context';
import { useProducts } from '../authentication/admin-panel/admin-products/UseProducts';
import styles from "./product.module.css";

const Products = ({ view = "catalog", activeCategory = "All" }) => {
    const { addToCart } = useCart();
    const { searchTerm } = useSearch();
    const { products, loading } = useProducts(); // 👈 live data from Firebase

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, activeCategory]);

    const filteredProducts = products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = activeCategory === "All" || product.category === activeCategory;
        return matchesSearch && matchesCategory;
    });

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

    if (loading) return <p style={{ textAlign: 'center', padding: '3rem' }}>Loading products…</p>;

    // View: Home (Horizontal Sections)
    if (view === "home") {
        const homeSections = [
            { title: "New Arrivals", items: products.slice(0, 6) },
            { title: "Best Selling", items: products.slice(6, 12) },
            { title: "Modern Classics", items: products.slice(12, 19) }
        ];
        return (
            <div style={{ paddingBottom: '50px' }}>
                {homeSections.map(section => (
                    <div key={section.title} className={styles.sectionWrapper}>
                        <h2 className={styles.sectionTitle}>{section.title}</h2>
                        <div className={styles.horizontalScroll}>
                            {section.items.map(product => (
                                <ProductCard key={product.id} product={product} addToCart={addToCart} />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    // View: Catalog (Grid with Pagination)
    return (
        <div className={styles.catalogWrapper}>
            <div className={styles.catalogGrid}>
                {currentItems.map(product => (
                    <ProductCard key={product.id} product={product} addToCart={addToCart} />
                ))}
            </div>

            {filteredProducts.length === 0 && (
                <p className={styles.noResults}>No products found for "{searchTerm}"</p>
            )}

            {totalPages > 1 && (
                <div className={styles.pagination}>
                    <button
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage(prev => prev - 1)}
                        className={styles.pageBtn}
                    >
                        PREV
                    </button>
                    {[...Array(totalPages)].map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setCurrentPage(i + 1)}
                            className={`${styles.pageNumber} ${currentPage === i + 1 ? styles.activePage : ''}`}
                        >
                            {i + 1}
                        </button>
                    ))}
                    <button
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage(prev => prev + 1)}
                        className={styles.pageBtn}
                    >
                        NEXT
                    </button>
                </div>
            )}
        </div>
    );
};

const ProductCard = ({ product, addToCart }) => (
    <div className={styles.productCard}>
        <div className={styles.imageContainer}>
            <img src={product.imageUrl} alt={product.name} /> {/* 👈 imageUrl not image */}
        </div>
        <div className={styles.productInfo}>
            <h3>{product.name}</h3>
            <span className={styles.productPrice}>₦{product.price}</span>
            <button onClick={() => addToCart(product)} className={styles.whatsappBtn}>Add to Cart</button>
        </div>
    </div>
);

export default Products;