import React, { useState, useEffect } from "react";
import { useCart } from '../context/cart-context';
import { useSearch } from '../context/search-context';
import { useProducts } from '../authentication/admin-panel/admin-products/UseProducts';
import styles from "./product.module.css";

const Products = ({ view = "catalog", activeCategory = "All" }) => {
    const { addToCart } = useCart();
    const { searchTerm } = useSearch();
    const { products, loading } = useProducts();

    const [currentPage, setCurrentPage] = useState(1);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const itemsPerPage = 8;

    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, activeCategory]);

    // Close modal on Escape key
    useEffect(() => {
        const handleKey = (e) => {
            if (e.key === 'Escape') setSelectedProduct(null);
        };
        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, []);

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
            <>
                <div style={{ paddingBottom: '50px' }}>
                    {homeSections.map(section => (
                        <div key={section.title} className={styles.sectionWrapper}>
                            <h2 className={styles.sectionTitle}>{section.title}</h2>
                            <div className={styles.horizontalScroll}>
                                {section.items.map(product => (
                                    <ProductCard
                                        key={product.id}
                                        product={product}
                                        addToCart={addToCart}
                                        onImageClick={() => setSelectedProduct(product)}
                                    />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
                {selectedProduct && (
                    <ProductModal
                        product={selectedProduct}
                        onClose={() => setSelectedProduct(null)}
                        addToCart={addToCart}
                    />
                )}
            </>
        );
    }

    // View: Catalog (Grid with Pagination)
    return (
        <>
            <div className={styles.catalogWrapper}>
                <div className={styles.catalogGrid}>
                    {currentItems.map(product => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            addToCart={addToCart}
                            onImageClick={() => setSelectedProduct(product)}
                        />
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

            {selectedProduct && (
                <ProductModal
                    product={selectedProduct}
                    onClose={() => setSelectedProduct(null)}
                    addToCart={addToCart}
                />
            )}
        </>
    );
};

// Product Card — description hidden, image clickable
const ProductCard = ({ product, addToCart, onImageClick }) => (
    <div className={styles.productCard}>
        <div className={styles.imageContainer} onClick={onImageClick} style={{ cursor: 'pointer' }}>
            <img src={product.imageUrl} alt={product.name} />
        </div>
        <div className={styles.productInfo}>
            <h3>{product.name}</h3>
            <span className={styles.productPrice}>₦{product.price}</span>
            <button onClick={() => addToCart(product)} className={styles.whatsappBtn}>Add to Cart</button>
        </div>
    </div>
);

// Modal — shows image, description and price
const ProductModal = ({ product, onClose, addToCart }) => (
    <div className={styles.modalOverlay} onClick={onClose}>
        <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button className={styles.modalClose} onClick={onClose}>✕</button>
            <div className={styles.modalImage}>
                <img src={product.imageUrl} alt={product.name} />
            </div>
            <div className={styles.modalInfo}>
                <h2>{product.name}</h2>
                <p className={styles.modalDescription}>{product.description}</p>  {/* ← shows here */}
                <span className={styles.modalPrice}>₦{product.price}</span>
                <button
                    onClick={() => { addToCart(product); onClose(); }}
                    className={styles.whatsappBtn}
                >
                    Add to Cart
                </button>
            </div>
        </div>
    </div>
);

export default Products;