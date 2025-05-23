import React from "react";
import { motion } from "framer-motion";
import {
    FaCogs,
    FaLightbulb,
    FaTools,
    FaChartLine,
    FaCodeBranch
} from "react-icons/fa";
import { Player } from "@lottiefiles/react-lottie-player";
import { Link } from "react-router-dom";


const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
    viewport: { once: true },
};

export default function About() {
    return (
        <div className="text-white min-h-screen px-6 md:px-24 py-16">
            <motion.h1
                className="text-5xl font-bold text-center mb-12"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                About Algoviser
            </motion.h1>

            <div className="flex justify-center mb-12">
                <Player
                    autoplay
                    loop
                    src="https://assets5.lottiefiles.com/packages/lf20_myejiggj.json"
                    style={{ height: "300px", width: "300px" }}
                />
            </div>

            <div className="space-y-16">
                <Section icon={<FaCogs />} title="What It Does">
                    Algoviser is a visual learning tool that demonstrates how various{" "}
                    <span className="font-semibold text-purple-300">page replacement algorithms</span> function in an operating system. It simplifies abstract memory management concepts through animation, step-by-step execution, and real-time feedback.
                </Section>

                <Section icon={<FaTools />} title="Key Features">
                    <ul className="list-disc list-inside space-y-2">
                        <li>Simulates FIFO, LRU, Optimal, and other strategies</li>
                        <li>Customizable reference strings and frame size</li>
                        <li>Responsive design with mobile-first interactivity</li>
                        <li>Displays stats like hit/miss ratio and fault count</li>
                    </ul>
                </Section>

                <Section icon={<FaCodeBranch />} title="Tech Stack">
                    <ul className="list-disc list-inside space-y-2">
                        <li>React (Vite) for frontend architecture</li>
                        <li>Tailwind CSS for utility-first styling</li>
                        <li>React Router for seamless navigation</li>
                        <li>Framer Motion & React Icons for visuals & interactivity</li>
                    </ul>
                </Section>

                <Section icon={<FaLightbulb />} title="Motivation">
                    Inspired by the difficulty students face while grasping OS memory concepts, Algoviser aims to bridge the gap between theory and practice with a clean, intuitive interface that encourages experimentation and learning.
                </Section>

                <Section icon={<FaChartLine />} title="What I Learned">
                    <ul className="list-disc list-inside space-y-2">
                        <li>Managing algorithm state and animations in React</li>
                        <li>Performance optimization in UI-heavy apps</li>
                        <li>Improved understanding of real OS paging strategies</li>
                    </ul>
                </Section>

                <motion.div
                    className="bg-[#1e293b] bg-opacity-10 backdrop-blur-lg p-6 rounded-2xl shadow-md text-center"
                    {...fadeIn}
                >
                    <h2 className="text-2xl font-semibold mb-4">🎥 Project Walkthrough</h2>
                    <div className="aspect-video">
                        <iframe
                            className="w-full h-full rounded-lg"
                            loading="lazy"
                            src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                            title="Algoviser Walkthrough"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    </div>
                    <p className="mt-4 text-purple-100">
                        Watch how Algoviser makes memory management easier to understand.
                    </p>
                </motion.div>

                <motion.div className="text-center mt-20" {...fadeIn}>
                    <h2 className="text-2xl font-bold mb-4">Ready to explore?</h2>
                    <p className="text-purple-100 mb-6">
                        Dive into the simulator and watch memory management come alive.
                    </p>
                    <Link
                        to="/simulator"
                        className="bg-red-500 hover:bg-red-600 text-white py-3 px-6 rounded-full font-semibold transition"
                    >
                        Try the Simulator
                    </Link>
                </motion.div>
            </div>
        </div>
    );
}

function Section({ icon, title, children }) {
    return (
        <motion.div
            className="bg-[#1e293b] bg-opacity-10 backdrop-blur-lg p-6 rounded-2xl shadow-md"
            {...fadeIn}
        >
            <h2 className="text-2xl font-semibold flex items-center gap-3 mb-4">
                <span className="text-xl text-purple-300">{icon}</span> {title}
            </h2>
            <div className="text-base leading-relaxed text-purple-100">{children}</div>
        </motion.div>
    );
};