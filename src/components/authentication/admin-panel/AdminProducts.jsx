// src/admin/Products.jsx
import React, { useState } from "react";
import { useProducts } from "./admin-products/UseProducts";
import styles from "./products.module.css";
import AddProductModal from "./AddProductModal";

const AdminProducts = () => {
    const { products, loading, addProduct, updateProduct, deleteProduct } = useProducts();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null); // null = Add mode

    const openAdd = () => { setEditingProduct(null); setIsModalOpen(true); };
    const openEdit = (product) => { setEditingProduct(product); setIsModalOpen(true); };
    const handleClose = () => setIsModalOpen(false);

    const handleDelete = async (product) => {
        if (!window.confirm(`Remove "${product.name}"?`)) return;
        await deleteProduct(product.id, product.imagePath);
    };

    return (
        <div>
            <div className={styles.headerRow}>
                <div>
                    <h1 className={styles.title}>Products</h1>
                    <p className={styles.subtitle}>Manage your product inventory</p>
                </div>
                <button className={styles.addButton} onClick={openAdd}>+ Add Product</button>
            </div>

            <div className={styles.tableContainer}>
                {loading ? (
                    <p style={{ padding: "2rem", textAlign: "center" }}>Loading products…</p>
                ) : (
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>Product</th>
                                <th>Category</th>
                                <th>Price</th>
                                <th>Edit</th>
                                <th>Remove</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.length === 0 && (
                                <tr><td colSpan={5} style={{ textAlign: "center", padding: "2rem" }}>No products yet.</td></tr>
                            )}
                            {products.map((p) => (
                                <tr key={p.id}>
                                    <td>
                                        <div className={styles.productCell}>
                                            {p.imageUrl
                                                ? <img src={p.imageUrl} alt={p.name} className={styles.imgThumb} />
                                                : <div className={styles.imgPlaceholder} />}
                                            <div>
                                                <div className={styles.pName}>{p.name}</div>
                                                <div className={styles.pId}>ID: {p.id.slice(0, 8)}…</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>{p.category}</td>
                                    <td>₦{p.price}</td>
                                    <td><button className={styles.editBtn} onClick={() => openEdit(p)}>Edit</button></td>
                                    <td><button className={styles.deleteBtn} onClick={() => handleDelete(p)}>Remove</button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
            <AddProductModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                product={editingProduct}   // 👈 this is the only new prop
            />
        </div>
    );
};

export default AdminProducts;