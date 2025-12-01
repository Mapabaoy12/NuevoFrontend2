
import { NavLink } from "react-router-dom";
import { navbarLinks } from "../../constants/links";
import { HiOutlineSearch } from "react-icons/hi";
import { Link } from "react-router-dom";
import { FaBarsStaggered } from "react-icons/fa6";
import { Logo } from "./Logo";
import { CgMenuCake } from 'react-icons/cg';
import { useCart } from "../../context/CartContext";

export const NavBar = () =>{
    const { cart } = useCart();
    return ( 
    <header className='bg-yellow-600 text-black py-4 flex items-center justify-between px-5 border-b border-slate-200 lg:px-12'>
        {/*Logo*/}
        <Logo/>


        <nav className="space-x-5">
            {
                navbarLinks.map(link => (
                    <NavLink
                        key = {link.id}
                        to={link.href}
                        className={({isActive}) => `${isActive ? 'text-white underline' : ''} transition-all duration-300 font-medium hover:text-rose-300 hover:underline`}
                    >
                        {link.title}
                    </NavLink>
                ))
            }
        </nav>

        <div className="flex gap-5 items-center">
           

            <div className="relative">
                {/*Usuario nav */}
                <Link to='/account' className="border-2 border-slate-700 w-9 h-9 rounded-full grid place-items-center text-lg font-bold">
                    R
                </Link>
            </div>
            <Link to="/cart" className="relative">
                {cart.itemCount > 0 && (
                    <span className="absolute -bottom-2 -right-2 w-5 h-5 grid place-items-center bg-black text-white text-xs rounded-full">
                        {cart.itemCount}
                    </span>
                )}
                <CgMenuCake size={25}/>
            </Link>
        </div>

        <button className="md:hidden">
            <FaBarsStaggered size={25}/>
        </button>
    </header>
    )
};

  