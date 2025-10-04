

// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import api from "../Api/Axios_Instance";
// import { Heart, Star } from "lucide-react";
// import { useWishlist } from "../context/WishlistContext";
// import { useAuth } from "../context/AuthContext";
// import { useCart } from "../context/CartContext";

// export default function Products({ searchTerm = "" }) {
//   const navigate = useNavigate();
//   const { user } = useAuth();
//   const { wishlist, toggleWishlist } = useWishlist();
//   const { addToCart } = useCart();

//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [showDetails, setShowDetails] = useState(false);
//   const [products, setProducts] = useState([]);
//   const [filteredProducts, setFilteredProducts] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [activeCategory, setActiveCategory] = useState("All");
//   const [priceRange, setPriceRange] = useState([0, 2000]);
//   const [minRating, setMinRating] = useState(0);

//   // Fetch products
//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const { data } = await api.get("/products");

//         // Add random rating, reviews, badge
//         const apiProducts = data.map((p) => ({
//           ...p,
//           rating: Math.floor(Math.random() * 5) + 1,
//           reviews: Math.floor(Math.random() * 200) + 1,
//           badge: Math.random() > 0.7 ? "New" : "",
//         }));

//         // Extra dummy products
//         const extraProducts = Array.from({ length: 30 }, (_, i) => ({
//           id: (data.length + i + 1).toString(),
//           name: `Extra Product ${i + 1}`,
//           price: Math.floor(Math.random() * 500) + 10,
//           image: `https://via.placeholder.com/320x320.png?text=Product+${i + 1}`,
//           category: [
//             "Balls",
//             "Jerseys",
//             "Shoes",
//             "Gloves",
//             "Accessories",
//             "Training Gear",
//           ][Math.floor(Math.random() * 6)],
//           rating: Math.floor(Math.random() * 5) + 1,
//           reviews: Math.floor(Math.random() * 200) + 1,
//           badge: Math.random() > 0.7 ? "New" : "",
//         }));

//         const allProducts = [...apiProducts, ...extraProducts];
//         setProducts(allProducts);
//         setFilteredProducts(allProducts);

//         setCategories(["All", ...new Set(allProducts.map((p) => p.category))]);
//       } catch (err) {
//         console.error(err);
//       }
//     };
//     fetchProducts();
//   }, []);

//   // Apply filters
//   useEffect(() => {
//     let temp = [...products];
//     if (activeCategory !== "All")
//       temp = temp.filter((p) => p.category === activeCategory);
//     if (searchTerm)
//       temp = temp.filter((p) =>
//         p.name.toLowerCase().includes(searchTerm.toLowerCase())
//       );
//     temp = temp.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1]);
//     temp = temp.filter((p) => p.rating >= minRating);
//     setFilteredProducts(temp);
//   }, [activeCategory, searchTerm, priceRange, minRating, products]);

//   const handleProductClick = (product) => {
//     if (!user) return navigate("/login");
//     setSelectedProduct({ ...product, quantity: 1 });
//     setShowDetails(true);
//   };

//   const handleAddToCartClick = (product, quantity = 1) => {
//     if (!user) return navigate("/login");
//     addToCart(product, quantity);
//     setShowDetails(false);
//   };

//   // ✅ Fixed Buy Now → always pass as array for Checkout
//   const handleBuyNow = (product) => {
//     if (!user) return navigate("/login");

//     const itemWithQty = { ...product, quantity: product.quantity || 1 };

//     // Optional: also add to cart so it’s stored
//     addToCart(itemWithQty, itemWithQty.quantity);

//     // Pass as array for Checkout compatibility
//     navigate("/checkout", { state: [itemWithQty] });
//   };

//   const handleIncrease = () =>
//     setSelectedProduct((prev) => ({ ...prev, quantity: prev.quantity + 1 }));
//   const handleDecrease = () =>
//     setSelectedProduct((prev) => ({
//       ...prev,
//       quantity: Math.max(prev.quantity - 1, 1),
//     }));
//   const isInWishlist = (id) => wishlist.some((p) => p.id === id);

//   return (
//     <div className="max-w-7xl mx-auto px-4 md:px-6 py-12">
//       <h1 className="text-4xl font-extrabold mb-8 text-center bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-600 bg-clip-text text-transparent drop-shadow-lg tracking-wide">
//         Store Accessories
//       </h1>

