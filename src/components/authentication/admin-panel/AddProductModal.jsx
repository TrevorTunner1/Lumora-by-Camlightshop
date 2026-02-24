// src/admin/AddProductModal.jsx
import React, { useState, useEffect } from 'react';
import styles from './AddProductModal.module.css';
import { useProducts } from './admin-products/UseProducts';

const EMPTY = { name: '', price: '', category: 'home' };

const AddProductModal = ({ isOpen, onClose, product }) => {
    const { addProduct, updateProduct } = useProducts();

    const [form, setForm] = useState(EMPTY);
    const [imageFile, setImageFile] = useState(null);
    const [preview, setPreview] = useState('');
    const [progress, setProgress] = useState(0);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');

    // If editing, pre-fill the form
    useEffect(() => {
        if (product) {
            setForm({ name: product.name, price: product.price, category: product.category });
            setPreview(product.imageUrl || '');
        } else {
            setForm(EMPTY);
            setPreview('');
        }
        setImageFile(null);
        setProgress(0);
        setError('');
    }, [product, isOpen]);

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) onClose();
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setImageFile(file);
        setPreview(URL.createObjectURL(file));
    };

    const handleSubmit = async () => {
        if (!form.name || !form.price || !form.category) {
            setError('All fields are required.');
            return;
        }
        setSaving(true);
        setError('');
        try {
            if (product) {
                await updateProduct(product.id, form, imageFile, product.imagePath, setProgress);
            } else {
                await addProduct(form, imageFile, setProgress);
            }
            onClose();
        } catch (err) {
            setError('Something went wrong: ' + err.message);
        } finally {
            setSaving(false);
            setProgress(0);
        }
    };

    if (!isOpen) return null;

    return (
        <div className={styles.overlay} onClick={handleOverlayClick}>
            <div className={styles.modal}>
                <div className={styles.header}>
                    <h2 className={styles.title}>{product ? 'Edit Product' : 'Add New Product'}</h2>
                    <button className={styles.closeBtn} onClick={onClose}>✕</button>
                </div>

                <div className={styles.formBody}>
                    <div className={styles.formGroup}>
                        <label>Product Name</label>
                        <input
                            type="text"
                            placeholder="e.g., Ceramic Vase"
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label>Price (₦)</label>
                        <input
                            type="text"
                            placeholder="49.99"
                            value={form.price}
                            onChange={(e) => setForm({ ...form, price: e.target.value })}
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label>Category</label>
                        <select
                            value={form.category}
                            onChange={(e) => setForm({ ...form, category: e.target.value })}
                        >
                            <option value="">Select category</option>
                            <option value="Chandeliers">Chandeliers</option>
                            <option value="Pendants">Pendants</option>
                            <option value="Floor Lamps">Floor Lamps</option>
                            <option value="Table Lamps">Table Lamps</option>
                            <option value="Desk Lamps">Desk Lamps</option>
                            <option value="Ceiling Lights">Ceiling Lights</option>
                            <option value="Sconces">Sconces</option>
                            <option value="Track Lighting">Track Lighting</option>
                            <option value="Minimalist">Minimalist</option>
                            <option value="Vintage">Vintage</option>
                            <option value="Modern">Modern</option>
                            <option value="Contemporary">Contemporary</option>
                            <option value="Crystal Fixtures">Crystal Fixtures</option>
                            <option value="Brass Fixtures">Brass Fixtures</option>
                            <option value="Smart Lighting">Smart Lighting</option>
                        </select>
                    </div>

                    <div className={styles.formGroup}>
                        <label>Image</label>
                        <input type="file" accept="image/*" onChange={handleImageChange} />
                        {/* Image preview */}
                        {preview && (
                            <img
                                src={preview}
                                alt="preview"
                                style={{ marginTop: '8px', width: '100%', height: '160px', objectFit: 'cover', borderRadius: '8px' }}
                            />
                        )}
                        {/* Upload progress bar */}
                        {saving && progress > 0 && progress < 100 && (
                            <div style={{ marginTop: '8px', background: '#eee', borderRadius: '99px', height: '6px' }}>
                                <div style={{ width: `${progress}%`, background: '#333', height: '100%', borderRadius: '99px', transition: 'width 0.3s' }} />
                            </div>
                        )}
                    </div>

                    {error && <p style={{ color: 'red', fontSize: '0.85rem', margin: 0 }}>{error}</p>}
                </div>

                <div className={styles.footer}>
                    <button className={styles.cancelBtn} onClick={onClose} disabled={saving}>Cancel</button>
                    <button className={styles.submitBtn} onClick={handleSubmit} disabled={saving}>
                        {saving ? 'Saving…' : product ? 'Save Changes' : 'Save Product'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddProductModal;