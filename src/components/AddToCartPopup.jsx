import { useEffect } from "react";
import { X, ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function AddToCartPopup({ item, isOpen, onClose }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isOpen) return;

    const timer = setTimeout(() => {
      onClose();
    }, 3500); // auto close after 3.5s

    return () => clearTimeout(timer);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-slide-up">
      <div className="bg-white border border-gray-200 shadow-xl rounded-xl p-4 w-80">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-2 text-green-600 font-semibold">
            <ShoppingCart className="w-5 h-5" />
            <span>Added to Cart</span>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-700">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="flex items-center gap-3 mt-3">
          <img
            src={item?.image}
            alt={item?.name}
            className="w-14 h-14 object-cover rounded-lg border"
          />
          <div>
            <p className="text-sm font-medium line-clamp-2">
              {item?.name}
            </p>
          </div>
        </div>

        <div className="flex gap-2 mt-4">
          <button
            onClick={() => {
              onClose();
              navigate("/cart");
            }}
            className="flex-1 bg-slate-900 text-white py-2 rounded-lg text-sm"
          >
            View Cart
          </button>

          <button
            onClick={onClose}
            className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-lg text-sm"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
}
