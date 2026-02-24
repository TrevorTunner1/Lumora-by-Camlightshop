import React, { useMemo } from 'react';
import { useProducts } from './admin-products/UseProducts';
import styles from './Dashboard.module.css';

const Dashboard = () => {
    const { products, loading } = useProducts();

    const stats = useMemo(() => {
        const totalProducts = products.length;

        const inventoryValue = products.reduce((sum, p) => {
            // Strip commas and symbols, parse as float
            const cleaned = String(p.price).replace(/[^0-9.]/g, '');
            return sum + (parseFloat(cleaned) || 0);
        }, 0);

        const categories = new Set(products.map(p => p.category)).size;

        return [
            { label: 'Total Products', value: loading ? '…' : totalProducts, icon: '📦', color: '#f0f7ff' },
            { label: 'Inventory Value', value: loading ? '…' : `₦${inventoryValue.toLocaleString()}`, icon: '💰', color: '#f0fff4' },
            { label: 'Categories', value: loading ? '…' : categories, icon: '🏷️', color: '#faf5ff' },
        ];
    }, [products, loading]);

    return (
        <div>
            <h1 className={styles.title}>Dashboard</h1>
            <p className={styles.subtitle}>Welcome to your admin dashboard</p>

            <div className={styles.grid}>
                {stats.map((stat, index) => (
                    <div key={index} className={styles.card} style={{ backgroundColor: stat.color }}>
                        <div>
                            <p className={styles.cardLabel}>{stat.label}</p>
                            <h2 className={styles.cardValue}>{stat.value}</h2>
                        </div>
                        <span className={styles.cardIcon}>{stat.icon}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Dashboard;