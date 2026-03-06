// import React, { useEffect, useState } from "react";
// import api from "../Api/Axios_Instance";
// import { Plus, Trash2, Edit2, MapPin, Phone, CheckCircle } from "lucide-react";

// export default function ManageAddresses() {
//   const [addresses, setAddresses] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [form, setForm] = useState({
//     FullName: "",
//     Phone: "",
//     AltPhone: "",
//     AddressLine: "",
//     Landmark: "",
//     City: "",
//     State: "",
//     Pincode: "",
//     IsDefault: false,
//   });
//   const [editingId, setEditingId] = useState(null);
//   const [showForm, setShowForm] = useState(false);

//   const fetchAddresses = async () => {
//   try {
//     setLoading(true);
//     const res = await api.get("/address");

//     let list = res.data.data || [];

//     // ✅ Normalize ID field (handles ANY backend naming)
//     list = list.map(a => ({
//       ...a,
//       _id: a.Id || a.id || a.addressId || a.AddressId || a.addressID
//     }));

//     console.log("Normalized addresses:", list); // keep for debugging (you can remove later)

//     setAddresses(list);
//     setError(null);
//   } catch (e) {
//     console.error(e);
//     setError("Failed to load addresses");
//   } finally {
//     setLoading(false);
//   }
// };


