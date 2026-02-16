import React, { createContext, useContext, useState } from 'react';
import styles from "../product/product.module.css";

const CartContext = createContext();

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const [showCart, setShowCart] = useState(false);
    const [toast, setToast] = useState(null);

    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

    const addToCart = (product) => {
        setCart((currentCart) => {
            const existing = currentCart.find((item) => item.id === product.id);
            if (existing) {
                return currentCart.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [...currentCart, { ...product, quantity: 1 }];
        });

        setToast(product.name);
        setTimeout(() => setToast(null), 2800);
    };

    const removeFromCart = (productId) => {
        setCart((currentCart) => currentCart.filter((item) => item.id !== productId));
    };

    const updateQuantity = (productId, newQuantity) => {
        if (newQuantity < 1) {
            removeFromCart(productId);
            return;
        }
        setCart((currentCart) =>
            currentCart.map((item) =>
                item.id === productId ? { ...item, quantity: newQuantity } : item
            )
        );
    };

    const clearCart = () => {
        setCart([]);
    };

    // ── WhatsApp Integration ────────────────────────────────────────
    const getWhatsAppMessage = () => {
        if (cart.length === 0) return "";

        let message = "Hello  / Lamoura Team!\n\n";
        message += "I'm interested in the following items:\n\n";

        cart.forEach((item) => {
            const priceNum = parseFloat(item.price.replace(/,/g, ""));
            const subtotal = priceNum * item.quantity;

            message += `• ${item.name}\n`;
            message += `  Qty: ${item.quantity} × ₦${priceNum.toLocaleString()}\n`;
            message += `  Subtotal: ₦${subtotal.toLocaleString()}\n\n`;
        });

        const grandTotal = cart.reduce((sum, item) => {
            return sum + parseFloat(item.price.replace(/,/g, "")) * item.quantity;
        }, 0);

        message += `Total amount: ₦${grandTotal.toLocaleString()}\n\n`;
        message += "Kindly confirm availability, delivery cost to Port Harcourt, and payment options.\nThank you!";

        return encodeURIComponent(message);
    };

    const sendCartToWhatsApp = () => {
        if (cart.length === 0) {
            alert("Your cart is empty!");
            return;
        }

        const waNumber = "07059498554"; // ← CHANGE THIS to client's real WhatsApp number
        const message = getWhatsAppMessage();
        const url = `https://wa.me/${waNumber}?text=${message}`;

        window.open(url, "_blank", "noopener,noreferrer");
        setShowCart(false); // Close drawer after opening WhatsApp
    };

    const value = {
        cart,
        cartCount,
        showCart,
        setShowCart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        toast,
        setToast,
    };

    return (
        <CartContext.Provider value={value}>
            {children}

            {/* Toast Notification */}
            {toast && (
                <div className={styles.toastContainer}>
                    <div className={styles.toast}>
                        <span className={styles.toastIcon}>✓</span>
                        {toast} added to cart!
                    </div>
                </div>
            )}

            {/* Cart Sidebar */}
            {showCart && (
                <div className={styles.cartOverlay} onClick={() => setShowCart(false)}>
                    <div
                        className={styles.cartDrawer}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className={styles.cartHeader}>
                            <h2>Your Cart ({cartCount})</h2>
                            <button
                                onClick={() => setShowCart(false)}
                                className={styles.closeBtn}
                                aria-label="Close cart"
                            >
                                ×
                            </button>
                        </div>

                        <div className={styles.cartItems}>
                            {cart.length === 0 ? (
                                <div className={styles.emptyCart}>
                                    <p>Your cart is empty</p>
                                    <button
                                        onClick={() => setShowCart(false)}
                                        className={styles.continueShopping}
                                    >
                                        Continue Shopping
                                    </button>
                                </div>
                            ) : (
                                cart.map((item) => (
                                    <div key={item.id} className={styles.cartItem}>
                                        <div className={styles.itemInfo}>
                                            <span className={styles.itemName}>{item.name}</span>
                                            <span className={styles.itemPrice}>
                                                ₦{item.price} × {item.quantity}
                                            </span>
                                        </div>
                                        <button
                                            onClick={() => removeFromCart(item.id)}
                                            className={styles.removeBtn}
                                        >
                                            Remove
                                        </button>
                                    </div>
                                ))
                            )}
                        </div>

                        {cart.length > 0 && (
                            <div className={styles.cartFooter}>
                                <button
                                    onClick={clearCart}
                                    className={styles.clearBtn}
                                >
                                    Clear Cart
                                </button>

                                <button
                                    onClick={sendCartToWhatsApp}
                                    className={styles.whatsappCheckoutBtn} // ← Add this class in CSS
                                >
                                    Send Cart to WhatsApp
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </CartContext.Provider>
    );
};