import React from "react";
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

const Products = () => {
    const { cart, showCart, setShowCart, addToCart, removeFromCart, updateQuantity } = useCart();

    const sections = [
        { title: "New Arrivals", items: PRODUCTS.slice(0, 6) },
        { title: "Best Selling", items: PRODUCTS.slice(6, 12) },
        { title: "Modern Classics", items: PRODUCTS.slice(12, 19) }
    ];

    const sendCartToWhatsApp = () => {
        if (cart.length === 0) return;
        let message = "Hello Lamoura, I'm interested in:\n\n";
        cart.forEach(item => message += `- ${item.name} (x${item.quantity})\n`);
        window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank');
    };

    return (
        <div style={{ backgroundColor: '#fff', paddingBottom: '50px' }}>

            {/* Cart Sidebar */}
            {showCart && (
                <>
                    <div onClick={() => setShowCart(false)} style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100vh', backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1000 }} />
                    <div style={{ position: 'fixed', top: 0, right: 0, width: '100%', maxWidth: '350px', height: '100vh', backgroundColor: 'white', zIndex: 1001, padding: '20px', display: 'flex', flexDirection: 'column' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                            <h2 style={{ fontSize: '20px', margin: 0 }}>Your Cart</h2>
                            <button onClick={() => setShowCart(false)} style={{ background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer', color: '#B2AC88' }}>✕</button>
                        </div>

                        <div style={{ flex: 1, overflowY: 'auto' }}>
                            {cart.map(item => (
                                <div key={item.id} style={{ display: 'flex', gap: '10px', marginBottom: '15px', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>
                                    <img src={item.image} alt={item.name} style={{ width: '50px', height: '50px', objectFit: 'cover' }} />
                                    <div style={{ flex: 1 }}>
                                        <h4 style={{ fontSize: '13px', margin: '0 0 5px 0' }}>{item.name}</h4>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                                            <span>{item.quantity}</span>
                                            <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                                            <button onClick={() => removeFromCart(item.id)} style={{ marginLeft: 'auto', color: 'red', border: 'none', background: 'none' }}>🗑️</button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {cart.length > 0 && (
                            <button onClick={sendCartToWhatsApp} style={{ width: '100%', backgroundColor: '#25D366', color: 'white', padding: '15px', border: 'none', borderRadius: '5px', fontWeight: 'bold', cursor: 'pointer' }}>
                                Order via WhatsApp
                            </button>
                        )}
                    </div>
                </>
            )}

            {/* Product Rows */}
            {sections.map(section => (
                <div key={section.title} className={styles.sectionWrapper} style={{ marginTop: '30px' }}>
                    <h2 className={styles.sectionTitle} style={{ paddingLeft: '20px' }}>{section.title}</h2>
                    <div className={styles.horizontalScroll} style={{ paddingLeft: '20px' }}>
                        {section.items.map(product => (
                            <div key={product.id} className={styles.productCard}>
                                <div className={styles.imageContainer}>
                                    <img src={product.image} alt={product.name} />
                                </div>
                                <div className={styles.productInfo}>
                                    <h3>{product.name}</h3>
                                    <span className={styles.productPrice}>₦{product.price}</span>
                                    <button onClick={() => addToCart(product)} className={styles.whatsappBtn}>
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Products;