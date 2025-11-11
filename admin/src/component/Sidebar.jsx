import React from 'react';
import { IoIosAddCircleOutline } from "react-icons/io";
import { FaRegListAlt } from "react-icons/fa";
import { SiTicktick } from "react-icons/si";
import { useNavigate, useLocation } from 'react-router-dom';

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const links = [
    { icon: <IoIosAddCircleOutline className="w-[20px] h-[20px]" />, text: "Add Product", path: "/add" },
    { icon: <FaRegListAlt className="w-[20px] h-[20px]" />, text: "List Items", path: "/lists" },
    { icon: <SiTicktick className="w-[20px] h-[20px]" />, text: "Orders", path: "/orders" },
  ];

  return (
    <div className="w-[18%] min-h-[100vh] bg-[#ffffff] border-r border-gray-200 fixed left-0 top-0 py-[60px] flex flex-col items-start justify-start shadow-sm">
      <div className="w-full flex flex-col gap-2 pt-[40px] pl-[15%] text-[15px] font-medium">
        {links.map((link, index) => {
          const isActive = location.pathname === link.path;
          return (
            <div
              key={index}
              onClick={() => navigate(link.path)}
              className={`flex items-center justify-start gap-3 px-4 py-3 cursor-pointer rounded-r-full transition-all duration-300 
              ${isActive
                ? "bg-black text-white shadow-md"
                : "text-gray-800 hover:bg-gray-100 hover:text-black"
              }`}
            >
              {link.icon}
              <p className="hidden md:block">{link.text}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Sidebar;
