import { useState } from 'react';
import { FaClock, FaBrain, FaRedo, FaArrowAltCircleDown, FaRandom } from 'react-icons/fa';

import FCFS_EX from '../assets/images/fifo.jpg';
import OPR_EX from '../assets/images/OPR.jpg';
import LRU_EX from '../assets/images/LRU.jpg';
import MRU_EX from '../assets/images/MRU.jpg';
import SF_EX from '../assets/images/SFJPG.png';

const Blog = () => {
    const [activeTab, setActiveTab] = useState('FCFS');

    const data = {
        FCFS: [
            "In this algorithm, a queue is maintained. The page which is assigned the frame first will be replaced first. In other words, the page which resides at the rare end of the queue will be replaced on every page fault.",
            "However, FIFO is known to suffer from a problem known as Belady's anomaly which occurs when increasing the number of page frames results in an increase in the number of page faults for a given memory access pattern.",
            "Belady's anomaly - Belady's anomaly proves that it is possible to have more page faults when increasing the number of page frames while using the First in First Out (FIFO) page replacement algorithm.",
            "For example, if we consider reference string 3, 2, 1, 0, 3, 2, 4, 3, 2, 1, 0, 4 and 3 slots, we get 9 total page faults, but if we increase slots to 4, we get 10 page faults.",
        ],
        OPR: [
            "Optimal page replacement algorithm replaces the page which will not be referred for so long in future.",
            "Optimal page replacement is perfect, but it is practically impossible to implement because the pages that will not be used in future for the longest time cannot be predicted.",
            "But it can be used as a benchmark as other algorithms are compared to this in terms of optimality.",
        ],
        SF: [
            "Unlike FIFO (evicts oldest) or LRU (evicts least recently used), FAR considers both how often and how recently a page has been used. This often leads to smarter eviction decisions, especially in patterns where some pages reappear frequently.",
        ],
        LRU: [
            "Least Recently Used algorithm replaces the page which has not been referred for a long time i.e., the page least recently used is replaced.",
            "The idea is based on locality of reference. It works on the concept that the pages that are recently used in previous instructions are likely to be used in next instructions too. And the page that are used least recently less are likely to be used less in future.",
            "LRU page replacement algorithm follows the stack property and so, it does not suffer from Belady's Anomaly. Hence, LRU is the preferred page replacement policy over FIFO.",
        ],
        MRU: [
            "Most Recently Used algorithm replaces the page which has been referred most recently.",
            "MRU page replacement algorithm also follows the stack property and so, it does not suffer from Belady's Anomaly.",
            "For a Reference String consisting of repeated sequence of page numbers, MRU will be optimal algorithm. CPU may generate such a reference string when executing loops. This is because while executing loops, same set of instructions have to be executed again and again. In such case, MRU should be used.",
        ],
    };

    const images = {
        FCFS: FCFS_EX,
        OPR: OPR_EX,
        SF: SF_EX,
        LRU: LRU_EX,
        MRU: MRU_EX,
    };

    const icons = {
        FCFS: <FaClock />,
        OPR: <FaBrain />,
        SF: <FaRandom />,
        LRU: <FaRedo />,
        MRU: <FaArrowAltCircleDown />,
    };

    const fullforms = {
        FCFS: "First Come First Serve",
        OPR: "Optimal Page Replacement",
        SF: "Smart Fit",
        LRU: "Least Recently Used",
        MRU: "Most Recently Used"
    }

    return (
        <div className="min-h-screen text-white px-6 py-20">
            <h1 className="text-4xl font-bold text-center mb-12">Page Replacement Techniques</h1>

            <div className="flex justify-center flex-wrap gap-4 mb-12">
                {Object.keys(data).map((key) => (
                    <button
                        key={key}
                        onClick={() => {
                            setActiveTab(key);
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className={`px-6 py-2 rounded-full flex items-center gap-2 text-white font-semibold transition cursor-pointer ${
                            activeTab === key
                                ? 'bg-red-600 border-2 border-white'
                                : 'bg-red-500 hover:bg-red-600'
                        }`}
                    >
                        {icons[key]} {key}
                    </button>
                ))}
            </div>

            <div className="max-w-4xl mx-auto bg-[#1e293b] p-6 rounded-xl shadow-md border border-gray-600 transition-all duration-300">
                <h2 className="text-2xl font-bold text-red-400 mb-4">{activeTab} &#40;{fullforms[activeTab]}&#41;</h2>
                <ul className="list-disc list-inside space-y-2 text-gray-200">
                    {data[activeTab].map((point, idx) => (
                        <li key={idx}>{point}</li>
                    ))}
                </ul>
                {images[activeTab] && (
                    <div className="mt-6">
                        <img
                            src={images[activeTab]}
                            alt={`${activeTab} Example`}
                            className="rounded-lg w-full border border-gray-500"
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Blog;