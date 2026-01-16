








import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CreditCard, Lock, ShoppingBag, MapPin, Smartphone } from "lucide-react";
import api from "../Api/Axios_Instance.jsx";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

export default function Checkout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const { cart, clearCart, removeFromCart } = useCart();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("card");

  const [animate, setAnimate] = useState(false);
  useEffect(() => setAnimate(true), []);

  // Handle both old format (direct array) and new format (object with source)
  const checkoutData = location.state;
  let products, source;
  
  if (checkoutData && typeof checkoutData === 'object' && checkoutData.products) {
    products = checkoutData.products;
    source = checkoutData.source;
  } else if (checkoutData && Array.isArray(checkoutData)) {
    products = checkoutData;
    source = JSON.stringify(checkoutData) === JSON.stringify(cart) ? "cart" : "buyNow";
  } else {
    products = cart;
    source = "cart";
  }

  const total = products.reduce((sum, item) => {
    const price = Number(item.price) || 0;
    const qty = Number(item.quantity) || 1;
    return sum + price * qty;
  }, 0);

  // Function to update stock after successful order
  // const updateProductStock = async (products) => {
  //   try {
  //     for (const product of products) {
  //       const newStock = product.stock - product.quantity;
  //       await api.patch(`/products/${product.id}`, {
  //         stock: newStock
  //       });
  //       console.log(`✅ Stock updated: ${product.name} (${product.stock} → ${newStock})`);
  //     }
  //     return true;
  //   } catch (error) {
  //     console.error("❌ Stock update failed:", error);
  //     return false;
  //   }
  // };
