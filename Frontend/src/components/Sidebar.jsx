import React, { useEffect, useState } from "react";

const Sidebar = ({
  products,
  priceRange,
  setPriceRange,
  selectedBrands,
  setSelectedBrands,
  selectedRam,
  setSelectedRam,
  selectedStorage,
  setSelectedStorage,
  isSidebarOpen,
  setIsSidebarOpen
}) => {

  // Backend data safe guard
  const safeProducts = Array.isArray(products) ? products : [];

  // Dynamic filters from MongoDB data
  const brands = [...new Set(safeProducts.map(p => p.brand))].sort();
  const ramOptions = [...new Set(safeProducts.map(p => p.ram))].sort((a, b) => a - b);
  const storageOptions = [...new Set(safeProducts.map(p => p.storage))].sort((a, b) => a - b);

  // Dynamic price range
  const minPrice = safeProducts.length ? Math.min(...safeProducts.map(p => p.price)) : 0;

  const maxPrice = safeProducts.length ? Math.max(...safeProducts.map(p => p.price)) : 0;

  // Initial price range set after API load
  useEffect(() => {
    if (minPrice && maxPrice) {
      setPriceRange([minPrice, maxPrice]);
    }
  }, [minPrice, maxPrice]);

  return (
     <div className={`fixed top-16 left-0 w-64 bg-purple-300 p-4 h-[calc(100vh-4rem)] overflow-y-auto shadow-xl z-40 transform transition-transform duration-300 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>

      {/*  HEADER */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-purple-800">Filter</h2>
        <button className="text-xl" onClick={() => setIsSidebarOpen(false)}> ✕ </button>
      </div>

      {/* BRAND FILTER */}
      <div className="mb-6">
        <h3 className="text-purple-800 font-medium mb-3">Brands</h3>
        {brands.map((brand) => (
          <label key={brand} className="flex items-center mb-2 cursor-pointer">
            <input type="checkbox" className="mr-2 accent-purple-500"
              checked={selectedBrands.includes(brand)}
              onChange={() => setSelectedBrands( selectedBrands.includes(brand) ? selectedBrands.filter(b => b !== brand) : [...selectedBrands, brand])
              }/> {brand} </label>
        ))}
      </div>

      {/* PRICE FILTER */}
      <div className="mb-6">
        <h3 className="text-purple-800 font-medium mb-3">Price Range</h3>
        <input type="range" min={minPrice} max={maxPrice} value={priceRange[1] || maxPrice}
          onChange={(e) => setPriceRange([minPrice, Number(e.target.value)])}
          className="w-full accent-purple-600"/>
        <div className="flex justify-between text-sm mt-2">
          <span>₹ {priceRange[0]}</span>
          <span>₹ {priceRange[1]}</span>
        </div>
      </div>

      {/* RAM FILTER */}
      <div className="mb-6">
        <h3 className="text-purple-800 font-medium mb-3">RAM</h3>
        <select value={selectedRam ?? ""}
          onChange={(e) => setSelectedRam(e.target.value ? Number(e.target.value) : null)}
          className="w-full border border-gray-400 rounded p-2">
          <option value="">All</option>
          {ramOptions.map(ram => (
            <option key={ram} value={ram}> {ram} GB </option>
          ))}
        </select>
      </div>

      {/*  STORAGE FILTER */}
      <div className="mb-6">
        <h3 className="text-purple-800 font-medium mb-3">Storage</h3>
        <select value={selectedStorage ?? ""} onChange={(e) => setSelectedStorage( e.target.value ? Number(e.target.value) : null )}
          className="w-full border border-gray-400 rounded p-2" >
          <option value="">All</option>
          {storageOptions.map(storage => (
            <option key={storage} value={storage}>{storage} GB</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Sidebar;