import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white ">
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-4 gap-12">

        {/* Brand / About */}
        <div className="space-y-4">
          <h2 className="text-3xl font-extrabold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500">
            ⚽ Sport-X
          </h2>
          <p className="text-gray-300 text-sm">
            Premium football gear, jerseys & accessories designed for champions.
            Elevate your game with quality, style, and performance.
          </p>
          <p className="text-gray-400 text-xs">
            UAE Headquarters | Dubai, UAE
          </p>
        </div>

        {/* Quick Links */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold mb-4 border-b border-gray-700 pb-2">Quick Links</h3>
          <ul className="space-y-2 text-gray-300">
            <li>
              <a href="/" className="hover:text-yellow-400 transition">Home</a>
            </li>
            <li>
              <a href="/more-products" className="hover:text-yellow-400 transition">Products</a>
            </li>
            <li>
              <a href="/cart" className="hover:text-yellow-400 transition">Cart</a>
            </li>
            <li>
              <a href="/checkout" className="hover:text-yellow-400 transition">Checkout</a>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold mb-4 border-b border-gray-700 pb-2">Contact Us</h3>
          <ul className="space-y-3 text-gray-300">
            <li className="flex items-center gap-3">
              <MapPin size={20} className="text-yellow-400" /> <span>Dubai, UAE, India</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone size={20} className="text-green-400" /> <span>6238741289</span>
            </li>
            <li className="flex items-center gap-3">
              <Mail size={20} className="text-blue-400" /> <span>risvanmd172@gmail.com</span>
            </li>
          </ul>
        </div>

        {/* Socials */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold mb-4 border-b border-gray-700 pb-2">Follow Us</h3>
          <div className="flex gap-4">
            <a href="#" className="flex items-center justify-center w-10 h-10 bg-white/10 rounded-full hover:bg-yellow-400 hover:text-gray-900 transition">
              <Facebook size={18} />
            </a>
            <a href="#" className="flex items-center justify-center w-10 h-10 bg-white/10 rounded-full hover:bg-red-400 hover:text-gray-900 transition">
              <Twitter size={18} />
            </a>
            <a href="https://www.instagram.com/rizwaan.0?igsh=MW9paW1icm9wNmlrNQ==" className="flex items-center justify-center w-10 h-10 bg-white/10 rounded-full hover:bg-pink-400 hover:text-gray-900 transition">
              <Instagram size={18} />
            </a>
            <a href="https://www.linkedin.com/in/risvan-muhammed-096361375?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" className="flex items-center justify-center w-10 h-10 bg-white/10 rounded-full hover:bg-blue-400 hover:text-gray-900 transition">
              <Linkedin size={18} />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 mt-12 py-6 text-center text-gray-400 text-sm flex flex-col md:flex-row justify-between items-center gap-2 md:gap-0">
        <p>© {new Date().getFullYear()} Sportify UAE. All Rights Reserved.</p>
        <p className="text-gray-500 text-xs">Designed & Developed with ❤️ for Professional Players</p>
      </div>
    </footer>
  );
}
