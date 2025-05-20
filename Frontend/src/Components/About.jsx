import { FaTwitter, FaInstagram, FaGithub } from "react-icons/fa";

const teamMembers = [
    {
        name: "Ansh Jain",
        role: "Custom Algorithm Developer, FCFS Implementation",
        image: "/path/to/ansh.jpg",
    },
    {
        name: "Gagan Tiwari",
        role: "Lead Designer, Algorithm Testing and Implementation",
        image: "/path/to/gagan.jpg",
    },
    {
        name: "Harshit Gupta",
        role: "Team Lead, Front End And Backend Developer",
        image: "/path/to/harshit.jpg",
    },
    {
        name: "Rohan Agarwal",
        role: "Algorithm Implementation and Presenter",
        image: "/path/to/rohan.jpg",
    },
];

export default function About() {
    return (
        <div className="min-h-screen bg-[#0f172a] py-12">
            <section className="text-white text-center px-4">
                <h2 className="text-4xl font-bold">Our Executive Team</h2>
                <p className="mt-4 text-gray-300 max-w-2xl mx-auto">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo
                    incidunt ex placeat modi magni quia error alias, adipisci rem
                    similique, at omnis eligendi optio eos harum.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12 max-w-6xl mx-auto">
                    {teamMembers.map((member, index) => (
                        <div
                            key={index}
                            className="bg-[#1e293b] p-6 rounded-lg border border-gray-500 hover:shadow-xl transition"
                        >
                            <div className="flex justify-center mb-4">
                                <img
                                    src={member.image}
                                    alt={member.name}
                                    className="w-24 h-24 rounded-full border-3 border-red-500 object-cover"
                                />
                            </div>
                            <h3 className="text-xl font-bold">{member.name}</h3>
                            <p className="text-gray-300 text-sm mt-2">{member.role}</p>
                            <div className="flex justify-center gap-4 mt-4 text-xl">
                                <FaTwitter className="hover:text-blue-400 cursor-pointer" />
                                <FaInstagram className="hover:text-pink-400 cursor-pointer" />
                                <FaGithub className="hover:text-yellow-600 cursor-pointer" />
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
