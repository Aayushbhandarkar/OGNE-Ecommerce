import React, { useContext, useEffect, useState } from 'react';
import { FaChevronRight, FaChevronDown } from "react-icons/fa";
import Title from '../component/Title';
import { shopDataContext } from '../context/ShopContext';
import Card from '../component/Card';
import { motion, AnimatePresence } from 'framer-motion';

function Collections() {

  const [showFilter, setShowFilter] = useState(false);
  const { products, search, showSearch } = useContext(shopDataContext);
  const [filterProduct, setFilterProduct] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState("relavent");

  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory(prev => prev.filter(item => item !== e.target.value));
    } else {
      setCategory(prev => [...prev, e.target.value]);
    }
  };

  const toggleSubCategory = (e) => {
    if (subCategory.includes(e.target.value)) {
      setSubCategory(prev => prev.filter(item => item !== e.target.value));
    } else {
      setSubCategory(prev => [...prev, e.target.value]);
    }
  };

  const applyFilter = () => {
    let productCopy = products.slice();

    if (showSearch && search) {
      productCopy = productCopy.filter(item =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category.length > 0) {
      productCopy = productCopy.filter(item => category.includes(item.category));
    }

    if (subCategory.length > 0) {
      productCopy = productCopy.filter(item => subCategory.includes(item.subCategory));
    }

    setFilterProduct(productCopy);
  };

  const sortProducts = () => {
    let sortedCopy = filterProduct.slice();
    switch (sortType) {
      case 'low-high':
        setFilterProduct(sortedCopy.sort((a, b) => a.price - b.price));
        break;
      case 'high-low':
        setFilterProduct(sortedCopy.sort((a, b) => b.price - a.price));
        break;
      default:
        applyFilter();
        break;
    }
  };

  useEffect(() => {
    sortProducts();
  }, [sortType]);

  useEffect(() => {
    setFilterProduct(products);
  }, [products]);

  useEffect(() => {
    applyFilter();
  }, [category, subCategory, search, showSearch]);

  return (
    <div className="w-screen min-h-screen bg-gradient-to-r from-[#ffffff] via-[#f8f8f8] to-[#efefef] flex flex-col md:flex-row justify-start pt-[80px] overflow-x-hidden pb-[100px] transition-all duration-500">

      {/* Left Filter Section */}
      <div className={`md:w-[25vw] lg:w-[20vw] w-[100vw] ${showFilter ? "h-[45vh]" : "h-[8vh]"} p-[20px] border-r border-gray-200 text-gray-800 bg-[#ffffff9a] backdrop-blur-xl md:fixed shadow-sm`}>
        <p
          className="text-[23px] tracking-wide font-medium flex gap-[6px] items-center justify-between cursor-pointer text-gray-900"
          onClick={() => setShowFilter(prev => !prev)}
        >
          FILTERS
          {!showFilter ? (
            <FaChevronRight className="text-[18px] md:hidden" />
          ) : (
            <FaChevronDown className="text-[18px] md:hidden" />
          )}
        </p>

        <div className={`${showFilter ? "" : "hidden"} md:block`}>
          {/* Categories */}
          <div className="border border-gray-300 rounded-lg p-4 mt-6 bg-white/70 hover:shadow-md transition-all duration-300">
            <p className="text-[17px] font-semibold mb-2 text-gray-800">CATEGORIES</p>
            <div className="flex flex-col gap-2 text-[15px]">
              <label className="flex items-center gap-2">
                <input type="checkbox" value="Men" onChange={toggleCategory} className="accent-black" /> Men
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" value="Women" onChange={toggleCategory} className="accent-black" /> Women
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" value="Kids" onChange={toggleCategory} className="accent-black" /> Kids
              </label>
            </div>
          </div>

          {/* Sub-Categories */}
          <div className="border border-gray-300 rounded-lg p-4 mt-6 bg-white/70 hover:shadow-md transition-all duration-300">
            <p className="text-[17px] font-semibold mb-2 text-gray-800">SUB-CATEGORIES</p>
            <div className="flex flex-col gap-2 text-[15px]">
              <label className="flex items-center gap-2">
                <input type="checkbox" value="TopWear" onChange={toggleSubCategory} className="accent-black" /> Topwear
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" value="BottomWear" onChange={toggleSubCategory} className="accent-black" /> Bottomwear
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" value="WinterWear" onChange={toggleSubCategory} className="accent-black" /> Winterwear
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Right Content Section */}
      <div className="lg:pl-[20%] md:py-[10px] px-[20px] w-full">
        <div className="flex flex-col lg:flex-row items-center justify-between lg:px-[40px] mb-[40px]">
          <Title text1="ALL" text2="COLLECTIONS" />
          <select
            className="bg-white/70 border border-gray-300 rounded-md px-3 h-[45px] mt-4 lg:mt-0 text-gray-800 font-medium hover:border-black transition-all duration-300 focus:outline-none"
            onChange={(e) => setSortType(e.target.value)}
          >
            <option value="relavent">Sort By: Relevant</option>
            <option value="low-high">Sort By: Low to High</option>
            <option value="high-low">Sort By: High to Low</option>
          </select>
        </div>

        {/* Product Cards with Animation */}
        <AnimatePresence mode="popLayout">
          <motion.div
            layout
            className="
              w-full 
              grid 
              grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 
              gap-[20px] sm:gap-[25px] md:gap-[30px] lg:gap-[40px]
            "
          >
            {filterProduct.map((item) => (
              <motion.div
                key={item._id}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="flex justify-center"
              >
                <Card id={item._id} name={item.name} price={item.price} image={item.image1} />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

export default Collections;
