
import React, { useState } from "react";
import { useCart } from '../context/cart-context';
import styles from "./product.module.css";

const whatsappNumber = "09137671904";
const PRODUCTS = [
    {
        id: 1,
        name: "Lumière Grand Chandelier",
        category: "Chandeliers",
        price: "1,250",
        image: "https://images.unsplash.com/photo-1540638349517-3abd5afc5847?auto=format&fit=crop&q=80&w=800",
        desc: "A statement piece featuring hand-cut crystals and a champagne gold finish. Perfect for grand entryways."
    },
    {
        id: 2,
        name: "Éclat Wall Sconce",
        category: "Wall Lights",
        price: "420",
        image: "https://images.unsplash.com/photo-1542728928-1413d1894ed1?auto=format&fit=crop&q=80&w=800",
        desc: "Minimalist soft-glow lighting designed to create ambiance in luxury corridors and bedrooms."
    },
    {
        id: 3,
        name: "Parisian Pendant",
        category: "Wall Lights",
        price: "680",
        image: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&q=80&w=800",
        desc: "Vintage-inspired glass pendant with brushed brass detailing. Elegance in every curve."
    },
    {
        id: 4,
        name: "Orbital Floor Lamp",
        category: "Floor Lamps",
        price: "890",
        image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&q=80&w=800",
        desc: "Sculptural lighting that doubles as a piece of modern art. A focal point for any contemporary living room."
    },
    {
        id: 5,
        name: "Aurora Pendant",
        category: "Pendants",
        price: "520",
        image: "https://images.unsplash.com/photo-1493666438817-866a91353ca9?auto=format&fit=crop&q=80&w=800",
        desc: "Hand-blown glass pendant with soft gradient tones — ideal over dining tables."
    },
    {
        id: 6,
        name: "Halo Ceiling Light",
        category: "Ceiling Lights",
        price: "360",
        image: "https://images.unsplash.com/photo-1495713144083-7bd5e9d0b7d5?auto=format&fit=crop&q=80&w=800",
        desc: "Slim-profile LED ceiling fixture providing even, glare-free illumination."
    },
    {
        id: 7,
        name: "Biscayne Table Lamp",
        category: "Table Lamps",
        price: "210",
        image: "https://images.unsplash.com/photo-1493666438817-866a91353ca9?auto=format&fit=crop&q=80&w=800",
        desc: "Ceramic base and linen shade — a calm, coastal-inspired bedside choice."
    },
    {
        id: 8,
        name: "Clarity Desk Lamp",
        category: "Desk Lamps",
        price: "150",
        image: "https://images.unsplash.com/photo-1582719478172-6c6b7b6f3b88?auto=format&fit=crop&q=80&w=800",
        desc: "Adjustable arm and warm LED for focused task lighting at workstations."
    },
    {
        id: 9,
        name: "Linea Sconce",
        category: "Sconces",
        price: "295",
        image: "https://images.unsplash.com/photo-1505691723518-36a6f3e4d1e8?auto=format&fit=crop&q=80&w=800",
        desc: "Slim brass sconce with frosted diffuser — elegant for hallways and bathrooms."
    },
    {
        id: 10,
        name: "Vector Track Kit",
        category: "Track Lighting",
        price: "740",
        image: "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&q=80&w=800",
        desc: "Modular track system with adjustable heads for gallery-style accenting."
    },
    {
        id: 11,
        name: "Niche Recessed Light",
        category: "Recessed Lighting",
        price: "130",
        image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&q=80&w=800",
        desc: "Compact downlight with high CRI for kitchens and living spaces."
    },
    {
        id: 12,
        name: "Veranda Outdoor Lantern",
        category: "Outdoor Lighting",
        price: "480",
        image: "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&q=80&w=800",
        desc: "Weatherproof lantern with antique finish; perfect for porches and gardens."
    },
    {
        id: 13,
        name: "Spa Mirror Light",
        category: "Bathroom Lighting",
        price: "330",
        image: "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&q=80&w=800",
        desc: "Slim LED bar with diffused output for vanity mirrors and bathroom tasks."
    },
    {
        id: 14,
        name: "Culinaire Pendant",
        category: "Kitchen Lighting",
        price: "590",
        image: "https://images.unsplash.com/photo-1505691723518-36a6f3e4d1e8?auto=format&fit=crop&q=80&w=800",
        desc: "Cluster pendant set for kitchen islands with dimmable warm-white LEDs."
    },
    {
        id: 15,
        name: "Serene Bedside",
        category: "Bedroom Lighting",
        price: "260",
        image: "https://images.unsplash.com/photo-1505691723518-36a6f3e4d1e8?auto=format&fit=crop&q=80&w=800",
        desc: "Soft-glow bedside lamp with touch dimmer and fabric shade."
    },
    {
        id: 16,
        name: "Canvas Living Room Light",
        category: "Living Room Lighting",
        price: "1,050",
        image: "https://images.unsplash.com/photo-1540574163026-643ea20ade25?auto=format&fit=crop&q=80&w=800",
        desc: "Oversized pendant that anchors a seating area with warm ambient light."
    },
    {
        id: 17,
        name: "Halo Entry Pendant",
        category: "Entryway Lighting",
        price: "710",
        image: "https://images.unsplash.com/photo-1540574163026-643ea20ade25?auto=format&fit=crop&q=80&w=800",
        desc: "A dramatic ring pendant designed for double-height foyers."
    },
    {
        id: 18,
        name: "Accent Beam Lamp",
        category: "Accent Lighting",
        price: "180",
        image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&q=80&w=800",
        desc: "Directional accent lamp for artwork or display shelves."
    },
    {
        id: 19,
        name: "Ornament Decorative Globe",
        category: "Decorative Lighting",
        price: "340",
        image: "https://images.unsplash.com/photo-1540574163026-643ea20ade25?auto=format&fit=crop&q=80&w=800",
        desc: "Hand-finished decorative globe that adds sculptural interest and ambient glow."
    }
];

