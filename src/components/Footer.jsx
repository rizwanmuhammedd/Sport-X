import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer style={{ background: '#000', borderTop: '1px solid #222', fontFamily: "'Barlow', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700;800;900&family=Barlow:wght@300;400;500&display=swap');

        .footer-condensed { font-family: 'Barlow Condensed', sans-serif; }
        .footer-body { font-family: 'Barlow', sans-serif; }

        .footer-link {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 12px; font-weight: 700;
          letter-spacing: 0.15em; text-transform: uppercase;
          color: #555; text-decoration: none;
          transition: color 0.15s ease;
          display: inline-block;
        }
        .footer-link:hover { color: #fff; }

        .footer-section-label {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 10px; font-weight: 700;
          letter-spacing: 0.3em; text-transform: uppercase;
          color: #333; margin-bottom: 20px;
          display: block;
        }

        .social-btn {
          width: 36px; height: 36px;
          background: none; border: 1px solid #222;
          display: flex; align-items: center; justify-content: center;
          color: #555; text-decoration: none;
          transition: color 0.15s, border-color 0.15s, background 0.15s;
          flex-shrink: 0;
        }
        .social-btn:hover { color: #fff; border-color: #555; background: #111; }

        .footer-contact-item {
          display: flex; align-items: center; gap: 12px;
          font-family: 'Barlow', sans-serif;
          font-size: 13px; color: #555; line-height: 1.5;
        }

        .footer-divider { border: none; border-top: 1px solid #1a1a1a; margin: 0; }
      `}</style>

      {/* Main Grid */}
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '64px 32px 48px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 48 }}>

        {/* Brand */}
        <div>
          <div style={{ marginBottom: 20 }}>
            <span className="footer-condensed" style={{ fontSize: 32, fontWeight: 900, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#fff', lineHeight: 1, display: 'block' }}>
              SPORT-X
            </span>
            <span className="footer-condensed" style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#333' }}>
              Premium Football Gear
            </span>
          </div>
          <p className="footer-body" style={{ color: '#444', fontSize: 13, lineHeight: 1.7, marginBottom: 16 }}>
            Premium football gear, jerseys & accessories designed for champions.
            Elevate your game with quality, style, and performance.
          </p>
          <p className="footer-condensed" style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#333' }}>
            UAE Headquarters · Dubai, UAE
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <span className="footer-section-label">Quick Links</span>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              { label: "Home", href: "/" },
              { label: "Products", href: "/more-products" },
              { label: "Cart", href: "/cart" },
              { label: "Checkout", href: "/checkout" },
            ].map(({ label, href }) => (
              <li key={href}>
                <a href={href} className="footer-link">{label}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <span className="footer-section-label">Contact Us</span>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 14 }}>
            <li className="footer-contact-item">
              <MapPin size={14} strokeWidth={1.5} color="#333" style={{ flexShrink: 0 }} />
              Dubai, UAE, India
            </li>
            <li className="footer-contact-item">
              <Phone size={14} strokeWidth={1.5} color="#333" style={{ flexShrink: 0 }} />
              6238741289
            </li>
            <li className="footer-contact-item">
              <Mail size={14} strokeWidth={1.5} color="#333" style={{ flexShrink: 0 }} />
              risvanmd172@gmail.com
            </li>
          </ul>
        </div>

        {/* Socials */}
        <div>
          <span className="footer-section-label">Follow Us</span>
          <div style={{ display: 'flex', gap: 8 }}>
            <a href="#" className="social-btn"><Facebook size={15} strokeWidth={1.5} /></a>
            <a href="#" className="social-btn"><Twitter size={15} strokeWidth={1.5} /></a>
            <a
              href="https://www.instagram.com/rizvaan.0?igsh=OHZkMnR3aHJzaGx1"
              className="social-btn"
            >
              <Instagram size={15} strokeWidth={1.5} />
            </a>
            <a
              href="https://www.linkedin.com/in/risvan-muhammed-096361375?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
              className="social-btn"
            >
              <Linkedin size={15} strokeWidth={1.5} />
            </a>
          </div>
        </div>
      </div>

      {/* Ghost watermark */}
      <div style={{ overflow: 'hidden', borderTop: '1px solid #111', padding: '20px 32px 0' }}>
        <p className="footer-condensed" style={{
          fontSize: 'clamp(36px, 8vw, 96px)', fontWeight: 900, textTransform: 'uppercase',
          letterSpacing: '-0.02em', color: '#111', lineHeight: 0.9,
          userSelect: 'none', whiteSpace: 'nowrap', overflow: 'hidden'
        }}>
          SPORT-X
        </p>
      </div>

      {/* Bottom bar */}
      <hr className="footer-divider" />
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '16px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8 }}>
        <p className="footer-condensed" style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#333' }}>
          © {new Date().getFullYear()} Sportify UAE. All Rights Reserved.
        </p>
        <p className="footer-condensed" style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#252525' }}>
          Designed for Professional Players
        </p>
      </div>
    </footer>
  );
}