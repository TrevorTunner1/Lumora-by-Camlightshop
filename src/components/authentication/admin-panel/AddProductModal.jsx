import React from 'react';
import styles from './AddProductModal.module.css';

const AddProductModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    // Close modal if user clicks on the dark background overlay
    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) onClose();
    };

    return (
        <div className={styles.overlay} onClick={handleOverlayClick}>
            <div className={styles.modal}>
                <div className={styles.header}>
                    <h2 className={styles.title}>Add New Product</h2>
                    <button className={styles.closeBtn} onClick={onClose}>✕</button>
                </div>

                <div className={styles.formBody}>
                    <div className={styles.formGroup}>
                        <label>Product Name</label>
                        <input type="text" placeholder="e.g., Ceramic Vase" />
                    </div>

                    <div className={styles.formGroup}>
                        <label>Price ($)</label>
                        <input type="text" placeholder="49.99" />
                    </div>

                    <div className={styles.formGroup}>
                        <label>Category</label>
                        <select>
                            <option value="home">Home</option>
                            <option value="textiles">Textiles</option>
                            <option value="accessories">Accessories</option>
                        </select>
                    </div>

                    <div className={styles.formGroup}>
                        <label>Stock</label>
                        <input type="number" placeholder="0" />
                    </div>

                    <div className={styles.formGroup}>
                        <label>Description</label>
                        <textarea placeholder="Product description..." rows="4"></textarea>
                    </div>
                </div>

                {/* Although not visible in your crop, modals usually have footer buttons */}
                <div className={styles.footer}>
                    <button className={styles.cancelBtn} onClick={onClose}>Cancel</button>
                    <button className={styles.submitBtn}>Save Product</button>
                </div>
            </div>
        </div>
    );
};

export default AddProductModal;