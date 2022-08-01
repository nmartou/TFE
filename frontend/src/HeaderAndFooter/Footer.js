import React from 'react';
import './HeaderAndFooter.css';

export default function Footer() {
    return (
        <footer className='footer'>
            
            <div className='footer-gpu'>
                <a className="footer-gpu" href="#">Contact</a><br />
                <a className="footer-gpu" href="#">RGPD</a><br />
                <a className='footer-gpu' href='/gpu'>Conditions d'utilisations</a>
            </div>
            <p className=''>©François Maingoval - 2022</p>
        </footer>
    );
}