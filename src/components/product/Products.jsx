import React, { useState, useEffect } from "react";
import { useCart } from '../context/cart-context';
import { useSearch } from '../context/search-context';
import styles from "./product.module.css";

export const PRODUCTS = [
    { id: 1, name: "Lumière Grand Chandelier", category: "Chandeliers", price: "1,250", image: "https://images.unsplash.com/photo-1540638349517-3abd5afc5847?auto=format&fit=crop&q=80&w=800" },
    { id: 2, name: "Éclat Wall Sconce", category: "Wall Lights", price: "420", image: "https://images.unsplash.com/photo-1542728928-1413d1894ed1?auto=format&fit=crop&q=80&w=800" },
    { id: 3, name: "Parisian Pendant", category: "Wall Lights", price: "680", image: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&q=80&w=800" },
    { id: 4, name: "Orbital Floor Lamp", category: "Floor Lamps", price: "890", image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&q=80&w=800" },
    { id: 5, name: "Aurora Pendant", category: "Pendants", price: "520", image: "https://images.unsplash.com/photo-1493666438817-866a91353ca9?auto=format&fit=crop&q=80&w=800" },
    { id: 6, name: "Halo Ceiling Light", category: "Ceiling Lights", price: "360", image: "https://images.unsplash.com/photo-1495713144083-7bd5e9d0b7d5?auto=format&fit=crop&q=80&w=800" },
    { id: 7, name: "Biscayne Table Lamp", category: "Table Lamps", price: "210", image: "https://images.unsplash.com/photo-1493666438817-866a91353ca9?auto=format&fit=crop&q=80&w=800" },
    { id: 8, name: "Clarity Desk Lamp", category: "Desk Lamps", price: "150", image: "https://images.unsplash.com/photo-1582719478172-6c6b7b6f3b88?auto=format&fit=crop&q=80&w=800" },
    { id: 9, name: "Linea Sconce", category: "Sconces", price: "295", image: "https://images.unsplash.com/photo-1505691723518-36a6f3e4d1e8?auto=format&fit=crop&q=80&w=800" },
    { id: 10, name: "Vector Track Kit", category: "Track Lighting", price: "740", image: "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&q=80&w=800" },
    { id: 11, name: "Niche Recessed Light", category: "Recessed Lighting", price: "130", image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&q=80&w=800" },
    { id: 12, name: "Veranda Outdoor Lantern", category: "Outdoor Lighting", price: "480", image: "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&q=80&w=800" },
    { id: 13, name: "Spa Mirror Light", category: "Bathroom Lighting", price: "330", image: "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&q=80&w=800" },
    { id: 14, name: "Culinaire Pendant", category: "Kitchen Lighting", price: "590", image: "https://images.unsplash.com/photo-1505691723518-36a6f3e4d1e8?auto=format&fit=crop&q=80&w=800" },
    { id: 15, name: "Serene Bedside", category: "Bedroom Lighting", price: "260", image: "https://images.unsplash.com/photo-1505691723518-36a6f3e4d1e8?auto=format&fit=crop&q=80&w=800" },
    { id: 16, name: "Canvas Living Room Light", category: "Living Room Lighting", price: "1,050", image: "https://images.unsplash.com/photo-1540574163026-643ea20ade25?auto=format&fit=crop&q=80&w=800" },
    { id: 17, name: "Halo Entry Pendant", category: "Entryway Lighting", price: "710", image: "https://images.unsplash.com/photo-1540574163026-643ea20ade25?auto=format&fit=crop&q=80&w=800" },
    { id: 18, name: "Accent Beam Lamp", category: "Accent Lighting", price: "180", image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&q=80&w=800" },
    { id: 19, name: "Ornament Decorative Globe", category: "Decorative Lighting", price: "340", image: "https://images.unsplash.com/photo-1540574163026-643ea20ade25?auto=format&fit=crop&q=80&w=800" }
];

const Products = ({ view = "catalog", activeCategory = "All" }) => {
    const { addToCart } = useCart();
    const { searchTerm } = useSearch(); // Get search from Navbar

    // Pagination State
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    // Reset to page 1 when search or category changes
    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, activeCategory]);

    // 1. FILTERING LOGIC
    const filteredProducts = PRODUCTS.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = activeCategory === "All" || product.category === activeCategory;
        return matchesSearch && matchesCategory;
    });

    // 2. PAGINATION LOGIC
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

    // View: Home (Horizontal Sections)
    if (view === "home") {
        const homeSections = [
            { title: "New Arrivals", items: PRODUCTS.slice(0, 6) },
            { title: "Best Selling", items: PRODUCTS.slice(6, 12) },
            { title: "Modern Classics", items: PRODUCTS.slice(12, 19) }
        ];
        return (
            <div style={{ paddingBottom: '50px' }}>
                {homeSections.map(section => (
                    <div key={section.title} className={styles.sectionWrapper}>
                        <h2 className={styles.sectionTitle}>{section.title}</h2>
                        <div className={styles.horizontalScroll}>
                            {section.items.map(product => <ProductCard key={product.id} product={product} addToCart={addToCart} />)}
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

            {/* Pagination UI */}
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
        <div className={styles.imageContainer}><img src={product.image} alt={product.name} /></div>
        <div className={styles.productInfo}>
            <h3>{product.name}</h3>
            <span className={styles.productPrice}>₦{product.price}</span>
            <button onClick={() => addToCart(product)} className={styles.whatsappBtn}>Add to Cart</button>
        </div>
    </div>
);

export default Products;