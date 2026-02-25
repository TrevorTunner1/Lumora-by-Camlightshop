import React, { useState } from 'react';
import styles from './AdminPanel.module.css';
import Sidebar from './sidebar';
import Dashboard from './Dashboard';
import { signOut } from 'firebase/auth';
import { db, auth } from '../../../firebase/config';
import AdminProducts from './AdminProducts';

function AdminPanel() {
    const [activeTab, setActiveTab] = useState('Dashboard');

    const handleLogout = async () => {
        try {
            await signOut(auth);
            // If you use onAuthStateChanged + protected route → redirect happens automatically
        } catch (err) {
            console.error('Logout failed:', err);
            setMessage('Logout failed. Please try again.');
            setMessageType('error');
        }
    };

    return (
        <div className={styles.container}>
            <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

            <main className={styles.mainContent}>
                <header className={styles.header}>
                    <div className={styles.adminTitle}>
                        <span className={styles.avatar}>A</span>
                        Admin Panel
                    </div>
                    <div className={styles.headerLinks}>

                        <button
                            type="button"
                            onClick={handleLogout}
                            className="btn btn-logout"
                        >
                            Logout
                        </button>
                    </div>
                </header>

                <section className={styles.contentBody}>
                    {activeTab === 'Dashboard' ? <Dashboard /> : <AdminProducts />}
                </section>
            </main>
        </div>
    );
}

export default AdminPanel;