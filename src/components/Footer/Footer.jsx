
import React from 'react';
import style from './footer.module.css';
const Footer = () => {
    return (
        <footer id="contact" className={style.footer}>
            <div className={style['footer-content']}>
                <div>
                    <div className={style['footer-logo']}>LAMOURA</div>
                    <p style={{ marginTop: '20px', fontSize: '14px', color: '#888' }}>
                        Providing bespoke lighting for the world's most beautiful spaces.
                    </p>
                </div>
                <div>
                    <h4>Contact</h4>
                    <p style={{ fontSize: '14px', color: '#888', marginTop: '10px' }}>
                        info@lamoura.com<br />
                        Showroom: 123 Design St.
                    </p>
                </div>
                <div>
                    <h4>Follow Us</h4>
                    <p style={{ fontSize: '14px', color: '#888', marginTop: '10px' }}>
                        <a href="https://www.instagram.com/lamoura/" target="_blank" rel="noopener noreferrer">Instagram</a><br />
                        <a href="https://www.facebook.com/lamoura" target="_blank" rel="noopener noreferrer">Facebook</a>
                    </p>
                </div>
            </div>
            <p style={{ textAlign: 'center', marginTop: '40px', fontSize: '10px', letterSpacing: '2px', color: '#555' }}>
                © 2026 LAMOURA ATELIER.
            </p>
        </footer>
    )
}

export default Footer;