//       <div className="flex flex-col md:flex-row gap-8">
//         {/* Filters Sidebar */}
//         <aside className="w-full md:w-1/4 sticky top-24 bg-white shadow-lg rounded-2xl p-6 border border-gray-200 h-fit">
//           {/* Categories */}
//           <div className="mb-8">
//             <h3 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">
//               Categories
//             </h3>
//             <div className="flex flex-col gap-2">
//               {categories.map((cat) => (
//                 <button
//                   key={cat}
//                   onClick={() => setActiveCategory(cat)}
//                   className={`text-left px-3 py-2 rounded-lg font-medium transition ${
//                     activeCategory === cat
//                       ? "bg-blue-600 text-white shadow-md"
//                       : "hover:bg-blue-100 text-gray-700"
//                   }`}
//                 >
//                   {cat}
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* Price */}
//           <div className="mb-8">
//             <h3 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">
//               Price Range
//             </h3>
//             <div className="flex flex-col gap-2">
//               {[0, 50, 150, 300, 500, 1000, 2000].map((min, i, arr) => {
//                 if (i === arr.length - 1) return null;
//                 const max = arr[i + 1];
//                 return (
//                   <button
//                     key={min}
//                     onClick={() => setPriceRange([min, max])}
//                     className={`text-left px-3 py-2 rounded-lg font-medium transition ${
//                       priceRange[0] === min && priceRange[1] === max
//                         ? "bg-blue-600 text-white shadow-md"
//                         : "hover:bg-blue-100 text-gray-700"
//                     }`}
//                   >
//                     ${min} - ${max}
//                   </button>
//                 );
//               })}
//             </div>
//           </div>

//           {/* Rating */}
//           <div>
//             <h3 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">
//               Minimum Rating
//             </h3>
//             <div className="flex flex-col gap-2">
//               {[5, 4, 3, 2, 1].map((star) => (
//                 <button
//                   key={star}
//                   onClick={() => setMinRating(star)}
//                   className={`flex items-center gap-2 px-3 py-2 rounded-lg font-medium transition ${
//                     minRating === star
//                       ? "bg-yellow-400 text-white shadow-md"
//                       : "hover:bg-yellow-50 text-gray-700"
//                   }`}
//                 >
//                   {Array.from({ length: star }, (_, i) => (
//                     <Star key={i} size={16} className="text-yellow-400" />
//                   ))}
//                   <span className="text-gray-700">& Up</span>
//                 </button>
//               ))}
//             </div>
//           </div>
//         </aside>

//         {/* Products Grid */}
//         <main className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
//           {filteredProducts.length ? (
//             filteredProducts.map((product) => (
//               <div
//                 key={product.id}
//                 className="group relative bg-white rounded-2xl border border-gray-200 shadow-md hover:shadow-2xl transform transition hover:-translate-y-1 cursor-pointer flex flex-col"
//               >
//                 {product.badge && (
//                   <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full z-10">
//                     {product.badge}
//                   </span>
//                 )}
//                 <button
//                   className="absolute top-3 right-3 p-2 rounded-full bg-white shadow hover:bg-gray-200 z-10"
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     if (!user) return navigate("/login");
//                     toggleWishlist(product);
//                   }}
//                 >
//                   <Heart
//                     size={24}
//                     className={`${
//                       isInWishlist(product.id)
//                         ? "text-red-600"
//                         : "text-gray-400"
//                     } transition-colors`}
//                   />
//                 </button>

//                 <div
//                   onClick={() => handleProductClick(product)}
//                   className="relative p-4 bg-gray-100 rounded-t-2xl flex justify-center items-center"
//                 >
//                   <img
//                     src={product.image}
//                     alt={product.name}
//                     className="h-52 object-contain transition-transform duration-300 group-hover:scale-105"
//                   />
//                 </div>

//                 <div className="px-5 py-4 flex flex-col flex-1">
//                   <h2 className="text-lg font-semibold text-gray-900 mb-1">
//                     {product.name}
//                   </h2>
//                   <p className="text-gray-700 font-bold text-lg mb-2">
//                     ${Number(product.price).toFixed(2)}
//                   </p>
//                   <div className="flex items-center mb-3">
//                     {Array.from({ length: 5 }, (_, i) => (
//                       <Star
//                         key={i}
//                         size={16}
//                         className={
//                           i < product.rating ? "text-yellow-400" : "text-gray-300"
//                         }
//                       />
//                     ))}
//                     <span className="text-gray-600 text-sm ml-2">
//                       ({product.reviews})
//                     </span>
//                   </div>

//                   <button
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       handleProductClick(product);
//                     }}
//                     className="mt-auto bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition shadow-md"
//                   >
//                     Quick View
//                   </button>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <p className="text-center col-span-full text-gray-500">
//               No products found.
//             </p>
//           )}
//         </main>
//       </div>

