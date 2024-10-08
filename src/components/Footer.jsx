import React from 'react';

const Footer = () => {
    return (
        <footer className="footer footer-center bg-[#EEEDEB] text-base-content p-4">
            <aside>
                <p>Copyright © {new Date().getFullYear()} - All right reserved by Organize Me</p>
            </aside>
        </footer>
    );
};

export default Footer;