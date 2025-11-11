import React, { useContext, useState } from 'react'
import logo from '../assets/logo.png'
import { IoSearchCircleOutline } from "react-icons/io5";
import { FaCircleUser } from "react-icons/fa6";
import { MdOutlineShoppingCart } from "react-icons/md";
import { userDataContext } from '../context/UserContext';
import { IoSearchCircleSharp } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import { IoMdHome } from "react-icons/io";
import { HiOutlineCollection } from "react-icons/hi";
import { MdContacts } from "react-icons/md";
import axios from 'axios';
import { authDataContext } from '../context/authContext';
import { shopDataContext } from '../context/ShopContext';

function Nav() {
    let { getCurrentUser, userData } = useContext(userDataContext)
    let { serverUrl } = useContext(authDataContext)
    let { showSearch, setShowSearch, search, setSearch, getCartCount } = useContext(shopDataContext)
    let [showProfile, setShowProfile] = useState(false)
    let navigate = useNavigate()

    const handleLogout = async () => {
        try {
            const result = await axios.get(serverUrl + "/api/auth/logout", { withCredentials: true })
            console.log(result.data)
            navigate("/login")
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='w-[100vw] h-[70px] bg-[#ebe9e3] z-30 fixed top-0 flex items-center justify-between px-[30px] shadow-[0_2px_8px_rgba(0,0,0,0.06)] transition-all duration-300'>

            {/* Logo Section */}
            <div className='w-[20%] lg:w-[30%] flex items-center justify-start gap-3'>
                <img src={logo} alt="OGNÉ Logo" className='w-[45px] h-[45px] object-contain' />
                <h1 className='text-[25px] text-black font-sans font-semibold'>OGNÉ</h1>
            </div>

            {/* Desktop Navigation */}
            <div className='w-[50%] lg:w-[40%] hidden md:flex'>
                <ul className='flex items-center justify-center gap-5 text-white'>
                    <li className='text-[15px] hover:bg-slate-600 transition-colors cursor-pointer bg-[#000000c9] py-2 px-5 rounded-2xl' onClick={() => navigate("/")}>HOME</li>
                    <li className='text-[15px] hover:bg-slate-600 transition-colors cursor-pointer bg-[#000000c9] py-2 px-5 rounded-2xl' onClick={() => navigate("/collection")}>COLLECTIONS</li>
                    <li className='text-[15px] hover:bg-slate-600 transition-colors cursor-pointer bg-[#000000c9] py-2 px-5 rounded-2xl' onClick={() => navigate("/about")}>ABOUT</li>
                    <li className='text-[15px] hover:bg-slate-600 transition-colors cursor-pointer bg-[#000000c9] py-2 px-5 rounded-2xl' onClick={() => navigate("/contact")}>CONTACT</li>
                </ul>
            </div>

            {/* Action Icons */}
            <div className='w-[30%] flex items-center justify-end gap-5 relative'>
                {!showSearch ? (
                    <IoSearchCircleOutline
                        className='w-[38px] h-[38px] text-black cursor-pointer hover:scale-105 transition-transform'
                        onClick={() => { setShowSearch(prev => !prev); navigate("/collection") }}
                    />
                ) : (
                    <IoSearchCircleSharp
                        className='w-[38px] h-[38px] text-black cursor-pointer hover:scale-105 transition-transform'
                        onClick={() => setShowSearch(prev => !prev)}
                    />
                )}

                {!userData ? (
                    <FaCircleUser
                        className='w-[29px] h-[29px] text-black cursor-pointer hover:scale-105 transition-transform'
                        onClick={() => setShowProfile(prev => !prev)}
                    />
                ) : (
                    <div
                        className='w-[30px] h-[30px] bg-black text-white rounded-full flex items-center justify-center cursor-pointer font-semibold hover:scale-105 transition-transform'
                        onClick={() => setShowProfile(prev => !prev)}
                    >
                        {userData?.name?.slice(0, 1)}
                    </div>
                )}

                <div className='relative hidden md:block'>
                    <MdOutlineShoppingCart
                        className='w-[30px] h-[30px] text-black cursor-pointer hover:scale-105 transition-transform'
                        onClick={() => navigate("/cart")}
                    />
                    <span className='absolute -top-2 -right-2 w-[18px] h-[18px] flex items-center justify-center bg-black text-white rounded-full text-[9px] font-medium'>
                        {getCartCount()}
                    </span>
                </div>
            </div>

            {/* Search Bar */}
            {showSearch && (
                <div className='w-full h-[80px] bg-[#d8f6f9] absolute top-full left-0 flex items-center justify-center shadow-md'>
                    <input
                        type="text"
                        className='lg:w-[50%] w-[80%] h-[60%] bg-[#233533] rounded-[30px] px-5 placeholder:text-white text-white text-[18px] focus:outline-none focus:ring-2 focus:ring-blue-400'
                        placeholder='Search Here'
                        onChange={(e) => { setSearch(e.target.value) }}
                        value={search}
                    />
                </div>
            )}

            {/* Profile Dropdown */}
            {showProfile && (
                <div className='absolute w-[220px] h-[150px] bg-[#000000] top-full right-[4%] border border-gray-600 rounded-xl z-40 shadow-lg'>
                    <ul className='w-full h-full flex flex-col justify-center text-white'>
                        {!userData ? (
                            <li
                                className='w-full hover:bg-[#2f2f2f] px-5 py-3 cursor-pointer transition-colors'
                                onClick={() => { navigate("/login"); setShowProfile(false) }}
                            >
                                Login
                            </li>
                        ) : (
                            <li
                                className='w-full hover:bg-[#2f2f2f] px-5 py-3 cursor-pointer transition-colors'
                                onClick={() => { handleLogout(); setShowProfile(false) }}
                            >
                                LogOut
                            </li>
                        )}
                        <li
                            className='w-full hover:bg-[#2f2f2f] px-5 py-3 cursor-pointer transition-colors'
                            onClick={() => { navigate("/order"); setShowProfile(false) }}
                        >
                            Orders
                        </li>
                        <li
                            className='w-full hover:bg-[#2f2f2f] px-5 py-3 cursor-pointer transition-colors'
                            onClick={() => { navigate("/about"); setShowProfile(false) }}
                        >
                            About
                        </li>
                    </ul>
                </div>
            )}

            {/* Mobile Bottom Navigation */}
            <div className='w-full h-[70px] flex items-center justify-between px-5 fixed bottom-0 left-0 bg-[#191818] md:hidden z-20'>
                <button
                    className='text-white flex flex-col items-center justify-center gap-1 transition-transform hover:scale-105'
                    onClick={() => navigate("/")}
                >
                    <IoMdHome className='w-6 h-6 text-white' />
                    <span className='text-[11px]'>Home</span>
                </button>
                <button
                    className='text-white flex flex-col items-center justify-center gap-1 transition-transform hover:scale-105'
                    onClick={() => navigate("/collection")}
                >
                    <HiOutlineCollection className='w-6 h-6 text-white' />
                    <span className='text-[11px]'>Collections</span>
                </button>
                <button
                    className='text-white flex flex-col items-center justify-center gap-1 transition-transform hover:scale-105'
                    onClick={() => navigate("/contact")}
                >
                    <MdContacts className='w-6 h-6 text-white' />
                    <span className='text-[11px]'>Contact</span>
                </button>
                <div className='relative'>
                    <button
                        className='text-white flex flex-col items-center justify-center gap-1 transition-transform hover:scale-105'
                        onClick={() => navigate("/cart")}
                    >
                        <MdOutlineShoppingCart className='w-6 h-6 text-white' />
                        <span className='text-[11px]'>Cart</span>
                    </button>
                    <span className='absolute -top-1 -right-2 w-[16px] h-[16px] flex items-center justify-center bg-white text-black font-semibold rounded-full text-[8px]'>
                        {getCartCount()}
                    </span>
                </div>
            </div>
        </div>
    )
}

export default Nav
