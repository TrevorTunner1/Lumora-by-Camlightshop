import React, { createContext, useContext, useState } from 'react';
import styles from "../product/product.module.css"; // We'll put toast styles here

const CartContext = createContext();

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) throw new Error('useCart must be used within CartProvider');
    return context;
};

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const [showCart, setShowCart] = useState(false);
    const [toast, setToast] = useState(null); // New state for fancy toast

    const addToCart = (product) => {
        const existingItem = cart.find(item => item.id === product.id);

        if (existingItem) {
            setCart(cart.map(item =>
                item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
            ));
        } else {
            setCart([...cart, { ...product, quantity: 1 }]);
        }

        // --- FANCY TOAST LOGIC ---
        setToast(product.name);
        setTimeout(() => setToast(null), 3000); // Hide after 3 seconds
    };

    const removeFromCart = (productId) => {
        setCart(cart.filter(item => item.id !== productId));
    };

    const updateQuantity = (productId, newQuantity) => {
        if (newQuantity <= 0) {
            removeFromCart(productId);
        } else {
            setCart(cart.map(item =>
                item.id === productId ? { ...item, quantity: newQuantity } : item
            ));
        }
    };

    const clearCart = () => setCart([]);
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

    return (
        <CartContext.Provider value={{
            cart, cartCount, showCart, setShowCart,
            addToCart, removeFromCart, updateQuantity, clearCart
        }}>
            {children}

            {/* --- GLOBAL FANCY TOAST --- */}
            {toast && (
                <div className={styles.toastContainer}>
                    <div className={styles.toast}>
                        <span className={styles.toastIcon}>✓</span>
                        {toast} added to cart!
                    </div>
                </div>
            )}
        </CartContext.Provider>
    );
};