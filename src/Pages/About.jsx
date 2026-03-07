import { useNavigate } from "react-router-dom";
import { ShoppingBag, ArrowLeft, Shield, Truck, RefreshCw, Award } from "lucide-react";

export default function About() {
  const navigate = useNavigate();

  return (
    <div style={{ background:'#000', minHeight:'100vh', fontFamily:"'Barlow', sans-serif", overflowX:'hidden' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700;800;900&family=Barlow:wght@300;400;500;600&display=swap');
        *, *::before, *::after { box-sizing:border-box; }
        .about-grid { display:grid; grid-template-columns:1fr 1fr; min-height:70vh; }
        .about-values { display:grid; grid-template-columns:repeat(4,1fr); gap:1px; background:#222; }
        @media(max-width:768px){
          .about-grid { grid-template-columns:1fr; }
          .about-values { grid-template-columns:repeat(2,1fr); }
        }
        @media(max-width:480px){
          .about-values { grid-template-columns:1fr; }
        }
      `}</style>

      {/* ── HERO ── */}
      <section style={{ position:'relative', width:'100%', height:'100vh', overflow:'hidden', background:'#000', borderBottom:'1px solid #222' }}>
        {/* Background image */}
        <img
          src="/images/pele.jpg"
          alt="Sport-X"
          style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover', opacity:.3, filter:'grayscale(30%)' }}
        />
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.2) 40%, rgba(0,0,0,0.95) 100%)' }}/>

        {/* Back button */}
        <button
          onClick={() => {
            navigate("/");
            setTimeout(() => {
              document.getElementById("split-section")?.scrollIntoView({ behavior:"smooth" });
            }, 300);
          }}
          style={{ position:'absolute', top:24, left:24, display:'flex', alignItems:'center', gap:8, background:'transparent', border:'1px solid #2a2a2a', color:'#666', cursor:'pointer', padding:'10px 18px', fontFamily:"'Barlow Condensed',sans-serif", fontSize:11, fontWeight:700, letterSpacing:'.2em', textTransform:'uppercase', transition:'color .15s, border-color .15s', zIndex:10 }}
          onMouseOver={e => { e.currentTarget.style.color='#fff'; e.currentTarget.style.borderColor='#555'; }}
          onMouseOut={e => { e.currentTarget.style.color='#666'; e.currentTarget.style.borderColor='#2a2a2a'; }}
        >
          <ArrowLeft size={13} strokeWidth={2}/> Back
        </button>

        {/* Center content */}
        <div style={{ position:'absolute', inset:0, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', textAlign:'center', padding:'0 24px' }}>
          <p style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:11, fontWeight:700, letterSpacing:'.4em', textTransform:'uppercase', color:'rgba(255,255,255,0.35)', marginBottom:20 }}>
            Est. 2024 · Premium Football Gear
          </p>
          <h1 style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:'clamp(56px,13vw,150px)', fontWeight:900, lineHeight:.85, textTransform:'uppercase', letterSpacing:'-.02em', color:'#fff', marginBottom:8 }}>
            SPORT
          </h1>
          <h1 style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:'clamp(56px,13vw,150px)', fontWeight:900, lineHeight:.85, textTransform:'uppercase', letterSpacing:'-.02em', WebkitTextStroke:'2px rgba(255,255,255,0.2)', color:'transparent', marginBottom:36 }}>
            -X-
          </h1>
          <p style={{ fontFamily:"'Barlow',sans-serif", color:'rgba(255,255,255,0.35)', fontSize:'clamp(13px,1.8vw,16px)', lineHeight:1.8, maxWidth:480, marginBottom:0 }}>
            Your ultimate destination for premium football gear.
          </p>
        </div>

        {/* Scroll line */}
        <div style={{ position:'absolute', bottom:32, left:'50%', transform:'translateX(-50%)', display:'flex', flexDirection:'column', alignItems:'center', gap:8 }}>
          <p style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:9, fontWeight:700, letterSpacing:'.3em', textTransform:'uppercase', color:'rgba(255,255,255,0.2)' }}>Scroll</p>
          <div style={{ width:1, height:40, background:'linear-gradient(to bottom, rgba(255,255,255,0.2), transparent)' }}/>
        </div>
      </section>

      {/* ── STORY SPLIT ── */}
      <section className="about-grid" style={{ borderBottom:'1px solid #222' }}>
        {/* Left — image */}
        <div style={{ position:'relative', overflow:'hidden', minHeight:500, background:'#0a0a0a' }}>
          <img
            src="/images/maradona.jpg"
            alt="Our Story"
            style={{ width:'100%', height:'100%', objectFit:'cover', display:'block', filter:'grayscale(20%)', transition:'transform .8s ease' }}
            onMouseOver={e => e.currentTarget.style.transform='scale(1.04)'}
            onMouseOut={e => e.currentTarget.style.transform='scale(1)'}
          />
          <div style={{ position:'absolute', inset:0, background:'linear-gradient(to right, transparent 50%, #000 100%)' }}/>
        </div>

        {/* Right — text */}
        <div style={{ background:'#000', display:'flex', flexDirection:'column', justifyContent:'center', padding:'clamp(32px,6vw,80px)', borderLeft:'1px solid #222' }}>
          <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:10, fontWeight:700, letterSpacing:'.3em', textTransform:'uppercase', color:'#555', display:'flex', alignItems:'center', gap:12, marginBottom:20 }}>
            Our Story
            <span style={{ flex:1, height:1, background:'#222', display:'block' }}/>
          </div>
          <h2 style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:'clamp(28px,4vw,56px)', fontWeight:900, textTransform:'uppercase', letterSpacing:'-.01em', color:'#fff', lineHeight:.9, marginBottom:24 }}>
            Built For<br/>
            <span style={{ WebkitTextStroke:'1px rgba(255,255,255,.2)', color:'transparent' }}>The Game</span>
          </h2>
          <p style={{ fontFamily:"'Barlow',sans-serif", color:'#555', fontSize:14, lineHeight:1.9, marginBottom:16, maxWidth:400 }}>
            Sport-X was founded with one purpose — to bring professional-grade football equipment to every player, regardless of level. From grassroots pitches to elite academies.
          </p>
          <p style={{ fontFamily:"'Barlow',sans-serif", color:'#444', fontSize:14, lineHeight:1.9, maxWidth:400 }}>
            We partner with the world's top brands to ensure every product that reaches you is authentic, performance-tested, and built to last.
          </p>
        </div>
      </section>

      {/* ── VALUES ── */}
      <section style={{ borderBottom:'1px solid #222' }}>
        <div className="about-values">
          {[
            { icon:<Shield size={22}/>, title:'100% Authentic', desc:'Every product guaranteed genuine' },
            { icon:<Truck size={22}/>, title:'Fast Shipping', desc:'2-5 day tracked delivery' },
            { icon:<RefreshCw size={22}/>, title:'Easy Returns', desc:'30-day hassle-free returns' },
            { icon:<Award size={22}/>, title:'Top Brands', desc:'Nike, Adidas, Puma & more' },
          ].map((val, i) => (
            <div key={i} style={{ background:'#000', padding:'40px 28px', borderRight: i<3?'none':'none' }}>
              <div style={{ color:'#333', marginBottom:16 }}>{val.icon}</div>
              <h3 style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:15, fontWeight:800, textTransform:'uppercase', letterSpacing:'.08em', color:'#fff', marginBottom:8 }}>{val.title}</h3>
              <p style={{ fontFamily:"'Barlow',sans-serif", color:'#444', fontSize:13, lineHeight:1.6 }}>{val.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── MISSION FULLWIDTH ── */}
      <section style={{ padding:'clamp(48px,8vw,100px) clamp(24px,6vw,80px)', borderBottom:'1px solid #222', textAlign:'center' }}>
        <p style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:11, fontWeight:700, letterSpacing:'.35em', textTransform:'uppercase', color:'#444', marginBottom:24 }}>Our Mission</p>
        <h2 style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:'clamp(32px,7vw,88px)', fontWeight:900, lineHeight:.88, textTransform:'uppercase', letterSpacing:'-.02em', color:'#fff', maxWidth:900, margin:'0 auto 24px' }}>
          Empowering Every Player<br/>
          <span style={{ WebkitTextStroke:'1px rgba(255,255,255,.15)', color:'transparent' }}>To Play Their Best</span>
        </h2>
        <p style={{ fontFamily:"'Barlow',sans-serif", color:'#444', fontSize:15, lineHeight:1.9, maxWidth:560, margin:'0 auto' }}>
          Quality, style, and innovation drive everything we do — ensuring you get nothing but the best, on and off the field.
        </p>
      </section>

      {/* ── SHOP CTA ── */}
      <section style={{ padding:'clamp(48px,6vw,80px) 24px', textAlign:'center', background:'#000' }}>
        <p style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:10, fontWeight:700, letterSpacing:'.3em', textTransform:'uppercase', color:'#333', marginBottom:20 }}>
          Ready To Play?
        </p>
        <h2 style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:'clamp(36px,8vw,96px)', fontWeight:900, lineHeight:.88, textTransform:'uppercase', letterSpacing:'-.02em', color:'#fff', marginBottom:36 }}>
          Shop The<br/>
          <span style={{ WebkitTextStroke:'1px rgba(255,255,255,.2)', color:'transparent' }}>Collection</span>
        </h2>
        <button
          className="btn-primary"
          onClick={() => navigate("/more-products")}
          style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:12, fontWeight:800, letterSpacing:'.2em', textTransform:'uppercase', background:'#fff', color:'#000', border:'none', cursor:'pointer', padding:'16px 48px', display:'inline-flex', alignItems:'center', gap:10 }}
        >
          <ShoppingBag size={15} strokeWidth={2}/> Shop Now
        </button>
      </section>

      {/* Watermark */}
      <section style={{ padding:'32px 24px', textAlign:'center', background:'#000', overflow:'hidden', borderTop:'1px solid #111' }}>
        <p style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:'clamp(18px,5vw,60px)', fontWeight:900, textTransform:'uppercase', letterSpacing:'.02em', color:'#111', lineHeight:1, whiteSpace:'nowrap' }}>
          Premium Football Gear · Est. 2024 · Sport-X
        </p>
      </section>
    </div>
  );
}