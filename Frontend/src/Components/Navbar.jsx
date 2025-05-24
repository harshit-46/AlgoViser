// 340068

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from '../assets/images/Logo1.png';

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    useEffect(() => {
        if (menuOpen) {
            document.body.classList.add("overflow-hidden");
        } else {
            document.body.classList.remove("overflow-hidden");
        }

        return () => {
            document.body.classList.remove("overflow-hidden");
        };
    }, [menuOpen]);

    return (
        <nav className="text-white relative z-50">
            <div className="container mx-auto px-6 md:px-12 py-2 flex justify-between items-center h-14">
                <Link to="/" className="flex items-center">
                    <img src={logo} alt="Algoviser Logo" className="h-7 w-7 mr-2" />
                    <span className="text-xl font-bold">Algoviser</span>
                </Link>

                <div className="hidden md:flex items-center space-x-12">
                    <Link to="/" className="font-semibold hover:text-blue-400">HOME</Link>
                    <Link to="/about" className="font-semibold hover:text-blue-400">ABOUT</Link>
                    <Link to="/simulator" className="font-semibold hover:text-blue-400">SIMULATOR</Link>
                    <Link to="/blog" className="font-semibold hover:text-blue-400">BLOG</Link>
                    <Link to="/contact" className="font-semibold hover:text-blue-400">CONTACT</Link>
                </div>

                <button
                    className="md:hidden text-white focus:outline-none"
                    onClick={() => setMenuOpen(true)}
                    aria-label="Open menu"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
            </div>

            {menuOpen && (
                <div className="fixed inset-0 bg-opacity-50 z-40 md:hidden"
                onClick={() => setMenuOpen(false)}></div>
            )}

            <div className={`fixed top-0 right-0 h-full w-3/5 bg-gray-600 z-50 shadow-lg rounded-l-2xl transform transition-transform duration-300 ease-in-out ${menuOpen ? 'translate-x-0' : 'translate-x-full'} md:hidden`}>

                <div className="flex justify-end p-4">
                    <button
                        onClick={() => setMenuOpen(false)}
                        className="text-white focus:outline-none"
                        aria-label="Close menu"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div className="flex flex-col items-end pr-6 space-y-5 text-right text-base font-medium">
                    <Link to="/" onClick={() => setMenuOpen(false)}>HOME</Link>
                    <Link to="/about" onClick={() => setMenuOpen(false)}>ABOUT</Link>
                    <Link to="/simulator" onClick={() => setMenuOpen(false)}>SIMULATOR</Link>
                    <Link to="/blog" onClick={() => setMenuOpen(false)}>BLOG</Link>
                    <Link to="/contact" onClick={() => setMenuOpen(false)}>CONTACT</Link>
                </div>
            </div>
        </nav>
    );
}
