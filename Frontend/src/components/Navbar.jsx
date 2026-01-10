const Navbar = ({search,setSearch,cartItems,setIsCartOpen,setIsSidebarOpen}) => {
  const totalItems = cartItems.length;
  return (
    <nav className="h-16 fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-indigo-900 to-purple-900">
    <div className='max-w-7xl mx-auto flex justify-between items-center'>
     <button className="text-white text-2xl mr-5 ml-2" onClick={() => setIsSidebarOpen(prev => !prev)}> ☰ </button>
        <h1 className='text-white text-2xl font-normal'>Smartphone Store</h1>
        <input type="text" value={search} onChange={(e)=> setSearch(e.target.value)} placeholder='🔍 Search for smartphones, brands, colors...' className='p-3 bg-white text-base rounded w-1/2 focus:outline-none m-2'  />
        <button className="relative text-white text-3xl"onClick={()=>setIsCartOpen(prev => !prev)}>🛒
          {totalItems > 0 && <span className="absolute -top-2 right-2 bg-red-500 px-2 py-1 rounded-full text-sm">{totalItems}</span>}
        </button>
    </div>
    </nav>
  )
}

export default Navbar


  