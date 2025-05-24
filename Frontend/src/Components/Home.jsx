import { Link } from 'react-router-dom';
import page from '../assets/images/pageReplacement1.png';
import LRU from '../assets/images/LRU.png';
import SF from '../assets/images/SF.png';
import FCFS from '../assets/images/FCFS.png';
import MRU from '../assets/images/MRU.png';
import OPR from '../assets/images/OPR.png';

const Home = () => {
    const infoData = [
        {
            title: "What is a page?",
            desc: "For non-contiguous memory allocation, the Logical Address Space is divided into fixed-size blocks, called pages.",
        },
        {
            title: "What is a frame?",
            desc: "The Physical Address Space (Main Memory) is conceptually divided into a number of fixed-size blocks, called frames.",
        },
        {
            title: "What is paging?",
            desc: "Paging is a memory management scheme that eliminates the need for contiguous allocation of physical memory.",
        },
        {
            title: "What is page fault?",
            desc: "Page fault - A page fault occurs when a page referenced by the CPU is not found in the main memory.",
        },
    ];

    return (
        <div className="min-h-screen text-white px-6 pb-12 pt-16">
            <div className="max-w-4xl mx-auto text-center space-y-6 mb-12">
                <h1 className="text-3xl md:text-4xl font-bold">Page Replacement Algorithm Simulator</h1>
                <p className="text-base pb-4 px-4 md:text-lg text-gray-300 leading-relaxed">
                    When a page fault occurs, the required page has to be brought from the secondary memory. 
                    If all the frames of main memory are already occupied, then a page has to be replaced. 
                    The page replacement algorithm decides which memory page is to be replaced.
                </p>
                <img 
                    src={page} 
                    alt="Page Replacement Illustration" 
                    loading="lazy"
                    className="mx-auto w-[300px] h-[300px] object-contain rounded-2xl mb-12" 
                />
                <Link 
                    to="/simulator" 
                    className="inline-block bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-3 rounded-full shadow transition focus:outline-none focus:ring-2 focus:ring-red-400"
                >
                    Go to Simulator
                </Link>
            </div>

            {/* Info Cards Section */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto mb-16" aria-labelledby="info-section">
                {infoData.map((item, index) => (
                    <div
                        key={index}
                        className="relative bg-[#0f172a] border border-white rounded-xl p-6 shadow-[6px_6px_20px_rgba(239,68,68,0.5)] transition hover:scale-[1.02]"
                    >
                        <h2 className="text-2xl font-bold mb-3">{item.title}</h2>
                        <p className="text-gray-200">{item.desc}</p>
                    </div>
                ))}
            </section>

            <section className="text-center space-y-10" aria-labelledby="algo-section">
                <h1 id="algo-section" className="text-3xl md:text-4xl font-bold pb-2 ">The Page Replacement Algorithms</h1>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 justify-center">
                    <img src={LRU} alt="Least Recently Used (LRU)" loading="lazy" className="h-40 w-40 object-contain mx-auto hover:scale-105 transition rounded-2xl" />
                    <img src={MRU} alt="Most Recently Used (MRU)" loading="lazy" className="h-40 w-40 object-contain mx-auto hover:scale-105 transition rounded-2xl" />
                    <img src={SF} alt="Second Chance / FIFO (SF)" loading="lazy" className="h-40 w-40 object-contain mx-auto hover:scale-105 transition rounded-2xl" />
                    <img src={OPR} alt="Optimal Page Replacement (OPR)" loading="lazy" className="h-40 w-40 object-contain mx-auto hover:scale-105 transition rounded-2xl" />
                    <img src={FCFS} alt="First Come First Serve (FCFS)" loading="lazy" className="h-40 w-40 object-contain mx-auto hover:scale-105 transition rounded-2xl" />
                </div>
                <Link 
                    to="/blog" 
                    className="font-semibold inline-block bg-red-500 text-white px-6 py-3 rounded-full hover:bg-red-600 transition focus:outline-none focus:ring-2 focus:ring-red-400"
                >
                    Learn More
                </Link>
            </section>
        </div>
    );
};

export default Home;
