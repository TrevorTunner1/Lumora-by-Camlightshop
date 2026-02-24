// src/hooks/useProducts.js
import { useState, useEffect } from "react";
import {
    collection, onSnapshot, addDoc,
    updateDoc, deleteDoc, doc, serverTimestamp, query, orderBy
} from "firebase/firestore";
import { db } from "../../../../firebase/config";


// 🔴 REPLACE THESE WITH YOUR CLOUDINARY DETAILS
const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

const uploadToCloudinary = async (imageFile, onProgress) => {
    return new Promise((resolve, reject) => {
        const formData = new FormData();
        formData.append("file", imageFile);
        formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

        const xhr = new XMLHttpRequest();

        // Track upload progress
        xhr.upload.onprogress = (e) => {
            if (e.lengthComputable && onProgress) {
                onProgress(Math.round((e.loaded / e.total) * 100));
            }
        };

        xhr.onload = () => {
            const data = JSON.parse(xhr.responseText);
            if (xhr.status === 200) {
                resolve({ imageUrl: data.secure_url, imagePath: data.public_id });
            } else {
                reject(new Error(data.error?.message || "Upload failed"));
            }
        };

        xhr.onerror = () => reject(new Error("Upload failed"));
        xhr.open("POST", `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`);
        xhr.send(formData);
    });
};

const deleteFromCloudinary = async (publicId) => {
    // Note: deleting from Cloudinary requires backend/signed requests
    // For now we just skip it — the image stays on Cloudinary but is no longer referenced
    console.log("Image removed from product (Cloudinary cleanup requires backend)");
};

export const useProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    // ─── Real-time Firestore listener ─────────────────────────────────────────
    useEffect(() => {
        const q = query(collection(db, "products"), orderBy("createdAt", "desc"));
        const unsub = onSnapshot(q, (snap) => {
            setProducts(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
            setLoading(false);
        });
        return unsub;
    }, []);

    // ─── Add product ──────────────────────────────────────────────────────────
    const addProduct = async (productData, imageFile, onProgress) => {
        let imageUrl = "";
        let imagePath = "";

        if (imageFile) {
            const result = await uploadToCloudinary(imageFile, onProgress);
            imageUrl = result.imageUrl;
            imagePath = result.imagePath;
        }

        await addDoc(collection(db, "products"), {
            name: productData.name,
            category: productData.category,
            price: productData.price,
            imageUrl,
            imagePath,
            createdAt: serverTimestamp(),
        });
    };

    // ─── Update product ───────────────────────────────────────────────────────
    const updateProduct = async (id, productData, imageFile, oldImagePath, onProgress) => {
        let imageUrl = productData.imageUrl;
        let imagePath = oldImagePath;

        if (imageFile) {
            const result = await uploadToCloudinary(imageFile, onProgress);
            imageUrl = result.imageUrl;
            imagePath = result.imagePath;
        }

        await updateDoc(doc(db, "products", id), {
            name: productData.name,
            category: productData.category,
            price: productData.price,
            imageUrl,
            imagePath,
        });
    };

    // ─── Delete product ───────────────────────────────────────────────────────
    const deleteProduct = async (id, imagePath) => {
        if (imagePath) await deleteFromCloudinary(imagePath);
        await deleteDoc(doc(db, "products", id));
    };

    return { products, loading, addProduct, updateProduct, deleteProduct };
};