// PublicOnlyRoute.jsx
import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { onAuthStateChanged, getIdTokenResult } from 'firebase/auth';
import { auth } from '../../../firebase/config';

export default function PublicOnlyRoute() {
    const navigate = useNavigate();
    const [status, setStatus] = useState('checking');

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (!user) {
                setStatus('ok'); // not logged in → show login page
                return;
            }

            try {
                const tokenResult = await getIdTokenResult(user, true);
                if (tokenResult.claims?.admin === true) {
                    navigate('/admin', { replace: true }); // 👈 already admin → skip login
                } else {
                    setStatus('ok'); // logged in but not admin → show login
                }
            } catch {
                setStatus('ok');
            }
        });

        return () => unsubscribe();
    }, [navigate]);

    if (status === 'checking') {
        return <div className="loading-screen"><p>Loading...</p></div>;
    }

    return <Outlet />;
}