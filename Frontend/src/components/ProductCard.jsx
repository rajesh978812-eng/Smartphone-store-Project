import React from 'react'

const ProductCard = ({ product,addToCart}) => {
  const {image,name,brand,ram,storage,display,mrp,price,color} = product;
  return (
    <div className='bg-white shadow p-4 hover:shadow-xl transition-all duration-200'>
      <img src={image} alt={name} className='w-full h-48 object-contain mb-4'/>
      <h3 className='text-lg font-semibold mb-2 text-purple-800'>{name}</h3>
      <p className='text-gray-500 mb-1'>{brand.charAt(0).toUpperCase()+brand.slice(1)} | {color}</p>
      <p className='text-gray-500 mb-1'>{ram}GB RAM | {storage}GB Storage</p>
      <p className='text-gray-500 mb-4'>{display} Display</p>
      <div className='flex items-center justify-between'>
        <div>
          <p className='text-xl font-bold text-purple-800'>₹ {price}</p>
          <p className='text-sm text-gray-500 line-through'>₹ {mrp}</p>
        </div>
        <button  onClick={()=>addToCart(product)} className='bg-purple-700 text-white px-4 py-2 rounded hover:bg-purple-800 transition'>Add to cart</button>
      </div>
    </div>
  )
}

export default ProductCard