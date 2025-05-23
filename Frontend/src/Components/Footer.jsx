import React from "react";
import { Link } from "react-router-dom";
import Logo from '../assets/images/Logo1.png'
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import { FaLinkedin, FaFacebook, FaTwitter } from "react-icons/fa";

export default function Footer() {
    return (
        <footer className="text-white px-6 md:px-16 py-16">
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between gap-16">
                <div className="flex-1 space-y-6">
                    <div>
                        <p className="text-sm text-blue-400 font-semibold mb-2">+ Contact Us</p>
                        <h2 className="text-3xl sm:text-4xl font-semibold leading-snug">
                            Interested in working together, trying our platform or simply learning more?
                        </h2>
                    </div>
                    <div>
                        <p className="text-sm text-gray-400 mb-1">Contact us at:</p>
                        <a
                            href="iamharshit999@gmail.com"
                            className="text-lg font-medium text-white hover:text-purple-400 inline-block transition focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400"
                            target="_blank"
                        >
                            iamharshit999@gmail.com <FaArrowUpRightFromSquare />
                        </a>
                    </div>
                </div>

                <div className="flex-1 flex flex-col justify-end items-start lg:items-end text-sm space-y-2">
                    <nav aria-label="Footer navigation" className="flex gap-6 text-white font-medium">
                        <Link to='/' className="hover:text-purple-400 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400">Home</Link>
                        <Link to='/about'  className="hover:text-purple-400 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400">About</Link>
                        <Link to='/simulator'  className="hover:text-purple-400 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400">Simulator</Link>
                        <Link to='/blog'  className="hover:text-purple-400 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400">Blog</Link>
                        <Link to='/contact'  className="hover:text-purple-400 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400">Contact</Link>
                    </nav>
                </div>
            </div>

            <div className="mt-16 border-t border-gray-800 pt-10 flex flex-col md:flex-row justify-between items-center">
                <Link to="/" className="flex items-center gap-4 text-white text-4xl font-bold">
                    <img src={Logo} alt="Logo" height="35px" width="35px" className="pt-1"/>
                    <span className="font-sans tracking-tight">Algoviser</span>
                </Link>

                <div className="text-sm text-gray-400 mt-6 md:mt-0 flex flex-col items-center md:items-end">
                    <p className="mb-2">© 2025 Algoviser. All rights reserved.</p>
                    <div className="flex gap-4 text-white text-lg">
                        <a
                            href="https://linkedin.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="LinkedIn"
                            title="LinkedIn"
                        >
                            <FaLinkedin className="hover:text-blue-500 cursor-pointer transition" />
                        </a>
                        <a
                            href="https://facebook.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Facebook"
                            title="Facebook"
                        >
                            <FaFacebook className="hover:text-blue-500 cursor-pointer transition" />
                        </a>
                        <a
                            href="https://twitter.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Twitter"
                            title="Twitter"
                        >
                            <FaTwitter className="hover:text-blue-500 cursor-pointer transition" />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