//       {/* Product Modal */}
//       {showDetails && selectedProduct && (
//         <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-4">
//           <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl p-6 relative">
//             <button
//               className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 font-bold text-xl"
//               onClick={() => setShowDetails(false)}
//             >
//               ✕
//             </button>

//             <img
//               src={selectedProduct.image}
//               alt={selectedProduct.name}
//               className="w-full h-64 object-contain rounded-lg mb-5 bg-gray-100 p-2"
//             />
//             <h2 className="text-2xl font-bold text-gray-900 mb-2">
//               {selectedProduct.name}
//             </h2>
//             <p className="text-lg font-semibold text-gray-800 mb-4">
//               ${Number(selectedProduct.price).toFixed(2)} ×{" "}
//               {selectedProduct.quantity} ={" "}
//               <span className="text-green-600 font-bold">
//                 ${(Number(selectedProduct.price) * selectedProduct.quantity).toFixed(
//                   2
//                 )}
//               </span>
//             </p>

//             <div className="flex items-center gap-4 mb-6">
//               <span className="font-medium text-gray-700">Quantity:</span>
//               <button
//                 onClick={handleDecrease}
//                 className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 font-semibold"
//               >
//                 -
//               </button>
//               <span className="font-semibold text-lg">
//                 {selectedProduct.quantity}
//               </span>
//               <button
//                 onClick={handleIncrease}
//                 className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 font-semibold"
//               >
//                 +
//               </button>
//             </div>

//             <div className="flex flex-col gap-4">
//               <button
//                 onClick={() =>
//                   handleAddToCartClick(
//                     selectedProduct,
//                     selectedProduct.quantity
//                   )
//                 }
//                 className="w-full bg-blue-600 text-white py-3 rounded-2xl font-semibold text-lg hover:bg-blue-700 transition shadow-lg"
//               >
//                 Add to Cart
//               </button>
//               <button
//                 onClick={() => handleBuyNow(selectedProduct)}
//                 className="w-full bg-gray-800 text-white py-3 rounded-2xl font-semibold text-lg hover:bg-gray-700 transition shadow-md"
//               >
//                 Buy Now
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }















import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../Api/Axios_Instance";
import { Heart, Star, Package } from "lucide-react";
import { useWishlist } from "../context/WishlistContext";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

