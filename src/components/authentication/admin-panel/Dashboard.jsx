import React from 'react';
import styles from './Dashboard.module.css';

const Dashboard = () => {
    const stats = [
        { label: 'Total Products', value: '6', icon: '📦', color: '#f0f7ff' },
        { label: 'Inventory Value', value: '$276.00', icon: '💰', color: '#f0fff4' },
        { label: 'Categories', value: '3', icon: '🏷️', color: '#faf5ff' },
    ];

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