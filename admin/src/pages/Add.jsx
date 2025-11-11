import React, { useContext, useState } from 'react';
import Nav from '../component/Nav';
import Sidebar from '../component/Sidebar';
import upload from '../assets/upload image.jpg';
import { authDataContext } from '../context/AuthContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import Loading from '../component/Loading';

function Add() {
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Men");
  const [price, setPrice] = useState("");
  const [subCategory, setSubCategory] = useState("TopWear");
  const [bestseller, setBestSeller] = useState(false);
  const [sizes, setSizes] = useState([]);
  const [loading, setLoading] = useState(false);
  const { serverUrl } = useContext(authDataContext);

  const handleAddProduct = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("bestseller", bestseller);
      formData.append("sizes", JSON.stringify(sizes));
      formData.append("image1", image1);
      formData.append("image2", image2);
      formData.append("image3", image3);
      formData.append("image4", image4);

      const result = await axios.post(serverUrl + "/api/product/addproduct", formData, { withCredentials: true });
      toast.success("Product Added Successfully");

      if (result.data) {
        setName("");
        setDescription("");
        setImage1(false);
        setImage2(false);
        setImage3(false);
        setImage4(false);
        setPrice("");
        setBestSeller(false);
        setCategory("Men");
        setSubCategory("TopWear");
        setSizes([]);
      }
    } catch (error) {
      console.log(error);
      toast.error("Add Product Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-screen min-h-screen bg-gradient-to-r from-[#ffffff] via-[#f8f8f8] to-[#ededed] text-gray-900 overflow-x-hidden relative font-sans">
      <Nav />
      <Sidebar />

      {/* Main Form Area */}
      <div className="w-[80%] h-full flex justify-start absolute right-0 py-[100px] px-[30px] md:px-[80px]">
        <form
          onSubmit={handleAddProduct}
          className="w-full max-w-[900px] bg-white/70 shadow-lg rounded-2xl p-[30px] flex flex-col gap-[30px] border border-gray-200"
        >
          <h1 className="text-[32px] md:text-[40px] font-semibold tracking-wide text-gray-800">
            Add New Product
          </h1>

          {/* Upload Section */}
          <div>
            <p className="text-[20px] font-semibold mb-[10px] text-gray-800">
              Upload Product Images
            </p>
            <div className="flex gap-[15px] flex-wrap">
              {[1, 2, 3, 4].map((num, index) => {
                const imageState = [image1, image2, image3, image4][index];
                const setImageFn = [setImage1, setImage2, setImage3, setImage4][index];
                return (
                  <label
                    key={num}
                    htmlFor={`image${num}`}
                    className="w-[80px] h-[80px] md:w-[100px] md:h-[100px] border border-gray-300 rounded-xl flex items-center justify-center cursor-pointer hover:scale-105 transition-all bg-gray-50 shadow-sm"
                  >
                    <img
                      src={!imageState ? upload : URL.createObjectURL(imageState)}
                      alt=""
                      className="w-[100%] h-[100%] object-cover rounded-xl"
                    />
                    <input
                      type="file"
                      id={`image${num}`}
                      hidden
                      onChange={(e) => setImageFn(e.target.files[0])}
                      required
                    />
                  </label>
                );
              })}
            </div>
          </div>

          {/* Product Name */}
          <div>
            <p className="text-[18px] font-semibold mb-2">Product Name</p>
            <input
              type="text"
              placeholder="Enter product name"
              className="w-full h-[45px] rounded-lg border border-gray-300 px-4 bg-gray-50 focus:outline-none focus:border-black"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          {/* Product Description */}
          <div>
            <p className="text-[18px] font-semibold mb-2">Product Description</p>
            <textarea
              placeholder="Enter product description"
              className="w-full h-[100px] rounded-lg border border-gray-300 px-4 py-3 bg-gray-50 focus:outline-none focus:border-black"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          {/* Category and Subcategory */}
          <div className="flex flex-wrap gap-[30px]">
            <div className="flex flex-col gap-2 w-[200px]">
              <p className="text-[18px] font-semibold">Category</p>
              <select
                className="border border-gray-300 rounded-lg px-3 py-2 bg-gray-50 focus:outline-none focus:border-black"
                onChange={(e) => setCategory(e.target.value)}
                value={category}
              >
                <option value="Men">Men</option>
                <option value="Women">Women</option>
                <option value="Kids">Kids</option>
              </select>
            </div>

            <div className="flex flex-col gap-2 w-[200px]">
              <p className="text-[18px] font-semibold">Subcategory</p>
              <select
                className="border border-gray-300 rounded-lg px-3 py-2 bg-gray-50 focus:outline-none focus:border-black"
                onChange={(e) => setSubCategory(e.target.value)}
                value={subCategory}
              >
                <option value="TopWear">TopWear</option>
                <option value="BottomWear">BottomWear</option>
                <option value="WinterWear">WinterWear</option>
              </select>
            </div>
          </div>

          {/* Price */}
          <div>
            <p className="text-[18px] font-semibold mb-2">Product Price</p>
            <input
              type="number"
              placeholder="₹ 2000"
              className="w-full h-[45px] rounded-lg border border-gray-300 px-4 bg-gray-50 focus:outline-none focus:border-black"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>

          {/* Sizes */}
          <div>
            <p className="text-[18px] font-semibold mb-2">Available Sizes</p>
            <div className="flex gap-[10px] flex-wrap">
              {["S", "M", "L", "XL", "XXL"].map((s) => (
                <div
                  key={s}
                  className={`px-[20px] py-[8px] rounded-lg border cursor-pointer transition-all 
                    ${sizes.includes(s)
                      ? "bg-black text-white border-black"
                      : "bg-gray-100 border-gray-300 text-gray-700 hover:bg-gray-200"
                    }`}
                  onClick={() =>
                    setSizes((prev) =>
                      prev.includes(s)
                        ? prev.filter((size) => size !== s)
                        : [...prev, s]
                    )
                  }
                >
                  {s}
                </div>
              ))}
            </div>
          </div>

          {/* Bestseller */}
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="bestseller"
              className="w-5 h-5 cursor-pointer"
              checked={bestseller}
              onChange={() => setBestSeller((prev) => !prev)}
            />
            <label htmlFor="bestseller" className="text-[16px] font-semibold text-gray-800">
              Mark as Bestseller
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-[160px] py-[12px] rounded-lg bg-black text-white text-[16px] hover:opacity-90 active:scale-95 transition-all duration-200 flex items-center justify-center"
          >
            {loading ? <Loading /> : "Add Product"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Add;
