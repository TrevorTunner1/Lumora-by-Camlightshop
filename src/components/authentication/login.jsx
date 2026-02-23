import React, { useReducer, useState } from 'react';
import styles from './login.module.css';
import { useNavigate } from 'react-router-dom';
// Firebase v9+ modular imports (make sure you're using these)
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase/config'; // ← Adjust this path to where you export `auth`
import Navbar from '../Navbar/Navbar';

// Reducer for email
const emailInitialState = {
    value: '',
    isValid: null, // null = not yet validated, true/false after validation
};

const emailReducer = (state, action) => {
    switch (action.type) {
        case 'USER_INPUT':
            return { value: action.value, isValid: action.value.trim().length > 6 }; // adjust length as you prefer
        case 'INPUT_BLUR':
            return { value: state.value, isValid: state.value.trim().length > 6 };
        default:
            return { value: '', isValid: null };
    }
};

// Reducer for password
const passwordInitialState = {
    value: '',
    isValid: null,
};

const passwordReducer = (state, action) => {
    switch (action.type) {
        case 'USER_INPUT':
            return { value: action.value, isValid: action.value.trim().length > 6 };
        case 'INPUT_BLUR':
            return { value: state.value, isValid: state.value.trim().length > 6 };
        default:
            return { value: '', isValid: null };
    }
};

const Login = () => {
    const [emailState, emailDispatch] = useReducer(emailReducer, emailInitialState);
    const [passwordState, passwordDispatch] = useReducer(passwordReducer, passwordInitialState);

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const emailIsValid = emailState.isValid !== false; // true or null → visually okay
    const passwordIsValid = passwordState.isValid !== false;

    const formIsValid = emailState.isValid === true && passwordState.isValid === true;

    const emailChangeHandler = (e) => {
        emailDispatch({ type: 'USER_INPUT', value: e.target.value });
    };

    const passwordChangeHandler = (e) => {
        passwordDispatch({ type: 'USER_INPUT', value: e.target.value });
    };

    const validateEmailHandler = () => {
        emailDispatch({ type: 'INPUT_BLUR' });
    };

    const validatePasswordHandler = () => {
        passwordDispatch({ type: 'INPUT_BLUR' });
    };

    const navigate = useNavigate();

    const submitHandler = async (e) => {
        e.preventDefault();
        setError('');

        // Optional: force validation on submit
        if (!formIsValid) {
            emailDispatch({ type: 'INPUT_BLUR' });
            passwordDispatch({ type: 'INPUT_BLUR' });
            setError('Please fill in valid email and password');
            return;
        }

        setLoading(true);

        try {
            await signInWithEmailAndPassword(
                auth,                    // ← the auth instance
                emailState.value.trim(), // ← use the value from reducer
                passwordState.value
            );
            // If success → onAuthStateChanged listener should redirect automatically
            // You can also use useNavigate() here if you prefer
            navigate('/admin', { replace: true });
        } catch (err) {
            console.error(err);
            let message = 'Login failed. Please try again.';

            if (err.code === 'auth/invalid-credential' || err.code === 'auth/user-not-found') {
                message = 'Invalid email or password';
            } else if (err.code === 'auth/too-many-requests') {
                message = 'Too many attempts. Try again later.';
            } else if (err.code === 'auth/network-request-failed') {
                message = 'Network error. Check your connection.';
            }

            setError(message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className={styles.login}>
            <Navbar />
            <div className={styles.container}>
                <form className={styles.form} onSubmit={submitHandler}>
                    <div className={styles.inputGroup}>
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            placeholder="you@example.com"
                            value={emailState.value}
                            onChange={emailChangeHandler}
                            onBlur={validateEmailHandler}
                            className={!emailIsValid && emailState.isValid !== null ? styles.invalid : ''}
                        />
                    </div>

                    <div className={styles.inputGroup}>
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            placeholder="........"
                            value={passwordState.value}
                            onChange={passwordChangeHandler}
                            onBlur={validatePasswordHandler}
                            className={!passwordIsValid && passwordState.isValid !== null ? styles.invalid : ''}
                        />
                    </div>

                    <div className={styles.cta}>
                        <div className={styles.checkboxGroup}>
                            <input type="checkbox" id="remember-me" />
                            <label htmlFor="remember-me">Remember me</label>
                        </div>
                        <a href="#" className={styles.forgotPass}>
                            Forgot password?
                        </a>
                    </div>

                    {error && <p className="text-red-600 text-sm mt-2">{error}</p>}

                    <button
                        type="submit"
                        disabled={loading || !formIsValid}
                        className={`${styles.signInBtn} ${loading || !formIsValid ? styles.disabled : ''}`}
                    >
                        {loading ? 'Signing in...' : 'Sign In'}
                    </button>

                    <div className={styles.divider}>
                        <span>or continue with</span>
                    </div>

                    <div className={styles.socialButtons}>
                        <button type="button" className={styles.socialBtn}>Google</button>
                        <button type="button" className={styles.socialBtn}>GitHub</button>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default Login;