//   useEffect(() => {
//     fetchAddresses();
//   }, []);

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setForm((prev) => ({
//       ...prev,
//       [name]: type === "checkbox" ? checked : value,
//     }));
//   };

//   const resetForm = () => {
//     setForm({
//       FullName: "",
//       Phone: "",
//       AltPhone: "",
//       AddressLine: "",
//       Landmark: "",
//       City: "",
//       State: "",
//       Pincode: "",
//       IsDefault: false,
//     });
//     setEditingId(null);
//     setShowForm(false);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       if (editingId) {
//         await api.put(`/address/${editingId}`, form);
//       } else {
//         await api.post("/address", form);
//       }
//       await fetchAddresses();
//       resetForm();
//     } catch (err) {
//       console.error(err);
//       alert("Failed to save address");
//     }
//   };

//   const handleEdit = (addr) => {
//     setForm({
//       FullName: addr.FullName,
//       Phone: addr.Phone,
//       AltPhone: addr.AltPhone || "",
//       AddressLine: addr.AddressLine,
//       Landmark: addr.Landmark || "",
//       City: addr.City,
//       State: addr.State,
//       Pincode: addr.Pincode,
//       IsDefault: addr.IsDefault,
//     });
//     setEditingId(addr.Id);
//     setShowForm(true);
//   };

//  const handleDelete = async (id) => {
//   if (!id) {
//     console.error("Delete failed: id is undefined", id);
//     alert("Invalid address id");
//     return;
//   }

//   const addr = addresses.find(a => a._id === id);

//   if (addr?.IsDefault) {
//     alert("You cannot delete your default address. Set another address as default first.");
//     return;
//   }

//   if (!window.confirm("Delete this address?")) return;

//   try {
//     await api.delete(`/address/${id}`);

//     // ✅ Update UI instantly
//     setAddresses(prev => prev.filter(a => a._id !== id));
//   } catch (err) {
//     console.error("Delete error:", err);
//     alert(err.response?.data?.message || "Failed to delete address");
//   }
// };




//  const handleSetDefault = async (id) => {
//   try {
//     await api.patch(`/address/default/${id}`);

//     setAddresses(prev =>
//       prev.map(addr =>
//         addr._id === id
//           ? { ...addr, IsDefault: true }
//           : { ...addr, IsDefault: false }
//       )
//     );
//   } catch (err) {
//     console.error(err);
//     alert(err.response?.data?.message || "Failed to set default address");
//   }
// };



//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">Loading addresses...</div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-slate-50 py-12">
//       <div className="max-w-6xl mx-auto px-4">
//         <div className="flex justify-between items-center mb-8">
//           <h1 className="text-3xl font-semibold">Your Addresses</h1>
//           <button
//             onClick={() => setShowForm(true)}
//             className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-lg"
//           >
//             <Plus className="w-5 h-5" /> Add Address
//           </button>
//         </div>

//         {error && <p className="text-red-600 mb-4">{error}</p>}

//         {showForm && (
//           <div className="bg-white p-6 rounded-xl shadow-sm border mb-6">
//             <h2 className="text-xl font-medium mb-4">
//               {editingId ? "Edit Address" : "Add New Address"}
//             </h2>
//             <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <input name="FullName" value={form.FullName} onChange={handleChange} placeholder="Full Name" required className="border p-2 rounded" />
//               <input name="Phone" value={form.Phone} onChange={handleChange} placeholder="Phone" required className="border p-2 rounded" />
//               <input name="AltPhone" value={form.AltPhone} onChange={handleChange} placeholder="Alternate Phone" className="border p-2 rounded" />
//               <input name="AddressLine" value={form.AddressLine} onChange={handleChange} placeholder="Address Line" required className="border p-2 rounded" />
//               <input name="Landmark" value={form.Landmark} onChange={handleChange} placeholder="Landmark" className="border p-2 rounded" />
//               <input name="City" value={form.City} onChange={handleChange} placeholder="City" required className="border p-2 rounded" />
//               <input name="State" value={form.State} onChange={handleChange} placeholder="State" required className="border p-2 rounded" />
//               <input name="Pincode" value={form.Pincode} onChange={handleChange} placeholder="Pincode" required className="border p-2 rounded" />

//               <div className="flex items-center gap-2">
//                 <input type="checkbox" name="IsDefault" checked={form.IsDefault} onChange={handleChange} />
//                 <span>Set as default</span>
//               </div>

//               <div className="col-span-2 flex gap-4">
//                 <button type="submit" className="px-4 py-2 bg-emerald-600 text-white rounded">
//                   Save Address
//                 </button>
//                 <button type="button" onClick={resetForm} className="px-4 py-2 bg-slate-200 rounded">
//                   Cancel
//                 </button>
//               </div>
//             </form>
//           </div>
//         )}

//         {addresses.length === 0 ? (
//           <div className="bg-white p-8 rounded-xl border text-center">
//             <MapPin className="w-12 h-12 mx-auto text-slate-400 mb-4" />
//             <p className="text-slate-600">No addresses saved yet.</p>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//            {addresses.map((addr, index) => (
//   <div key={addr.Id || index} className="bg-white p-5 rounded-xl border relative">

//                 {addr.IsDefault && (
//                   <span className="absolute top-3 right-3 text-emerald-600">
//                     <CheckCircle className="w-5 h-5" />
//                   </span>
//                 )}
//                 <h3 className="font-semibold text-lg mb-1">{addr.FullName}</h3>
//                 <p className="text-sm text-slate-600 mb-1">{addr.AddressLine}</p>
//                 {addr.Landmark && <p className="text-sm text-slate-600">{addr.Landmark}</p>}
//                 <p className="text-sm text-slate-600">
//                   {addr.City}, {addr.State} - {addr.Pincode}
//                 </p>
//                 <div className="flex items-center gap-2 text-sm text-slate-700 mt-2">
//                   <Phone className="w-4 h-4" /> {addr.Phone}
//                 </div>

//                 <div className="flex gap-3 mt-4">
//                   <button
//                     onClick={() => handleEdit(addr)}
//                     className="text-blue-600 text-sm flex items-center gap-1"
//                   >
//                     <Edit2 className="w-4 h-4" /> Edit
//                   </button>
//     {!addr.IsDefault && (
//   <button
//     onClick={() => handleDelete(addr._id)}
//     className="text-red-600 text-sm flex items-center gap-1"
//   >
//     <Trash2 className="w-4 h-4" /> Delete
//   </button>
// )}



//                 {!addr.IsDefault && (
//   <button
//     onClick={() => handleSetDefault(addr._id)}
//     className="text-emerald-600 text-sm"
//   >
//     Set Default
//   </button>
// )}

//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }






import React, { useEffect, useState } from "react";
import api from "../Api/Axios_Instance";
import { Plus, Trash2, Edit2, MapPin, Phone, CheckCircle, X } from "lucide-react";

export default function ManageAddresses() {
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [form, setForm] = useState({
    FullName: "", Phone: "", AltPhone: "",
    AddressLine: "", Landmark: "", City: "",
    State: "", Pincode: "", IsDefault: false,
  });
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const fetchAddresses = async () => {
    try {
      setLoading(true);
      const res = await api.get("/address");
      let list = res.data.data || [];
      list = list.map(a => ({
        ...a,
        _id: a.Id || a.id || a.addressId || a.AddressId || a.addressID
      }));
      setAddresses(list);
      setError(null);
    } catch (e) {
      console.error(e);
      setError("Failed to load addresses");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchAddresses(); }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const resetForm = () => {
    setForm({ FullName: "", Phone: "", AltPhone: "", AddressLine: "", Landmark: "", City: "", State: "", Pincode: "", IsDefault: false });
    setEditingId(null);
    setShowForm(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) await api.put(`/address/${editingId}`, form);
      else await api.post("/address", form);
      await fetchAddresses();
      resetForm();
    } catch (err) {
      console.error(err);
      alert("Failed to save address");
    }
  };

  const handleEdit = (addr) => {
    setForm({
      FullName: addr.FullName, Phone: addr.Phone, AltPhone: addr.AltPhone || "",
      AddressLine: addr.AddressLine, Landmark: addr.Landmark || "",
      City: addr.City, State: addr.State, Pincode: addr.Pincode, IsDefault: addr.IsDefault,
    });
    setEditingId(addr.Id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!id) { alert("Invalid address id"); return; }
    const addr = addresses.find(a => a._id === id);
    if (addr?.IsDefault) { alert("You cannot delete your default address. Set another address as default first."); return; }
    if (!window.confirm("Delete this address?")) return;
    try {
      await api.delete(`/address/${id}`);
      setAddresses(prev => prev.filter(a => a._id !== id));
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete address");
    }
  };

  const handleSetDefault = async (id) => {
    try {
      await api.patch(`/address/default/${id}`);
      setAddresses(prev => prev.map(addr =>
        addr._id === id ? { ...addr, IsDefault: true } : { ...addr, IsDefault: false }
      ));
    } catch (err) {
      alert(err.response?.data?.message || "Failed to set default address");
    }
  };

  if (loading) {
    return (
      <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#000' }}>
        <div style={{ width: 44, height: 44, border: '2px solid #222', borderTop: '2px solid #fff', borderRadius: '50%', animation: 'spin .8s linear infinite' }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
      </div>
    );
  }

  return (
    <div style={{ background: '#000', minHeight: '100vh', fontFamily: "'Barlow', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700;800;900&family=Barlow:wght@300;400;500;600&display=swap');
        .iLU-condensed { font-family: 'Barlow Condensed', sans-serif; }
        .iLU-body      { font-family: 'Barlow', sans-serif; }

        .addr-input {
          width: 100%;
          background: #000;
          border: 1px solid #222;
          color: #fff;
          padding: 10px 14px;
          font-family: 'Barlow', sans-serif;
          font-size: 13px;
          outline: none;
          transition: border-color .15s;
        }
        .addr-input::placeholder { color: #444; }
        .addr-input:focus { border-color: #555; }

        .addr-card {
          background: #000;
          border: 1px solid #222;
          padding: 22px;
          position: relative;
          transition: border-color .2s;
        }
        .addr-card:hover { border-color: #333; }

        .btn-primary {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 12px; font-weight: 800; letter-spacing: .2em; text-transform: uppercase;
          background: #fff; color: #000; border: none; cursor: pointer; padding: 10px 22px;
          display: inline-flex; align-items: center; gap: 8px;
          transition: background .15s; white-space: nowrap;
        }
        .btn-primary:hover { background: #e8e8e8; }

        .btn-outline {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 12px; font-weight: 800; letter-spacing: .2em; text-transform: uppercase;
          background: transparent; color: #fff; border: 1px solid #333; cursor: pointer; padding: 10px 22px;
          display: inline-flex; align-items: center; gap: 8px;
          transition: border-color .15s, background .15s; white-space: nowrap;
        }
        .btn-outline:hover { border-color: #666; background: #111; }

        .btn-ghost {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 11px; font-weight: 700; letter-spacing: .15em; text-transform: uppercase;
          background: none; border: none; cursor: pointer; padding: 6px 0;
          display: inline-flex; align-items: center; gap: 6px;
          transition: color .15s;
        }

        .section-label {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 10px; font-weight: 700; letter-spacing: .3em; text-transform: uppercase; color: #555;
          display: flex; align-items: center; gap: 12px;
        }
        .section-label::after { content: ''; flex: 1; height: 1px; background: #222; }

        .addr-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1px; background: #222; }
        .form-grid  { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }

        @media (max-width: 1024px) { .addr-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 640px)  {
          .addr-grid { grid-template-columns: 1fr; }
          .form-grid  { grid-template-columns: 1fr; }
        }
      `}</style>

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '64px 32px' }}>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, marginBottom: 48, borderBottom: '1px solid #222', paddingBottom: 32 }}>
          <div>
            <div className="section-label" style={{ marginBottom: 12 }}>My Account</div>
            <h1 className="iLU-condensed" style={{ fontSize: 'clamp(32px,6vw,64px)', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '.02em', color: '#fff', lineHeight: 1, margin: 0 }}>
              Saved Addresses
            </h1>
          </div>
          <button className="btn-primary" onClick={() => { resetForm(); setShowForm(true); }}>
            <Plus size={14} strokeWidth={2} /> Add Address
          </button>
        </div>

        {/* Error */}
        {error && (
          <div style={{ border: '1px solid #333', padding: '12px 16px', marginBottom: 24, display: 'flex', alignItems: 'center', gap: 10 }}>
            <span className="iLU-condensed" style={{ fontSize: 12, fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', color: '#888' }}>{error}</span>
          </div>
        )}

        {/* Form */}
        {showForm && (
          <div style={{ border: '1px solid #333', background: '#0a0a0a', padding: '28px 28px 32px', marginBottom: 40 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24, borderBottom: '1px solid #222', paddingBottom: 18 }}>
              <h2 className="iLU-condensed" style={{ fontSize: 20, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '.08em', color: '#fff', margin: 0 }}>
                {editingId ? "Edit Address" : "New Address"}
              </h2>
              <button onClick={resetForm} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#555', display: 'flex', alignItems: 'center' }}>
                <X size={16} strokeWidth={1.5} />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-grid">
                <div>
                  <label className="iLU-condensed" style={{ display: 'block', fontSize: 10, fontWeight: 700, letterSpacing: '.2em', textTransform: 'uppercase', color: '#555', marginBottom: 7 }}>Full Name</label>
                  <input name="FullName" value={form.FullName} onChange={handleChange} placeholder="Enter full name" required className="addr-input" />
                </div>
                <div>
                  <label className="iLU-condensed" style={{ display: 'block', fontSize: 10, fontWeight: 700, letterSpacing: '.2em', textTransform: 'uppercase', color: '#555', marginBottom: 7 }}>Phone</label>
                  <input name="Phone" value={form.Phone} onChange={handleChange} placeholder="Enter phone number" required className="addr-input" />
                </div>
                <div>
                  <label className="iLU-condensed" style={{ display: 'block', fontSize: 10, fontWeight: 700, letterSpacing: '.2em', textTransform: 'uppercase', color: '#555', marginBottom: 7 }}>Alternate Phone</label>
                  <input name="AltPhone" value={form.AltPhone} onChange={handleChange} placeholder="Optional" className="addr-input" />
                </div>
                <div>
                  <label className="iLU-condensed" style={{ display: 'block', fontSize: 10, fontWeight: 700, letterSpacing: '.2em', textTransform: 'uppercase', color: '#555', marginBottom: 7 }}>Address Line</label>
                  <input name="AddressLine" value={form.AddressLine} onChange={handleChange} placeholder="Street, house no." required className="addr-input" />
                </div>
                <div>
                  <label className="iLU-condensed" style={{ display: 'block', fontSize: 10, fontWeight: 700, letterSpacing: '.2em', textTransform: 'uppercase', color: '#555', marginBottom: 7 }}>Landmark</label>
                  <input name="Landmark" value={form.Landmark} onChange={handleChange} placeholder="Optional" className="addr-input" />
                </div>
                <div>
                  <label className="iLU-condensed" style={{ display: 'block', fontSize: 10, fontWeight: 700, letterSpacing: '.2em', textTransform: 'uppercase', color: '#555', marginBottom: 7 }}>City</label>
                  <input name="City" value={form.City} onChange={handleChange} placeholder="Enter city" required className="addr-input" />
                </div>
                <div>
                  <label className="iLU-condensed" style={{ display: 'block', fontSize: 10, fontWeight: 700, letterSpacing: '.2em', textTransform: 'uppercase', color: '#555', marginBottom: 7 }}>State</label>
                  <input name="State" value={form.State} onChange={handleChange} placeholder="Enter state" required className="addr-input" />
                </div>
                <div>
                  <label className="iLU-condensed" style={{ display: 'block', fontSize: 10, fontWeight: 700, letterSpacing: '.2em', textTransform: 'uppercase', color: '#555', marginBottom: 7 }}>Pincode</label>
                  <input name="Pincode" value={form.Pincode} onChange={handleChange} placeholder="Enter pincode" required className="addr-input" />
                </div>
              </div>

              {/* Default checkbox */}
              <div style={{ marginTop: 18, display: 'flex', alignItems: 'center', gap: 10 }}>
                <div
                  onClick={() => setForm(prev => ({ ...prev, IsDefault: !prev.IsDefault }))}
                  style={{
                    width: 16, height: 16, border: `1px solid ${form.IsDefault ? '#fff' : '#333'}`,
                    background: form.IsDefault ? '#fff' : 'transparent',
                    cursor: 'pointer', flexShrink: 0,
                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                  }}
                >
                  {form.IsDefault && <div style={{ width: 8, height: 8, background: '#000' }} />}
                </div>
                <span className="iLU-condensed" style={{ fontSize: 12, fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', color: '#666', cursor: 'pointer' }}
                  onClick={() => setForm(prev => ({ ...prev, IsDefault: !prev.IsDefault }))}>
                  Set as default address
                </span>
              </div>

              {/* Buttons */}
              <div style={{ display: 'flex', gap: 10, marginTop: 24 }}>
                <button type="submit" className="btn-primary">Save Address</button>
                <button type="button" onClick={resetForm} className="btn-outline">Cancel</button>
              </div>
            </form>
          </div>
        )}

        {/* Empty state */}
        {addresses.length === 0 ? (
          <div style={{ border: '1px solid #222', padding: '64px 32px', textAlign: 'center' }}>
            <MapPin size={36} color="#333" strokeWidth={1.5} style={{ marginBottom: 16 }} />
            <h3 className="iLU-condensed" style={{ fontSize: 20, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '.08em', color: '#fff', marginBottom: 8 }}>
              No Addresses Yet
            </h3>
            <p className="iLU-body" style={{ color: '#555', fontSize: 13, marginBottom: 24 }}>
              Add a delivery address to get started
            </p>
            <button className="btn-primary" onClick={() => setShowForm(true)}>
              <Plus size={14} strokeWidth={2} /> Add First Address
            </button>
          </div>
        ) : (
          <div className="addr-grid">
            {addresses.map((addr, index) => (
              <div key={addr._id || index} className="addr-card">

                {/* Default badge */}
                {addr.IsDefault && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 14 }}>
                    <CheckCircle size={12} color="#fff" strokeWidth={2} />
                    <span className="iLU-condensed" style={{ fontSize: 9, fontWeight: 800, letterSpacing: '.22em', textTransform: 'uppercase', color: '#fff' }}>
                      Default
                    </span>
                  </div>
                )}

                {/* Name */}
                <h3 className="iLU-condensed" style={{ fontSize: 17, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '.05em', color: '#fff', marginBottom: 10, lineHeight: 1.1 }}>
                  {addr.FullName}
                </h3>

                {/* Address details */}
                <p className="iLU-body" style={{ color: '#666', fontSize: 13, lineHeight: 1.6, marginBottom: 4 }}>{addr.AddressLine}</p>
                {addr.Landmark && <p className="iLU-body" style={{ color: '#555', fontSize: 12, marginBottom: 4 }}>{addr.Landmark}</p>}
                <p className="iLU-body" style={{ color: '#666', fontSize: 13, marginBottom: 10 }}>
                  {addr.City}, {addr.State} — {addr.Pincode}
                </p>

                {/* Phone */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 18, paddingBottom: 16, borderBottom: '1px solid #1a1a1a' }}>
                  <Phone size={12} color="#555" strokeWidth={1.5} />
                  <span className="iLU-condensed" style={{ fontSize: 13, fontWeight: 700, letterSpacing: '.08em', color: '#888' }}>{addr.Phone}</span>
                </div>

                {/* Actions */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
                  <button onClick={() => handleEdit(addr)} className="btn-ghost" style={{ color: '#666' }}
                    onMouseOver={e => e.currentTarget.style.color = '#fff'}
                    onMouseOut={e => e.currentTarget.style.color = '#666'}>
                    <Edit2 size={12} strokeWidth={1.5} /> Edit
                  </button>

                  {!addr.IsDefault && (
                    <button onClick={() => handleDelete(addr._id)} className="btn-ghost" style={{ color: '#444' }}
                      onMouseOver={e => e.currentTarget.style.color = '#ff4444'}
                      onMouseOut={e => e.currentTarget.style.color = '#444'}>
                      <Trash2 size={12} strokeWidth={1.5} /> Delete
                    </button>
                  )}

                  {!addr.IsDefault && (
                    <button onClick={() => handleSetDefault(addr._id)} className="btn-ghost" style={{ color: '#444', marginLeft: 'auto' }}
                      onMouseOver={e => e.currentTarget.style.color = '#fff'}
                      onMouseOut={e => e.currentTarget.style.color = '#444'}>
                      Set Default
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}