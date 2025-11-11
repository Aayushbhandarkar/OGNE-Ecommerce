import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { shopDataContext } from '../context/ShopContext';
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import RelatedProduct from '../component/RelatedProduct';
import Loading from '../component/Loading';
import { motion } from 'framer-motion';

function ProductDetail() {
  let { productId } = useParams();
  let { products, currency, addtoCart, loading } = useContext(shopDataContext);
  let [productData, setProductData] = useState(false);

  const [image, setImage] = useState('');
  const [image1, setImage1] = useState('');
  const [image2, setImage2] = useState('');
  const [image3, setImage3] = useState('');
  const [image4, setImage4] = useState('');
  const [size, setSize] = useState('');

  const fetchProductData = async () => {
    products.map((item) => {
      if (item._id === productId) {
        setProductData(item);
        setImage1(item.image1);
        setImage2(item.image2);
        setImage3(item.image3);
        setImage4(item.image4);
        setImage(item.image1);
        return null;
      }
    });
  };

  useEffect(() => {
    fetchProductData();
  }, [productId, products]);

  return productData ? (
    <div className="w-screen min-h-screen bg-gradient-to-r from-[#ffffff] via-[#f8f8f8] to-[#efefef] flex flex-col items-center overflow-x-hidden transition-all duration-500">
      
      {/* PRODUCT SECTION */}
      <div className="w-[95%] lg:w-[85%] flex flex-col lg:flex-row items-start justify-center gap-[50px] mt-[120px]">
        
        {/* LEFT: IMAGES */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col lg:flex-row gap-[20px] items-center justify-center lg:w-[50%]"
        >
          {/* Thumbnail Images */}
          <div className="flex lg:flex-col flex-row gap-[15px] justify-center items-center">
            {[image1, image2, image3, image4].map((img, index) => (
              <img
                key={index}
                src={img}
                alt="thumbnail"
                onClick={() => setImage(img)}
                className={`w-[70px] h-[90px] object-cover rounded-lg cursor-pointer border ${image === img ? 'border-black' : 'border-gray-200'} hover:opacity-80 transition-all duration-300`}
              />
            ))}
          </div>

          {/* Main Image */}
          <div className="w-[85%] lg:w-[450px] h-[500px] bg-gray-100 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300">
            <img src={image} alt={productData.name} className="w-full h-full object-cover" />
          </div>
        </motion.div>

        {/* RIGHT: DETAILS */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-start justify-start gap-[20px] w-full lg:w-[45%] px-[10px]"
        >
          <h1 className="text-[32px] md:text-[40px] font-semibold text-gray-900 leading-tight">
            {productData.name}
          </h1>

          {/* Rating */}
          <div className="flex items-center gap-1 text-yellow-500">
            <FaStar /><FaStar /><FaStar /><FaStar /><FaStarHalfAlt />
            <p className="text-gray-600 text-[15px] pl-[5px]">(124 reviews)</p>
          </div>

          {/* Price */}
          <p className="text-[26px] font-bold text-gray-900">
            {currency} {productData.price}
          </p>

          {/* Description */}
          <p className="text-gray-700 text-[15px] md:text-[17px] leading-relaxed max-w-[500px]">
            {productData.description} — A stylish, breathable cotton shirt with a modern fit. Designed for effortless fashion and comfort.
          </p>

          {/* Select Size */}
          <div className="flex flex-col gap-[10px] mt-[10px]">
            <p className="text-[18px] font-semibold text-gray-900">Select Size</p>
            <div className="flex gap-[10px] flex-wrap">
              {productData.sizes.map((item, index) => (
                <button
                  key={index}
                  onClick={() => setSize(item)}
                  className={`px-[18px] py-[8px] border text-[14px] font-semibold rounded-md transition-all duration-300 ${
                    item === size ? 'bg-black text-white border-black' : 'border-gray-300 hover:border-black'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* Add to Cart */}
          <button
            onClick={() => addtoCart(productData._id, size)}
            className="mt-[20px] bg-black text-white px-[40px] py-[12px] rounded-lg text-[15px] font-semibold tracking-wide hover:bg-gray-900 transition-all duration-300 shadow-md"
          >
            {loading ? <Loading /> : 'ADD TO CART'}
          </button>

          {/* Product Info */}
          <div className="mt-[25px] text-gray-700 text-[14px] space-y-[5px]">
            <p>✅ 100% Original Product</p>
            <p>💵 Cash on Delivery Available</p>
            <p>🔁 Easy Return & Exchange within 7 Days</p>
          </div>
        </motion.div>
      </div>

      {/* DESCRIPTION + REVIEWS */}
      <div className="w-[90%] lg:w-[80%] mt-[80px] flex flex-col gap-[20px] text-gray-800">
        <div className="flex gap-[20px] border-b pb-[10px] text-[16px] font-medium">
          <p className="border-b-2 border-black pb-[6px] cursor-pointer">Description</p>
          <p className="cursor-pointer text-gray-500 hover:text-black">Reviews (124)</p>
        </div>

        <p className="text-[15px] md:text-[16px] leading-relaxed max-w-[800px]">
          Upgrade your wardrobe with this stylish slim-fit cotton shirt. Crafted from breathable, high-quality fabric, 
          it offers all-day comfort and effortless style. Perfect for casual, office, or evening wear.
        </p>
      </div>

      {/* RELATED PRODUCTS */}
      <div className="w-full mt-[80px]">
        <RelatedProduct
          category={productData.category}
          subCategory={productData.subCategory}
          currentProductId={productData._id}
        />
      </div>
    </div>
  ) : (
    <div className="flex items-center justify-center min-h-screen text-gray-600 text-lg">
      Loading product...
    </div>
  );
}

export default ProductDetail;