const Products = ({ category, searchTerm = '', currentPage = 1, setCurrentPage = () => { }, loadMore = false }) => {
    const [pagesShown, setPagesShown] = useState(currentPage || 1);
    const { cart, showCart, setShowCart, addToCart, removeFromCart, updateQuantity } = useCart();

    // Send all cart items to WhatsApp
    const sendCartToWhatsApp = () => {
        if (cart.length === 0) {
            alert("Your cart is empty! Please add some products first.");
            return;
        }

        let message = "Hello Lamoura, I am interested in the following products:\n\n";

        cart.forEach((item, index) => {
            message += `${index + 1}. ${item.name}\n`;
            message += `   Quantity: ${item.quantity}\n`;
            message += `   Price: ₦${item.price} each\n\n`;
        });

        message += "Please provide more details about availability and total cost.";

        const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank');
    };

    const term = (searchTerm || '').trim().toLowerCase();
    const itemsPerPage = 5;

    let filteredProducts = PRODUCTS;
    if (category && category !== "All") {
        filteredProducts = filteredProducts.filter(p => p.category === category);
    }
    if (term) {
        filteredProducts = filteredProducts.filter(p =>
            p.name.toLowerCase().includes(term) ||
            p.desc.toLowerCase().includes(term) ||
            p.category.toLowerCase().includes(term)
        );
    }

    // Pagination logic
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

    let paginatedProducts;
    if (loadMore) {
        const endIndex = (pagesShown) * itemsPerPage;
        paginatedProducts = filteredProducts.slice(0, endIndex);
    } else {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        paginatedProducts = filteredProducts.slice(startIndex, endIndex);
    }

    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
        <div>
            {/* Cart Sidebar */}
            {showCart && (
                <>
                    {/* Overlay */}
                    <div
                        onClick={() => setShowCart(false)}
                        style={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100vh',
                            backgroundColor: 'rgba(0,0,0,0.5)',
                            zIndex: 999
                        }}
                    />

                    {/* Cart Sidebar */}
                    <div style={{
                        position: 'fixed',
                        top: 0,
                        right: 0,
                        width: '100%',
                        maxWidth: '400px',
                        height: '100vh',
                        backgroundColor: 'white',
                        boxShadow: '-2px 0 10px rgba(0,0,0,0.2)',
                        zIndex: 1000,
                        padding: '20px',
                        overflowY: 'auto'
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                            <h2>Your Cart ({cart.length})</h2>
                            <button
                                onClick={() => setShowCart(false)}
                                style={{
                                    background: 'none',
                                    border: 'none',
                                    fontSize: '24px',
                                    cursor: 'pointer'
                                }}
                            >
                                ✕
                            </button>
                        </div>

                        {cart.length === 0 ? (
                            <p style={{ textAlign: 'center', color: '#666' }}>Your cart is empty</p>
                        ) : (
                            <>
                                {cart.map(item => (
                                    <div key={item.id} style={{
                                        border: '1px solid #ddd',
                                        borderRadius: '8px',
                                        padding: '15px',
                                        marginBottom: '15px'
                                    }}>
                                        <div style={{ display: 'flex', gap: '10px' }}>
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                style={{
                                                    width: '60px',
                                                    height: '60px',
                                                    objectFit: 'cover',
                                                    borderRadius: '4px'
                                                }}
                                            />
                                            <div style={{ flex: 1 }}>
                                                <h4 style={{ margin: '0 0 5px 0' }}>{item.name}</h4>
                                                <p style={{ margin: '0 0 10px 0', color: '#666' }}>₦{item.price}</p>

                                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                        style={{
                                                            width: '30px',
                                                            height: '30px',
                                                            border: '1px solid #ddd',
                                                            background: 'white',
                                                            cursor: 'pointer',
                                                            borderRadius: '4px'
                                                        }}
                                                    >
                                                        -
                                                    </button>
                                                    <span>{item.quantity}</span>
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                        style={{
                                                            width: '30px',
                                                            height: '30px',
                                                            border: '1px solid #ddd',
                                                            background: 'white',
                                                            cursor: 'pointer',
                                                            borderRadius: '4px'
                                                        }}
                                                    >
                                                        +
                                                    </button>
                                                    <button
                                                        onClick={() => removeFromCart(item.id)}
                                                        style={{
                                                            marginLeft: 'auto',
                                                            color: 'red',
                                                            background: 'none',
                                                            border: 'none',
                                                            cursor: 'pointer',
                                                            fontSize: '18px'
                                                        }}
                                                    >
                                                        🗑️
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}

                                <button
                                    onClick={sendCartToWhatsApp}
                                    style={{
                                        width: '100%',
                                        backgroundColor: '#25D366',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '8px',
                                        padding: '15px',
                                        fontSize: '16px',
                                        fontWeight: 'bold',
                                        cursor: 'pointer',
                                        marginTop: '20px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '8px'
                                    }}
                                >
                                    <svg width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                                        <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.06 3.973L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.562 6.562 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z" />
                                    </svg>
                                    Send Order via WhatsApp
                                </button>
                            </>
                        )}
                    </div>
                </>
            )}

            {/* Products Grid */}
            <main className={styles['product-grid']}>
                {paginatedProducts.length > 0 ? (
                    paginatedProducts.map(product => (
                        <div key={product.id} className={styles['product-card']}>
                            <div className={styles['image-container']}>
                                <img src={product.image} alt={product.name} />
                            </div>
                            <div className={styles['product-info']}>
                                <h3>{product.name}</h3>
                                <p className={styles['product-desc']}>{product.desc}</p>
                                <span className={styles['product-price']}>Price: ₦{product.price}</span>

                                <button
                                    onClick={() => addToCart(product)}
                                    className={styles['whatsapp-btn']}
                                >
                                    🛒 Add to Cart
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '2rem' }}>
                        No products found. Try adjusting your search or category filter.
                    </p>
                )}
            </main>

            {/* Pagination Controls or Load More */}
            {loadMore ? (
                // Show a simple "View more products" button when more items exist
                (paginatedProducts.length < filteredProducts.length) && (
                    <div className={styles['pagination']}>
                        <button
                            onClick={() => {
                                const next = pagesShown + 1;
                                setPagesShown(next);
                                try { setCurrentPage(next); } catch (e) { }
                            }}
                            className={styles['pagination-btn']}
                        >
                            View more products
                        </button>
                    </div>
                )
            ) : (
                totalPages > 1 && (
                    <div className={styles['pagination']}>
                        <button
                            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                            disabled={currentPage === 1}
                            className={styles['pagination-btn']}
                        >
                            ← Previous
                        </button>

                        <div className={styles['pagination-numbers']}>
                            {pageNumbers.map((page) => (
                                <button
                                    key={page}
                                    onClick={() => setCurrentPage(page)}
                                    className={`${styles['pagination-number']} ${currentPage === page ? styles['active'] : ''}`}
                                >
                                    {page}
                                </button>
                            ))}
                        </div>

                        <button
                            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                            disabled={currentPage === totalPages}
                            className={styles['pagination-btn']}
                        >
                            Next →
                        </button>
                    </div>
                )
            )}
        </div>
    );
};

export default Products;