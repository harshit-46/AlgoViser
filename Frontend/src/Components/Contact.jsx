export default function ContactForm() {
    return (
        <div className="min-h-screen bg-[#0f172a] flex flex-col items-center justify-center p-4">
            <div>
                <h1>Let's Work Together</h1>
            </div>
            <div className="bg-[#1e293b] p-10 rounded-2xl shadow-lg w-full max-w-lg border border-gray-400">
                <h2 className="text-white text-3xl font-bold text-center mb-8">
                    Get in Touch
                </h2>

                <form className="space-y-6">
                    <div>
                        <label className="block text-white text-lg mb-1">Name</label>
                        <input
                            type="text"
                            placeholder="Enter Your Name"
                            className="w-full p-3 rounded-md text-black bg-white"
                        />
                    </div>

                    <div>
                        <label className="block text-white text-lg mb-1">Email</label>
                        <input
                            type="email"
                            placeholder="Enter Your Email"
                            className="w-full p-3 rounded-md text-black bg-white"
                        />
                    </div>

                    <div>
                        <label className="block text-white text-lg mb-1">
                            Message
                        </label>
                        <textarea
                            placeholder="Enter Your Message"
                            rows="4"
                            className="w-full p-3 rounded-md text-black bg-white"
                        ></textarea>
                    </div>

                    <button
                        type="submit"
                        className="bg-red-500 text-white py-3 px-6 rounded-md w-full hover:bg-red-600 transition cursor-pointer"
                    >
                        SUBMIT
                    </button>
                </form>
            </div>
        </div>
    );
}
