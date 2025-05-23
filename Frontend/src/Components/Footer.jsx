import React from "react";
import { FaLinkedin, FaFacebook, FaTwitter } from "react-icons/fa";

export default function Footer() {
    return (
        <footer className="bg-gradient-to-br from-black via-[#090B1F] to-black text-white px-6 md:px-16 py-16">
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between gap-16">
                {/* Left Section */}
                <div className="flex-1 space-y-6">
                    <div>
                        <p className="text-sm text-blue-400 font-semibold mb-2">+ Contact Us</p>
                        <h2 className="text-3xl sm:text-4xl font-semibold leading-snug">
                            Interested in working together, trying our platform or simply learning more?
                        </h2>
                    </div>
                    <div>
                        <p className="text-sm text-gray-400 mb-1">Contact Iddo at:</p>
                        <a
                            href="mailto:iddo.gino@datawizz.ai"
                            className="text-lg font-medium text-white hover:text-purple-400 transition"
                        >
                            iddo.gino@datawizz.ai ↗
                        </a>
                    </div>
                </div>

                {/* Right Navigation */}
                <div className="flex-1 flex flex-col justify-end items-start lg:items-end text-sm space-y-2">
                    <div className="flex gap-6 text-white font-medium">
                        <a href="#how-it-works" className="hover:text-purple-400 transition">How It Works</a>
                        <a href="#benefits" className="hover:text-purple-400 transition">Benefits</a>
                        <a href="#features" className="hover:text-purple-400 transition">Features</a>
                        <a href="#team" className="hover:text-purple-400 transition">Team</a>
                    </div>
                </div>
            </div>

            {/* Logo and Bottom Row */}
            <div className="mt-16 border-t border-gray-800 pt-10 flex flex-col md:flex-row justify-between items-center">
                {/* Logo */}
                <div className="flex items-center gap-4 text-white text-4xl font-bold">
                    <div className="bg-white text-black w-10 h-10 flex items-center justify-center rounded-md font-black">
                        D
                    </div>
                    <span className="font-sans tracking-tight">datawizz</span>
                </div>

                {/* Social + Copyright */}
                <div className="text-sm text-gray-400 mt-6 md:mt-0 flex flex-col items-center md:items-end">
                    <p className="mb-2">© 2024 Datawizz. All rights reserved.</p>
                    <div className="flex gap-4 text-white text-lg">
                        <FaLinkedin className="hover:text-blue-400 cursor-pointer" />
                        <FaFacebook className="hover:text-blue-500 cursor-pointer" />
                        <FaTwitter className="hover:text-blue-300 cursor-pointer" />
                    </div>
                </div>
            </div>
        </footer>
    );
}
