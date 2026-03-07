

import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Heart, ShoppingCart, User, LogOut, Menu, X, Search, Home, ShoppingBag, Phone } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";

export default function Navbar({ onSearch }) {
  const { user, logout } = useAuth();
  const { wishlist } = useWishlist();
  const { cart } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeSection, setActiveSection] = useState("home");
  const [showDropdown, setShowDropdown] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);

  const dropdownRef = useRef(null);
  const mobileMenuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target) && !event.target.closest('button[aria-label="Menu"]')) {
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (location.pathname === "/more-products") setActiveSection("shop");
    else if (location.pathname === "/") setActiveSection("home");
  }, [location.pathname]);

  useEffect(() => {
    if (location.pathname !== "/") return;
    const handleScroll = () => {
      const features = document.getElementById("features");
      const stats = document.getElementById("stats");
      const scrollY = window.scrollY + 150;
      if (stats && scrollY >= stats.offsetTop) setActiveSection("contact");
      else if (features && scrollY >= features.offsetTop) setActiveSection("about");
      else setActiveSection("home");
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]);

  const handleWishlistClick = () => {
    if (!user) navigate("/login");
    else navigate("/wishlist");
    setIsMobileMenuOpen(false);
  };

  const handleUserClick = () => {
    if (!user) navigate("/login");
    else setShowDropdown(!showDropdown);
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
    setShowDropdown(false);
    setIsMobileMenuOpen(false);
  };

  const handleSearchChange = (e) => {
    const val = e.target.value;
    setSearchTerm(val);
    if (onSearch) onSearch(val);
  };

  const scrollToSection = (id) => {
    let sectionId;
    if (id === "contact") sectionId = "stats";
    else sectionId = id;
    if (location.pathname === "/") {
      const section = document.getElementById(sectionId);
      if (section) section.scrollIntoView({ behavior: "smooth" });
      else window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      navigate("/");
      setTimeout(() => {
        const section = document.getElementById(sectionId);
        if (section) section.scrollIntoView({ behavior: "smooth" });
        else window.scrollTo({ top: 0, behavior: "smooth" });
      }, 200);
    }
    setIsMobileMenuOpen(false);
  };

// REPLACE handleHomeClick in Navbar.jsx with this:

const handleHomeClick = () => {
  if (location.pathname === "/") {
    // Already on home — fire the video event
    window.dispatchEvent(new CustomEvent("sportx-logo-click"));
  } else {
    // On another page — go home first, then open video after navigation
    navigate("/");
    setTimeout(() => {
      window.dispatchEvent(new CustomEvent("sportx-logo-click"));
    }, 300);
  }
  setIsMobileMenuOpen(false);
};

  const toggleSearch = () => {
    setIsSearchExpanded(!isSearchExpanded);
    if (isSearchExpanded) {
      setSearchTerm("");
      if (onSearch) onSearch("");
    }
  };

  const navLinks = [
    { id: "home",    label: "Home",    icon: Home,        action: handleHomeClick },
    { id: "shop",    label: "Shop",    icon: ShoppingBag, action: () => { navigate("/more-products"); setIsMobileMenuOpen(false); } },
    { id: "contact", label: "Contact", icon: Phone,        action: () => scrollToSection("contact") },
  ];

  const cartCount = user ? cart.reduce((total, item) => total + item.quantity, 0) : 0;
  const wishlistCount = user && wishlist ? wishlist.length : 0;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;500;600;700;800;900&family=Barlow:wght@300;400;500;600&display=swap');

        /* ── Ticker ── */
        .iLU-ticker-wrap {
          background: #fff; overflow: hidden; white-space: nowrap;
          border-bottom: 1px solid #e0e0e0;
          height: 30px; display: flex; align-items: center;
        }
        .iLU-ticker-track { display: inline-flex; animation: iLU-ticker 30s linear infinite; }
        .iLU-ticker-item {
          display: inline-flex; align-items: center; gap: 16px; padding: 0 28px;
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 9px; font-weight: 700; letter-spacing: 0.24em;
          text-transform: uppercase; color: #000;
        }
        .iLU-ticker-dot { width: 3px; height: 3px; background: #000; border-radius: 50%; flex-shrink: 0; }
        @keyframes iLU-ticker { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }

        /* ── Nav text links (desktop) ── */
        .iLU-navlink {
          position: relative; padding: 0 1px;
          background: none; border: none; cursor: pointer;
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 12px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase;
          color: #555; transition: color 0.15s; line-height: 1;
        }
        .iLU-navlink::after {
          content: ''; position: absolute; bottom: -4px; left: 0; right: 0;
          height: 1px; background: #fff;
          transform: scaleX(0); transform-origin: left; transition: transform 0.22s ease;
        }
        .iLU-navlink:hover { color: #fff; }
        .iLU-navlink:hover::after, .iLU-navlink.active::after { transform: scaleX(1); }
        .iLU-navlink.active { color: #fff; }

        /* ── Icon buttons ── */
        .iLU-iconbtn {
          position: relative; width: 36px; height: 36px;
          display: flex; align-items: center; justify-content: center;
          background: none; border: none; cursor: pointer; color: #666;
          transition: color 0.15s;
        }
        .iLU-iconbtn:hover { color: #fff; }

        .iLU-badge {
          position: absolute; top: 2px; right: 2px;
          min-width: 14px; height: 14px;
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 8px; font-weight: 800; letter-spacing: 0.03em;
          display: flex; align-items: center; justify-content: center; padding: 0 2px;
          background: #fff; color: #000;
        }

        /* ── Login btn ── */
        .iLU-loginbtn {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 11px; font-weight: 800; letter-spacing: 0.2em; text-transform: uppercase;
          color: #000; background: #fff; border: none; cursor: pointer; padding: 7px 16px;
          transition: background 0.15s; white-space: nowrap;
        }
        .iLU-loginbtn:hover { background: #e8e8e8; }

        /* ── Dropdown ── */
        .iLU-dropdown {
          animation: iLUdropIn 0.14s ease;
          position: absolute; right: 0; top: calc(100% + 10px);
          width: 205px; background: #000; border: 1px solid #2a2a2a; z-index: 100;
        }
        @keyframes iLUdropIn { from { opacity:0; transform:translateY(-4px); } to { opacity:1; transform:translateY(0); } }
        .iLU-dropdown-item {
          display: flex; align-items: center; gap: 10px;
          width: 100%; padding: 11px 14px;
          background: none; border: none; cursor: pointer;
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 11px; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase;
          color: #666; border-bottom: 1px solid #1a1a1a;
          transition: color 0.15s, background 0.15s; text-align: left;
        }
        .iLU-dropdown-item:last-child { border-bottom: none; }
        .iLU-dropdown-item:hover { color: #fff; background: #0d0d0d; }
        .iLU-dropdown-item.logout:hover { color: #ff4444; }

        /* ── Search ── */
        .iLU-search {
          height: 32px; background: #111; border: 1px solid #2a2a2a;
          color: #fff; font-family: 'Barlow', sans-serif;
          font-size: 11px; letter-spacing: 0.04em;
          padding: 0 10px 0 32px; outline: none;
          transition: width 0.28s ease, opacity 0.2s ease;
        }
        .iLU-search::placeholder { color: #3a3a3a; }
        .iLU-search:focus { border-color: #333; }

        /* ── Mobile panel ── */
        .iLU-mobile-slide { transition: transform 0.28s cubic-bezier(0.16,1,0.3,1); }
        .iLU-mobile-navlink {
          display: flex; align-items: center; gap: 12px;
          width: 100%; padding: 14px 18px;
          background: none; border: none; border-bottom: 1px solid #0f0f0f;
          cursor: pointer;
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 12px; font-weight: 700; letter-spacing: 0.16em; text-transform: uppercase;
          text-align: left; transition: background 0.15s, color 0.15s;
        }
        .iLU-mobile-navlink.active  { color: #fff; background: #0c0c0c; }
        .iLU-mobile-navlink.inactive { color: #555; }
        .iLU-mobile-navlink:hover   { color: #fff; background: #0c0c0c; }
        .iLU-section-label {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 9px; font-weight: 700; letter-spacing: 0.24em; text-transform: uppercase;
          color: #2e2e2e; padding: 13px 18px 5px;
        }
        .iLU-mobile-action {
          display: flex; align-items: center; justify-content: center; gap: 7px; padding: 11px;
          background: none; border: 1px solid #1a1a1a; cursor: pointer;
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 10px; font-weight: 700; letter-spacing: 0.16em; text-transform: uppercase;
          color: #555; transition: color 0.15s, border-color 0.15s, background 0.15s;
        }
        .iLU-mobile-action:hover { color: #fff; border-color: #333; background: #0c0c0c; }

        /* ── Responsive: hamburger only on mobile ── */
        .nav-desktop-links { display: flex; }
        .nav-desktop-user  { display: block; }
        .nav-desktop-login { display: flex; }
        .nav-hamburger     { display: none; }

        @media (max-width: 1023px) {
          .nav-desktop-links { display: none; }
          .nav-desktop-user  { display: none; }
          .nav-desktop-login { display: none; }
          .nav-hamburger     { display: flex; }
        }
      `}</style>

      {/* ── Scrolling Ticker ── */}
      <div className="iLU-ticker-wrap">
        <div className="iLU-ticker-track">
          {[...Array(2)].map((_, r) =>
            ["Free shipping on orders over $150","New season drop now live","Premium football gear","Official licensed products","30-day returns","Worldwide delivery"].map((txt, i) => (
              <span key={`${r}-${i}`} className="iLU-ticker-item">
                <span className="iLU-ticker-dot" /> {txt}
              </span>
            ))
          )}
        </div>
      </div>

      {/* ── Main Navbar ── */}
      <nav
        style={{
          position: 'fixed', left: 0, right: 0, top: 0, zIndex: 50,
          background: '#000',
          borderBottom: `1px solid ${isScrolled ? '#1e1e1e' : '#141414'}`,
          boxShadow: isScrolled ? '0 1px 20px rgba(0,0,0,0.95)' : 'none',
          transition: 'border-color 0.2s, box-shadow 0.2s',
          fontFamily: "'Barlow Condensed', sans-serif",
        }}
      >
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 54 }}>

            {/* Logo */}
            <div onClick={handleHomeClick} style={{ cursor: 'pointer', flexShrink: 0 }}>
              <div style={{ fontFamily: "'Barlow Condensed'", fontSize: 26, fontWeight: 900, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#fff', lineHeight: 1 }}>
                SPORT-X
              </div>
              <div style={{ fontFamily: "'Barlow Condensed'", fontSize: 7.5, fontWeight: 600, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#2e2e2e', lineHeight: 1, marginTop: 2 }}>
                Premium Football Gear
              </div>
            </div>

            {/* Desktop text nav */}
            <div className="nav-desktop-links" style={{ alignItems: 'center', gap: 30 }}>
              {navLinks.map(({ id, label, action }) => (
                <button key={id} onClick={action} className={`iLU-navlink ${activeSection === id ? "active" : ""}`}>
                  {label}
                </button>
              ))}
            </div>

            {/* Right icons */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 0 }}>

              {/* Search on shop page */}
              {location.pathname === "/more-products" && (
                <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                  <input
                    type="text" placeholder="Search..."
                    className="iLU-search"
                    style={{ width: isSearchExpanded ? 170 : 0, opacity: isSearchExpanded ? 1 : 0, pointerEvents: isSearchExpanded ? 'auto' : 'none' }}
                    value={searchTerm}
                    onChange={handleSearchChange}
                  />
                  <button onClick={toggleSearch} className="iLU-iconbtn"
                    style={{ position: isSearchExpanded ? 'absolute' : 'relative', left: 0, color: isSearchExpanded ? '#fff' : undefined }}>
                    <Search size={15} strokeWidth={1.5} />
                  </button>
                </div>
              )}

              {/* Search icon → shop (desktop only, not on shop page) */}
              {location.pathname !== "/more-products" && (
                <button className="iLU-iconbtn nav-desktop-links" style={{ display: 'flex' }} onClick={() => navigate("/more-products")}>
                  <Search size={15} strokeWidth={1.5} />
                </button>
              )}

              {/* Wishlist */}
              <button onClick={handleWishlistClick} className="iLU-iconbtn">
                <Heart size={16} strokeWidth={1.5} />
                {wishlistCount > 0 && <span className="iLU-badge">{wishlistCount}</span>}
              </button>

              {/* Cart */}
              <button onClick={() => user ? navigate("/cart") : navigate("/login")} className="iLU-iconbtn">
                <ShoppingCart size={16} strokeWidth={1.5} />
                {cartCount > 0 && <span className="iLU-badge">{cartCount}</span>}
              </button>

              {/* User dropdown — desktop */}
              {user ? (
                <div className="nav-desktop-user" style={{ position: 'relative' }} ref={dropdownRef}>
                  <button onClick={handleUserClick} className="iLU-iconbtn">
                    <User size={16} strokeWidth={1.5} />
                  </button>
                  {showDropdown && (
                    <div className="iLU-dropdown">
                      <div style={{ padding: '10px 14px', borderBottom: '1px solid #1a1a1a', background: '#080808' }}>
                        <p style={{ fontFamily: "'Barlow Condensed'", fontSize: 9, fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#3a3a3a', marginBottom: 3 }}>Signed in as</p>
                        <p style={{ fontFamily: "'Barlow'", fontSize: 11, color: '#666', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user.email}</p>
                      </div>
                      {[
                        { label: "Profile",   icon: User,         path: "/profile" },
                        { label: "My Orders", icon: ShoppingCart, path: "/orders"  },
                      ].map(({ label, icon: Icon, path }) => (
                        <button key={path} onClick={() => { navigate(path); setShowDropdown(false); }} className="iLU-dropdown-item">
                          <Icon size={11} strokeWidth={1.5} /> {label}
                        </button>
                      ))}
                      <button onClick={handleLogout} className="iLU-dropdown-item logout">
                        <LogOut size={11} strokeWidth={1.5} /> Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button onClick={() => navigate("/login")} className="iLU-loginbtn nav-desktop-login">
                  Login
                </button>
              )}

              {/* Hamburger — MOBILE ONLY */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="iLU-iconbtn nav-hamburger"
                aria-label="Menu"
              >
                {isMobileMenuOpen ? <X size={17} strokeWidth={1.5} /> : <Menu size={17} strokeWidth={1.5} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Spacer: ticker 30 + nav 54 + 1px = 85px */}
      <div style={{ height: 85 }} />

      {/* ── Mobile Slide Panel ── */}
      <div
        ref={mobileMenuRef}
        className="iLU-mobile-slide"
        style={{
          position: 'fixed', top: 0, right: 0, bottom: 0, zIndex: 60,
          width: '100%', maxWidth: 280,
          transform: isMobileMenuOpen ? 'translateX(0)' : 'translateX(100%)',
          background: '#000', borderLeft: '1px solid #1a1a1a',
        }}
      >
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', fontFamily: "'Barlow Condensed', sans-serif" }}>

          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 16px', height: 50, borderBottom: '1px solid #0f0f0f' }}>
            <span style={{ fontSize: 19, fontWeight: 900, letterSpacing: '0.07em', textTransform: 'uppercase', color: '#fff' }}>SPORT-X</span>
            <button onClick={() => setIsMobileMenuOpen(false)} className="iLU-iconbtn" style={{ width: 28, height: 28 }}>
              <X size={14} strokeWidth={1.5} />
            </button>
          </div>

          {/* User strip */}
          <div style={{ padding: '12px 16px', borderBottom: '1px solid #0f0f0f' }}>
            {user ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 32, height: 32, background: '#0f0f0f', border: '1px solid #1e1e1e', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <User size={14} strokeWidth={1.5} color="#444" />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#fff', marginBottom: 2 }}>Welcome back</p>
                  <p style={{ fontFamily: "'Barlow'", fontSize: 10, color: '#3a3a3a', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user.email}</p>
                </div>
              </div>
            ) : (
              <button onClick={() => { navigate("/login"); setIsMobileMenuOpen(false); }} className="iLU-loginbtn" style={{ width: '100%', padding: '10px 16px' }}>
                Login / Register
              </button>
            )}
          </div>

          {/* Nav */}
          <nav style={{ flex: 1, overflowY: 'auto' }}>
            {navLinks.map(({ id, label, icon: Icon, action }) => (
              <button key={id} onClick={action} className={`iLU-mobile-navlink ${activeSection === id ? "active" : "inactive"}`}>
                <Icon size={12} strokeWidth={1.5} />
                {label}
                {activeSection === id && <div style={{ marginLeft: 'auto', width: 3, height: 3, background: '#fff' }} />}
              </button>
            ))}
            {user && (
              <>
                <div className="iLU-section-label">Account</div>
                {[
                  { label: "Profile",   icon: User,         path: "/profile" },
                  { label: "My Orders", icon: ShoppingCart, path: "/orders"  },
                ].map(({ label, icon: Icon, path }) => (
                  <button key={path} onClick={() => { navigate(path); setIsMobileMenuOpen(false); }} className="iLU-mobile-navlink inactive">
                    <Icon size={12} strokeWidth={1.5} /> {label}
                  </button>
                ))}
              </>
            )}
          </nav>

          {/* Bottom */}
          <div style={{ padding: '12px 14px', borderTop: '1px solid #0f0f0f' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 7, marginBottom: 7 }}>
              <button onClick={handleWishlistClick} className="iLU-mobile-action">
                <div style={{ position: 'relative' }}>
                  <Heart size={13} strokeWidth={1.5} />
                  {wishlistCount > 0 && <span style={{ position: 'absolute', top: -5, right: -5, width: 12, height: 12, background: '#fff', color: '#000', fontSize: 7, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{wishlistCount}</span>}
                </div>
                Wishlist
              </button>
              <button onClick={() => { user ? navigate("/cart") : navigate("/login"); setIsMobileMenuOpen(false); }} className="iLU-mobile-action">
                <div style={{ position: 'relative' }}>
                  <ShoppingCart size={13} strokeWidth={1.5} />
                  {cartCount > 0 && <span style={{ position: 'absolute', top: -5, right: -5, width: 12, height: 12, background: '#fff', color: '#000', fontSize: 7, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{cartCount}</span>}
                </div>
                Cart
              </button>
            </div>
            {user && (
              <button onClick={handleLogout} className="iLU-mobile-action" style={{ width: '100%', color: '#3a3a3a', borderColor: '#141414' }}>
                <LogOut size={12} strokeWidth={1.5} /> Logout
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Backdrop */}
      {isMobileMenuOpen && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.88)', zIndex: 55 }}
          onClick={() => setIsMobileMenuOpen(false)} />
      )}
    </>
  );
}