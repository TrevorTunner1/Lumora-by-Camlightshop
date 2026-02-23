import React, { useState } from 'react';
import styles from './Products.module.css';
import AddProductModal from './AddProductModal'; // Import the new modal

const Products = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const products = [
        { id: 1, name: 'Ceramic Vase', category: 'Home', price: '$49' },
        { id: 2, name: 'Linen Pillow', category: 'Textiles', price: '$59' },
        { id: 3, name: 'Wood Bowl', category: 'Home', price: '$39' },
        { id: 4, name: 'Stone Coasters', category: 'Accessories', price: '$29' },
    ];

    return (
        <div>
            <div className={styles.headerRow}>
                <div>
                    <h1 className={styles.title}>Products</h1>
                    <p className={styles.subtitle}>Manage your product inventory</p>
                </div>
                {/* Open Modal on Click */}
                <button className={styles.addButton} onClick={() => setIsModalOpen(true)}>
                    + Add Product
                </button>
            </div>

            <div className={styles.tableContainer}>
                {/* ... Table code remains the same as previous response ... */}
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>Actions</th>
                            <td>Remove</td>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((p) => (
                            <tr key={p.id}>
                                <td>
                                    <div className={styles.productCell}>
                                        <div className={styles.imgPlaceholder}></div>
                                        <div>
                                            <div className={styles.pName}>{p.name}</div>
                                            <div className={styles.pId}>ID: {p.id}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>{p.category}</td>
                                <td>{p.price}</td>
                                <td><button className={styles.editBtn}>Edit</button></td>
                                <td><button className={styles.deleteBtn}>Remove</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Place the Modal Component here */}
            <AddProductModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </div>
    );
};

export default Products;