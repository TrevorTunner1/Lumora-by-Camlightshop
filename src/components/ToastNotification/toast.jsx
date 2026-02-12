import React, { createContext, useState } from 'react';
import styles from './toast.module.css';
const ToastNotification = () => {
    <div className={styles.toastContainer}>
        <div className={styles.toast}>
            <span className={styles.toastIcon}>✓</span>
            {addedItem} added to cart!
        </div>
    </div>
};

export default ToastNotification;