export default function Products({ searchTerm = "" }) {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { wishlist, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [priceRange, setPriceRange] = useState([0, 2000]);
  const [minRating, setMinRating] = useState(0);

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await api.get("/products");

        // Handle different response structures
        const productsData = data.data || data;
        
        // Process API products with stock information
        const apiProducts = productsData.map((p) => ({
          ...p,
          // Use existing stock from database or set default
          stock: p.stock !== undefined ? p.stock : Math.floor(Math.random() * 50) + 1,
          rating: p.rating || Math.floor(Math.random() * 5) + 1,
          reviews: p.reviews || Math.floor(Math.random() * 200) + 1,
          badge: p.badge || (Math.random() > 0.7 ? "New" : ""),
        }));

        // Extra dummy products
        const extraProducts = Array.from({ length: 30 }, (_, i) => ({
          id: (productsData.length + i + 1).toString(),
          name: `Extra Product ${i + 1}`,
          price: Math.floor(Math.random() * 500) + 10,
          stock: Math.floor(Math.random() * 50) + 1,
          image: `https://via.placeholder.com/320x320.png?text=Product+${i + 1}`,
          category: [
            "Balls",
            "Jerseys",
            "Shoes",
            "Gloves",
            "Accessories",
            "Training Gear",
          ][Math.floor(Math.random() * 6)],
          rating: Math.floor(Math.random() * 5) + 1,
          reviews: Math.floor(Math.random() * 200) + 1,
          badge: Math.random() > 0.7 ? "New" : "",
        }));

        const allProducts = [...apiProducts, ...extraProducts];
        setProducts(allProducts);
        setFilteredProducts(allProducts);

        setCategories(["All", ...new Set(allProducts.map((p) => p.category))]);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProducts();
  }, []);

  // Apply filters
  useEffect(() => {
    let temp = [...products];
    if (activeCategory !== "All")
      temp = temp.filter((p) => p.category === activeCategory);
    if (searchTerm)
      temp = temp.filter((p) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    temp = temp.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1]);
    temp = temp.filter((p) => p.rating >= minRating);
    setFilteredProducts(temp);
  }, [activeCategory, searchTerm, priceRange, minRating, products]);

  const handleProductClick = (product) => {
    if (!user) return navigate("/login");
    setSelectedProduct({ ...product, quantity: 1 });
    setShowDetails(true);
  };

  const handleAddToCartClick = (product, quantity = 1) => {
    if (!user) return navigate("/login");
    
    // Check stock availability
    if (product.stock <= 0) {
      alert("Product is out of stock!");
      return;
    }
    
    if (quantity > product.stock) {
      alert(`Only ${product.stock} items available in stock!`);
      return;
    }
    
    addToCart(product, quantity);
    setShowDetails(false);
  };

  // ✅ Fixed Buy Now → always pass as array for Checkout
  const handleBuyNow = (product) => {
    if (!user) return navigate("/login");

    // Check stock availability
    if (product.stock <= 0) {
      alert("Product is out of stock!");
      return;
    }
    
    const quantity = product.quantity || 1;
    if (quantity > product.stock) {
      alert(`Only ${product.stock} items available in stock!`);
      return;
    }

    const itemWithQty = { ...product, quantity };

    // Optional: also add to cart so it's stored
    addToCart(itemWithQty, itemWithQty.quantity);

    // Pass as array for Checkout compatibility
    navigate("/checkout", { state: [itemWithQty] });
  };

  const handleIncrease = () =>
    setSelectedProduct((prev) => ({ ...prev, quantity: prev.quantity + 1 }));
  const handleDecrease = () =>
    setSelectedProduct((prev) => ({
      ...prev,
      quantity: Math.max(prev.quantity - 1, 1),
    }));
  const isInWishlist = (id) => wishlist.some((p) => p.id === id);

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-12">
      <h1 className="text-4xl font-extrabold mb-8 text-center bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-600 bg-clip-text text-transparent drop-shadow-lg tracking-wide">
        Store Accessories
      </h1>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Filters Sidebar */}
        <aside className="w-full md:w-1/4 sticky top-24 bg-white shadow-lg rounded-2xl p-6 border border-gray-200 h-fit">
          {/* Categories */}
          <div className="mb-8">
            <h3 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">
              Categories
            </h3>
            <div className="flex flex-col gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`text-left px-3 py-2 rounded-lg font-medium transition ${
                    activeCategory === cat
                      ? "bg-blue-600 text-white shadow-md"
                      : "hover:bg-blue-100 text-gray-700"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Price */}
          <div className="mb-8">
            <h3 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">
              Price Range
            </h3>
            <div className="flex flex-col gap-2">
              {[0, 50, 150, 300, 500, 1000, 2000].map((min, i, arr) => {
                if (i === arr.length - 1) return null;
                const max = arr[i + 1];
                return (
                  <button
                    key={min}
                    onClick={() => setPriceRange([min, max])}
                    className={`text-left px-3 py-2 rounded-lg font-medium transition ${
                      priceRange[0] === min && priceRange[1] === max
                        ? "bg-blue-600 text-white shadow-md"
                        : "hover:bg-blue-100 text-gray-700"
                    }`}
                  >
                    ${min} - ${max}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Rating */}
          <div>
            <h3 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">
              Minimum Rating
            </h3>
            <div className="flex flex-col gap-2">
              {[5, 4, 3, 2, 1].map((star) => (
                <button
                  key={star}
                  onClick={() => setMinRating(star)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg font-medium transition ${
                    minRating === star
                      ? "bg-yellow-400 text-white shadow-md"
                      : "hover:bg-yellow-50 text-gray-700"
                  }`}
                >
                  {Array.from({ length: star }, (_, i) => (
                    <Star key={i} size={16} className="text-yellow-400" />
                  ))}
                  <span className="text-gray-700">& Up</span>
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Products Grid */}
        <main className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.length ? (
            filteredProducts.map((product) => (
              <div
                key={product.id}
                className="group relative bg-white rounded-2xl border border-gray-200 shadow-md hover:shadow-2xl transform transition hover:-translate-y-1 cursor-pointer flex flex-col"
              >
                {product.badge && (
                  <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full z-10">
                    {product.badge}
                  </span>
                )}
                <button
                  className="absolute top-3 right-3 p-2 rounded-full bg-white shadow hover:bg-gray-200 z-10"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (!user) return navigate("/login");
                    toggleWishlist(product);
                  }}
                >
                  <Heart
                    size={24}
                    className={`${
                      isInWishlist(product.id)
                        ? "text-red-600"
                        : "text-gray-400"
                    } transition-colors`}
                  />
                </button>

                <div
                  onClick={() => handleProductClick(product)}
                  className="relative p-4 bg-gray-100 rounded-t-2xl flex justify-center items-center"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-52 object-contain transition-transform duration-300 group-hover:scale-105"
                  />
                </div>

                <div className="px-5 py-4 flex flex-col flex-1">
                  <h2 className="text-lg font-semibold text-gray-900 mb-1">
                    {product.name}
                  </h2>
                  <p className="text-gray-700 font-bold text-lg mb-2">
                    ${Number(product.price).toFixed(2)}
                  </p>
                  
                  {/* Stock Information - More Prominent */}
                  <div className="flex items-center gap-2 mb-3 p-2 bg-gray-50 rounded-lg">
                    <Package size={18} className="text-gray-600" />
                    <span className={`text-base font-semibold ${
                      product.stock > 10 
                        ? 'text-green-700' 
                        : product.stock > 0 
                        ? 'text-orange-600' 
                        : 'text-red-600'
                    }`}>
                      Stock: {product.stock > 0 
                        ? `${product.stock} available` 
                        : 'Out of stock'
                      }
                    </span>
                  </div>
                  
                  <div className="flex items-center mb-3">
                    {Array.from({ length: 5 }, (_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className={
                          i < product.rating ? "text-yellow-400" : "text-gray-300"
                        }
                      />
                    ))}
                    <span className="text-gray-600 text-sm ml-2">
                      ({product.reviews})
                    </span>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleProductClick(product);
                    }}
                    disabled={product.stock <= 0}
                    className={`mt-auto py-3 rounded-xl font-semibold transition shadow-md ${
                      product.stock > 0 
                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                        : 'bg-gray-400 text-gray-200 cursor-not-allowed'
                    }`}
                  >
                    {product.stock > 0 ? 'Quick View' : 'Out of Stock'}
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center col-span-full text-gray-500">
              No products found.
            </p>
          )}
        </main>
      </div>

      {/* Product Modal */}
      {showDetails && selectedProduct && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl p-6 relative">
            <button
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 font-bold text-xl"
              onClick={() => setShowDetails(false)}
            >
              ✕
            </button>

            <img
              src={selectedProduct.image}
              alt={selectedProduct.name}
              className="w-full h-64 object-contain rounded-lg mb-5 bg-gray-100 p-2"
            />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {selectedProduct.name}
            </h2>
            
            {/* Stock Information in Modal */}
            <div className="flex items-center gap-2 mb-3">
              <Package size={18} className="text-gray-500" />
              <span className={`text-sm font-medium ${
                selectedProduct.stock > 10 
                  ? 'text-green-600' 
                  : selectedProduct.stock > 0 
                  ? 'text-yellow-600' 
                  : 'text-red-600'
              }`}>
                {selectedProduct.stock > 0 
                  ? `${selectedProduct.stock} available` 
                  : 'Out of stock'
                }
              </span>
            </div>
            
            <p className="text-lg font-semibold text-gray-800 mb-4">
              ${Number(selectedProduct.price).toFixed(2)} ×{" "}
              {selectedProduct.quantity} ={" "}
              <span className="text-green-600 font-bold">
                ${(Number(selectedProduct.price) * selectedProduct.quantity).toFixed(
                  2
                )}
              </span>
            </p>

            <div className="flex items-center gap-4 mb-6">
              <span className="font-medium text-gray-700">Quantity:</span>
              <button
                onClick={handleDecrease}
                className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 font-semibold"
              >
                -
              </button>
              <span className="font-semibold text-lg">
                {selectedProduct.quantity}
              </span>
              <button
                onClick={handleIncrease}
                disabled={selectedProduct.quantity >= selectedProduct.stock}
                className={`px-3 py-1 rounded font-semibold ${
                  selectedProduct.quantity >= selectedProduct.stock
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-gray-200 hover:bg-gray-300'
                }`}
              >
                +
              </button>
            </div>

            <div className="flex flex-col gap-4">
              <button
                onClick={() =>
                  handleAddToCartClick(
                    selectedProduct,
                    selectedProduct.quantity
                  )
                }
                disabled={selectedProduct.stock <= 0}
                className={`w-full py-3 rounded-2xl font-semibold text-lg transition shadow-lg ${
                  selectedProduct.stock > 0
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-gray-400 text-gray-200 cursor-not-allowed'
                }`}
              >
                {selectedProduct.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
              </button>
              <button
                onClick={() => handleBuyNow(selectedProduct)}
                disabled={selectedProduct.stock <= 0}
                className={`w-full py-3 rounded-2xl font-semibold text-lg transition shadow-md ${
                  selectedProduct.stock > 0
                    ? 'bg-gray-800 text-white hover:bg-gray-700'
                    : 'bg-gray-400 text-gray-200 cursor-not-allowed'
                }`}
              >
                {selectedProduct.stock > 0 ? 'Buy Now' : 'Out of Stock'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}





