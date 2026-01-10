 
import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import ProductCard from "./components/ProductCard";
import CartSideBar from "./components/CartSideBar";
import { fetchProducts } from "./services/api";

const App = () => {
  /*  PRODUCTS FROM MONGODB */
  const [products, setProducts] = useState([]);

  /*  FILTER STATES */
  const [priceRange, setPriceRange] = useState([0, 0]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedRam, setSelectedRam] = useState(null);
  const [selectedStorage, setSelectedStorage] = useState(null);
  const [search, setSearch] = useState("");

  /*  CART STATES */
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  /*  FETCH PRODUCTS FROM BACKEND */
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const res = await fetchProducts();
        setProducts(res.data.products);
      } catch (error) {
        console.error("Failed to load products", error);
      }
    };
    loadProducts();
  }, []);

  /*  CART FUNCTIONS */
  const addToCart = (product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item._id === product._id);
      if (existing) {
        return prev.map((item) => item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item._id !== id));
  };

  const updateQuantity = (id, quantity) => {
    if (quantity <= 0) {
      removeFromCart(id);
    } else {
      setCartItems((prev) => prev.map((item) => item._id === id ? { ...item, quantity } : item ));
    }
  };

  /*  FILTER PRODUCTS */
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase()) || product.brand.toLowerCase().includes(search.toLowerCase()) || product.color.toLowerCase().includes(search.toLowerCase());

    const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(product.brand);

    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];

    const matchesRam = selectedRam === null || product.ram === selectedRam;

    const matchesStorage = selectedStorage === null || product.storage === selectedStorage;

    return (
      matchesSearch && matchesBrand && matchesPrice && matchesRam && matchesStorage
    );
  });

  return (
    <div>
      {/*  NAVBAR */}
      <Navbar
        search={search}
        setSearch={setSearch}
        cartItems={cartItems}
        setIsCartOpen={setIsCartOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />

      <div className="flex">
        {/*  SIDEBAR */}
        <Sidebar
          products={products}
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          selectedBrands={selectedBrands}
          setSelectedBrands={setSelectedBrands}
          selectedRam={selectedRam}
          setSelectedRam={setSelectedRam}
          selectedStorage={selectedStorage}
          setSelectedStorage={setSelectedStorage}
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />

        {/*  PRODUCT LIST 
        <div className="flex-1 bg-purple-100 min-h-screen">*/}
        <div className={`flex-1 bg-purple-100 min-h-screen transition-all duration-300 ${isSidebarOpen ? "ml-64":"ml-0"}`}>
        
          <div className="max-w-7xl mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">
              Products ({filteredProducts.length})
            </h2>

            {filteredProducts.length === 0 ? (
              <p className="text-center text-gray-600">
                No products found matching your criteria.
              </p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product._id}
                    product={product}
                    addToCart={addToCart}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {/*  CART SIDEBAR */}
        <CartSideBar
          cartItems={cartItems}
          isCartOpen={isCartOpen}
          setIsCartOpen={setIsCartOpen}
          updateQuantity={updateQuantity}
          removeFromCart={removeFromCart}
          setCartItems={setCartItems}
        />
      </div>
    </div>
  );
  };

   export default App; 
