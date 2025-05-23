import React from "react";
import { FaLinkedin, FaFacebook, FaTwitter } from "react-icons/fa";

export default function Footer() {
    return (
        <footer className="bg-gradient-to-br from-black via-[#090B1F] to-black text-white px-6 md:px-16 py-16">
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
                            href="mailto:iddo.gino@datawizz.ai"
                            className="text-lg font-medium text-white hover:text-purple-400 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400"
                        >
                            iddo.gino@datawizz.ai
                        </a>
                    </div>
                </div>

                <div className="flex-1 flex flex-col justify-end items-start lg:items-end text-sm space-y-2">
                    <nav aria-label="Footer navigation" className="flex gap-6 text-white font-medium">
                        <a href="#how-it-works" className="hover:text-purple-400 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400">How It Works</a>
                        <a href="#benefits" className="hover:text-purple-400 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400">Benefits</a>
                        <a href="#features" className="hover:text-purple-400 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400">Features</a>
                        <a href="#team" className="hover:text-purple-400 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400">Team</a>
                    </nav>
                </div>
            </div>

            <div className="mt-16 border-t border-gray-800 pt-10 flex flex-col md:flex-row justify-between items-center">
                <a href="/" className="flex items-center gap-4 text-white text-4xl font-bold">
                    <div className="bg-white text-black w-10 h-10 flex items-center justify-center rounded-md font-black">
                        D
                    </div>
                    <span className="font-sans tracking-tight">Algoviser</span>
                </a>

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
                            <FaLinkedin className="hover:text-blue-400 cursor-pointer transition" />
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
                            <FaTwitter className="hover:text-blue-300 cursor-pointer transition" />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
