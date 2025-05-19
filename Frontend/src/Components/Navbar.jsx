import { Link } from "react-router-dom";
import logo from '../assets/images/Logo1.png';

export default function Navbar() {
    return (
        <nav className="bg-black text-white h-14 flex justify-between items-center">
            <div className="container mx-auto px-12 py-2 flex justify-between items-center">
                <Link to="/" className="flex items-center">
                    <img src={logo} alt="Logo" height="28px" width="28px"/>
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
                    <Link to="/simulator" className="font-semibold">
                        SIMULATOR
                    </Link>
                    <Link to="/blog" className="font-semibold">
                        BLOG
                    </Link>
                    <Link to="/contact" className="font-semibold">
                        CONTACT
                    </Link>
                </div>
            </div>
        </nav >
    );
}