import React from 'react';
import styles from './sidebar.module.css';
import { Link } from 'react-router-dom';

const Sidebar = ({ activeTab, setActiveTab }) => {
    return (
        <aside className={styles.sidebar}>
            <div className={styles.brand}>
                <div>
                    <Link to="/" className={styles['brand-name']}>
                        LAMOURA
                    </Link>
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