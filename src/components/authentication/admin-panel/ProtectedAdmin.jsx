import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom'; // 👈 import Outlet
import { onAuthStateChanged, getIdTokenResult, signOut } from 'firebase/auth';
import { auth } from '../../../firebase/config';

export default function ProtectedAdmin() { // 👈 remove { children } prop
    const navigate = useNavigate();
    const [status, setStatus] = useState('checking');

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (!user) {
                navigate('/admin-login', { replace: true });
                setStatus('denied');
                return;
            }

            try {
                const tokenResult = await getIdTokenResult(user, true);

                if (tokenResult.claims?.admin === true) {
                    setStatus('allowed');
                } else {
                    await signOut(auth);
                    navigate('/', { replace: true });
                    setStatus('denied');
                }
            } catch (err) {
                console.error(err);
                await signOut(auth);
                navigate('/', { replace: true });
                setStatus('denied');
            }
        });

        return () => unsubscribe();
    }, [navigate]);

    if (status === 'checking') {
        return <div className="loading-screen"><p>Verifying access...</p></div>;
    }

    if (status === 'allowed') {
        return <Outlet />; // 👈 this is the key fix
    }

    return null;
}