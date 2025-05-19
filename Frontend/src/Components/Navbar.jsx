import { Link } from "react-router-dom";
import { HiSquare3Stack3D } from "react-icons/hi2";

export default function Navbar() {
    return (
        <nav className="bg-black text-white">
            <div className="container mx-auto px-12 py-2 flex justify-between items-center">
                <Link to="/" className="flex items-center">
                    <HiSquare3Stack3D />
                    <span className="text-xl font-bold ">
                        Algoviser
                    </span>
                </Link>

                <div className="flex items-center space-x-4">
                    <Link to="/" className="font-semibold">
                        HOME
                    </Link>
                    <Link to="/about" className="font-semibold">
                        ABOUT
                    </Link>
                </div>
            </div>
        </nav >
    );
}