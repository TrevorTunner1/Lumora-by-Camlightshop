import React from 'react';
import styles from './Sidebar.module.css';

const Sidebar = ({ activeTab, setActiveTab }) => {
    return (
        <aside className={styles.sidebar}>
            <div className={styles.brand}>
                <div className={styles.logoSquare}>E</div>
                <div>
                    <h1 className={styles.brandName}>Essentials</h1>
                    <p className={styles.brandSub}>Ecommerce</p>
                </div>
            </div>

            <nav className={styles.nav}>
                <button
                    className={activeTab === 'Dashboard' ? styles.active : ''}
                    onClick={() => setActiveTab('Dashboard')}
                >
                    <span className={styles.icon}>📊</span> Dashboard
                </button>
                <button
                    className={activeTab === 'Products' ? styles.active : ''}
                    onClick={() => setActiveTab('Products')}
                >
                    <span className={styles.icon}>📦</span> Products
                </button>
            </nav>

            <div className={styles.footer}>
                Essentials Admin v1.0
            </div>
        </aside>
    );
};

export default Sidebar;