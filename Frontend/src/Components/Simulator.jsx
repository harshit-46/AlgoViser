import {useState} from 'react';
import FIFO from './Algorithms/FIFO';
import LRU from './Algorithms/LRU';
import SF from './Algorithms/SF';
import MRU from './Algorithms/MRU';
import OPTIMAL from './Algorithms/OPTIMAL';

const Simulator = () => {
    const [frames, setFrames] = useState('');
    const [sequence, setSequence] = useState('');
    const [selectedAlgo, setSelectedAlgo] = useState('');
    const [parsedSequence, setParsedSequence] = useState([]);

    const handleSimulate = (type) => {
        if (!frames || !sequence) {
            alert('Please enter both frames and page sequence.');
            return;
        }

        const parsedSeq = sequence.split(/[\s,]+/).map(Number);
        const parsedFrames = parseInt(frames);

        if (parsedSeq.some(isNaN) || isNaN(parsedFrames)) {
            alert('Invalid input. Please enter numbers only.');
            return;
        }

        setParsedSequence(parsedSeq);
        setSelectedAlgo(type);
    };

    const handleReset = () => {
        setFrames('');
        setSequence('');
        setSelectedAlgo('');
        setParsedSequence([]);
    };

    return (
        <div className="min-h-screen bg-[#0f172a] flex flex-col items-center text-white px-4">
            <div className="mb-6 text-center max-w-2xl">
                <h2 className="text-5xl font-semibold mb-6 mt-8">How to Use:</h2>
                <p className="text-gray-300">
                    Enter the number of frames (e.g. 3) and the page reference sequence separated by space or comma e.g. 1, 2, 3, 4, 2, 1.
                    Then click one of the buttons (FCFS, OPR, LRU, MRU) to simulate the algorithm. Use RESET to clear inputs.
                </p>
            </div>

            <div className="border border-gray-400 rounded-2xl p-10 w-full max-w-xl bg-[#1e293b] mt-4">
                <h1 className="text-4xl text-center font-semibold mb-10">Simulator</h1>

                <div className="mb-6">
                    <label className="block mb-2 text-lg">Enter Number of Frames</label>
                    <input
                        type="number"
                        className="w-full p-2 rounded text-black bg-white"
                        value={frames}
                        onChange={(e) => setFrames(e.target.value)}
                    />
                </div>

                <div className="mb-6">
                    <label className="block mb-2 text-lg">Enter The Page Sequence</label>
                    <input
                        type="text"
                        className="w-full p-2 rounded text-black bg-white"
                        placeholder="e.g. 1, 2, 3, 4, 2, 1"
                        value={sequence}
                        onChange={(e) => setSequence(e.target.value)}
                    />
                </div>

                <div className="flex justify-around gap-4 flex-wrap mb-6">
                    <button onClick={() => handleSimulate('FIFO')} className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded font-semibold cursor-pointer">FCFS</button>
                    <button onClick={() => handleSimulate('OPR')} className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded font-semibold cursor-pointer">OPR</button>
                    <button onClick={() => handleSimulate('SF')} className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded font-semibold cursor-pointer">SF</button>
                    <button onClick={() => handleSimulate('LRU')} className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded font-semibold cursor-pointer">LRU</button>
                    <button onClick={() => handleSimulate('MRU')} className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded font-semibold cursor-pointer">MRU</button>
                    <button onClick={handleReset} className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded font-semibold cursor-pointer">RESET</button>
                </div>
            </div>

            {/* Render selected algorithm */}
            <div className="mt-10 w-full px-4">
                {selectedAlgo === 'FIFO' && (
                    <FIFO frame={parseInt(frames)} seq={parsedSequence} mainSeq={sequence} />
                )}
                {selectedAlgo === 'LRU' && (
                    <LRU frame={parseInt(frames)} seq={parsedSequence} mainSeq={sequence} />
                )}
                {selectedAlgo === 'MRU' && (
                    <MRU frame={parseInt(frames)} seq={parsedSequence} mainSeq={sequence} />
                )}
                {selectedAlgo === 'OPR' && (
                    <OPTIMAL frame={parseInt(frames)} seq={parsedSequence} mainSeq={sequence} />
                )}
                {selectedAlgo === 'SF' && (
                    <SF frame={parseInt(frames)} seq={parsedSequence} mainSeq={sequence} />
                )}
            </div>
        </div>
    );
};

export default Simulator