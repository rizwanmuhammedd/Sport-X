import { useEffect, useState } from "react";
import api from "../Api/Axios_Instance";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function SpecialOfferProducts() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // ✅ CORRECT ENDPOINT BASED ON YOUR BACKEND
        const res = await api.get("/Products/User/GetAll");

        // Backend usually returns: { success, message, data }
        const list = res.data?.data ?? res.data ?? [];

        // Pick "special" products
        const special = list.filter(
          (p) => p.badge === "New" || p.isSpecial === true
        );

        setProducts(special);
      } catch (err) {
        console.error("Failed to load special offers", err);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // ✅ BUY NOW → goes correctly to checkout with single item
  const handleBuyNow = (item, e) => {
    e.stopPropagation();

    if (!user) {
      navigate("/login");
      return;
    }

    navigate("/checkout", {
      state: {
        products: [{ ...item, quantity: 1 }],
        source: "buyNow",
      },
    });
  };

  // ✅ OPEN PRODUCT DETAILS PAGE
  const handleProductClick = (item) => {
    navigate(`/product/${item.id}`, { state: item });
  };

  if (loading) {
    return (
      <section className="py-16 text-center text-gray-500">
        Loading special offers...
      </section>
    );
  }

  return (
    <section
      id="special-offers"
      className="py-16 px-6 md:px-20 bg-gradient-to-r from-blue-50 via-white to-sky-50"
    >
      <h2 className="text-4xl font-extrabold text-center mb-12 text-blue-700">
        Special Offers
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
        {products.length === 0 ? (
          <p className="col-span-full text-center text-gray-500">
            No special offers at the moment.
          </p>
        ) : (
          products.map((item) => (
            <div
              key={item.id}
              onClick={() => handleProductClick(item)}
              className="bg-white border border-gray-200 rounded-2xl shadow-lg p-6 text-center hover:scale-105 transform transition cursor-pointer relative"
            >
              <div className="relative mb-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-48 object-contain rounded-md"
                />

                {item.badge && (
                  <span className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-full text-sm font-bold">
                    {item.badge}
                  </span>
                )}
              </div>

              <h3 className="text-lg font-semibold mb-2 text-gray-800">
                {item.name}
              </h3>

              <p className="text-gray-700 mb-4">
                ${Number(item.price).toFixed(2)}
              </p>

              <button
                onClick={(e) => handleBuyNow(item, e)}
                className="px-4 py-2 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-lg hover:from-pink-500 hover:to-red-500 transition font-semibold shadow-md"
              >
                Buy Now
              </button>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