const handlePayment = async (e) => {
  e.preventDefault();
  if (!user) return alert("Login first");

  try {
    // 1️⃣ CREATE ORDER
    const orderRes = source === "cart"
      ? await api.post("/order/add", { shippingAddress: address })
      :await api.post("/order/direct", {
  shippingAddress: address,
  items: products.map(p => ({
    productId: p.id,
    quantity: p.quantity || 1
  }))
});


    const orderId = orderRes.data.data.orderId;

    // 2️⃣ CREATE RAZORPAY ORDER
    const rp = await api.post(`/payment/create/${orderId}`);

    const options = {
      key: rp.data.key,
      amount: rp.data.amount * 100,
      currency: "INR",
      order_id: rp.data.razorpayOrderId,
      name: "Sportex",
      handler: async (response) => {

        // 3️⃣ VERIFY
        await api.post("/payment/verify", {
          RazorpayOrderId: response.razorpay_order_id,
          RazorpayPaymentId: response.razorpay_payment_id,
          RazorpaySignature: response.razorpay_signature,
          OrderId: orderId
        });

        clearCart();
        navigate(`/payment-success/${orderId}`);
      }
    };

    new window.Razorpay(options).open();

  } catch (err) {
    alert("Payment failed");
    console.error(err);
  }
};


  if (!products.length) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100 flex items-center justify-center p-4">
        <div className="text-center bg-white shadow-sm border border-slate-200 rounded-2xl p-12 max-w-md">
          <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingBag className="w-12 h-12 text-slate-400" />
          </div>
          <h2 className="text-3xl font-serif font-light text-slate-900 mb-4">Your Cart is Empty</h2>
          <div className="h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent max-w-xs mx-auto mb-4"></div>
          <p className="text-slate-600 text-base">Go back and choose some amazing products to continue.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100">
      <div className="flex flex-col items-center py-16 px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-serif font-light text-slate-900 mb-4 tracking-tight">
            Secure Checkout
          </h1>
          <div className="h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent max-w-md mx-auto mb-6"></div>
          <div className="flex items-center justify-center gap-3 text-slate-600">
            <Lock className="w-5 h-5" />
            <span className="text-base font-medium">SSL Encrypted & Secure</span>
          </div>
        </div>

        <div
          className={`bg-white border border-slate-200 rounded-2xl shadow-sm w-full max-w-7xl flex flex-col xl:flex-row gap-8 p-8 md:p-12 transform transition-all duration-1000 ${
            animate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {/* Order Summary */}
          <div className="xl:w-2/5 space-y-6">
            <div className="mb-8">
              <h2 className="text-3xl font-serif font-light text-slate-900 mb-3">Order Summary</h2>
              <div className="h-px bg-gradient-to-r from-slate-300 to-transparent"></div>
            </div>
            
            <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
              {products.map((item) => {
                const price = Number(item.price) || 0;
                const qty = Number(item.quantity) || 1;
                return (
                  <div
                    key={item.id}
                    className="bg-slate-50 border border-slate-200 rounded-xl p-5 hover:border-slate-300 transition-all duration-300"
                  >
                    <div className="flex items-center gap-4">
                      <div className="bg-white rounded-lg p-2 border border-slate-200">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-20 h-20 object-contain"
                        />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-slate-900 text-base mb-2">{item.name}</p>
                        <div className="flex items-center gap-4">
                          <span className="text-slate-600 text-sm">
                            Qty: {qty}
                          </span>
                          <span className="text-xl font-semibold text-slate-900">
                            ${(price * qty).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            
            <div className="border-t border-slate-200 pt-6">
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-6">
                <div className="flex justify-between items-center">
                  <span className="text-slate-700 text-lg font-medium">Total Amount:</span>
                  <span className="text-3xl font-semibold text-slate-900">
                    ${total.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Payment and Shipping Form */}
          <div className="xl:w-3/5">
            <form className="space-y-8" onSubmit={handlePayment}>
              {/* Shipping Address Section */}
              <div className="space-y-6">
                <div className="mb-6">
                  <h3 className="text-2xl font-serif font-light text-slate-900 mb-3">Shipping Details</h3>
                  <div className="h-px bg-gradient-to-r from-slate-300 to-transparent"></div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Street Address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="col-span-full p-4 rounded-lg bg-white border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all duration-300"
                    required
                  />
                  <input
                    type="text"
                    placeholder="City"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="p-4 rounded-lg bg-white border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all duration-300"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Postal Code"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    className="p-4 rounded-lg bg-white border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all duration-300"
                    required
                  />
                </div>
              </div>

              {/* Payment Method Selection */}
              <div className="space-y-6">
                <div className="mb-6">
                  <h3 className="text-2xl font-serif font-light text-slate-900 mb-3">Payment Method</h3>
                  <div className="h-px bg-gradient-to-r from-slate-300 to-transparent"></div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <label className={`cursor-pointer p-5 rounded-xl border transition-all duration-300 ${
                    paymentMethod === "card" 
                      ? "bg-slate-900 border-slate-900 text-white" 
                      : "bg-white border-slate-200 hover:border-slate-300 text-slate-900"
                  }`}>
                    <input
                      type="radio"
                      name="payment"
                      value="card"
                      checked={paymentMethod === "card"}
                      onChange={() => setPaymentMethod("card")}
                      className="sr-only"
                    />
                    <div className="text-center">
                      <CreditCard className={`w-7 h-7 mx-auto mb-2 ${paymentMethod === "card" ? "text-white" : "text-slate-600"}`} />
                      <span className="font-medium text-sm">Card Payment</span>
                    </div>
                  </label>
                  
                  <label className={`cursor-pointer p-5 rounded-xl border transition-all duration-300 ${
                    paymentMethod === "upi" 
                      ? "bg-slate-900 border-slate-900 text-white" 
                      : "bg-white border-slate-200 hover:border-slate-300 text-slate-900"
                  }`}>
                    <input
                      type="radio"
                      name="payment"
                      value="upi"
                      checked={paymentMethod === "upi"}
                      onChange={() => setPaymentMethod("upi")}
                      className="sr-only"
                    />
                    <div className="text-center">
                      <Smartphone className={`w-7 h-7 mx-auto mb-2 ${paymentMethod === "upi" ? "text-white" : "text-slate-600"}`} />
                      <span className="font-medium text-sm">UPI Payment</span>
                    </div>
                  </label>
                  
                  <label className={`cursor-pointer p-5 rounded-xl border transition-all duration-300 ${
                    paymentMethod === "cod" 
                      ? "bg-slate-900 border-slate-900 text-white" 
                      : "bg-white border-slate-200 hover:border-slate-300 text-slate-900"
                  }`}>
                    <input
                      type="radio"
                      name="payment"
                      value="cod"
                      checked={paymentMethod === "cod"}
                      onChange={() => setPaymentMethod("cod")}
                      className="sr-only"
                    />
                    <div className="text-center">
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center mx-auto mb-2 border ${
                        paymentMethod === "cod" ? "bg-white/20 border-white/30" : "bg-slate-100 border-slate-200"
                      }`}>
                        <span className={`font-bold text-xs ${paymentMethod === "cod" ? "text-white" : "text-slate-700"}`}>COD</span>
                      </div>
                      <span className="font-medium text-sm">Cash on Delivery</span>
                    </div>
                  </label>
                </div>
              </div>

              {/* Conditional Payment Inputs */}
              {paymentMethod === "card" && (
                <div className="space-y-4 bg-slate-50 border border-slate-200 rounded-xl p-6">
                  <h4 className="text-base font-medium text-slate-900 mb-4">Card Information</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Full Name on Card"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="col-span-full p-4 rounded-lg bg-white border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all duration-300"
                      required
                    />
                    <input
                      type="email"
                      placeholder="Email Address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="col-span-full p-4 rounded-lg bg-white border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all duration-300"
                      required
                    />
                    <input
                      type="text"
                      placeholder="Card Number"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="col-span-full p-4 rounded-lg bg-white border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all duration-300"
                      required
                    />
                    <input
                      type="text"
                      placeholder="MM/YY"
                      value={expiry}
                      onChange={(e) => setExpiry(e.target.value)}
                      className="p-4 rounded-lg bg-white border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all duration-300"
                      required
                    />
                    <input
                      type="text"
                      placeholder="CVV"
                      value={cvv}
                      onChange={(e) => setCvv(e.target.value)}
                      className="p-4 rounded-lg bg-white border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all duration-300"
                      required
                    />
                  </div>
                </div>
              )}

              {paymentMethod === "upi" && (
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-6">
                  <h4 className="text-base font-medium text-slate-900 mb-4 flex items-center gap-2">
                    <Smartphone className="w-5 h-5 text-slate-600" />
                    UPI Details
                  </h4>
                  <input
                    type="text"
                    placeholder="Enter UPI ID (e.g., yourname@upi)"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-4 rounded-lg bg-white border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all duration-300"
                    required
                  />
                </div>
              )}

              {paymentMethod === "cod" && (
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-6">
                  <h4 className="text-base font-medium text-slate-900 mb-2">Cash on Delivery</h4>
                  <p className="text-slate-600 text-sm">You will pay ${total.toFixed(2)} when your order is delivered to your address.</p>
                </div>
              )}

              {errorMessage && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                  <div className="text-red-600 text-center font-medium text-sm">
                    {errorMessage}
                  </div>
                </div>
              )}

              <button
                type="submit"
                className={`w-full py-4 rounded-lg font-medium text-base transform transition-all duration-300 flex items-center justify-center gap-3 ${
                  isProcessing
                    ? "bg-slate-300 cursor-not-allowed text-slate-500"
                    : "bg-slate-900 text-white hover:bg-slate-800 shadow-sm"
                }`}
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-slate-400 border-t-slate-600"></div>
                    Processing Payment...
                  </>
                ) : (
                  <>
                    <Lock className="w-5 h-5" />
                    Pay ${total.toFixed(2)} Securely
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Security Footer */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center gap-2 bg-white border border-slate-200 rounded-full px-6 py-3 shadow-sm">
            <Lock className="w-4 h-4 text-slate-600" />
            <span className="text-slate-600 text-sm font-medium">256-bit SSL Encryption</span>
          </div>
        </div>
      </div>
    </div>
  );
}