import React, { useEffect, useState } from "react";
import api from "../Api/Axios_Instance";
import { Plus, Trash2, Edit2, MapPin, Phone, CheckCircle } from "lucide-react";

export default function ManageAddresses() {
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [form, setForm] = useState({
    FullName: "",
    Phone: "",
    AltPhone: "",
    AddressLine: "",
    Landmark: "",
    City: "",
    State: "",
    Pincode: "",
    IsDefault: false,
  });
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const fetchAddresses = async () => {
  try {
    setLoading(true);
    const res = await api.get("/address");

    let list = res.data.data || [];

    // ✅ Normalize ID field (handles ANY backend naming)
    list = list.map(a => ({
      ...a,
      _id: a.Id || a.id || a.addressId || a.AddressId || a.addressID
    }));

    console.log("Normalized addresses:", list); // keep for debugging (you can remove later)

    setAddresses(list);
    setError(null);
  } catch (e) {
    console.error(e);
    setError("Failed to load addresses");
  } finally {
    setLoading(false);
  }
};


  useEffect(() => {
    fetchAddresses();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const resetForm = () => {
    setForm({
      FullName: "",
      Phone: "",
      AltPhone: "",
      AddressLine: "",
      Landmark: "",
      City: "",
      State: "",
      Pincode: "",
      IsDefault: false,
    });
    setEditingId(null);
    setShowForm(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await api.put(`/address/${editingId}`, form);
      } else {
        await api.post("/address", form);
      }
      await fetchAddresses();
      resetForm();
    } catch (err) {
      console.error(err);
      alert("Failed to save address");
    }
  };

  const handleEdit = (addr) => {
    setForm({
      FullName: addr.FullName,
      Phone: addr.Phone,
      AltPhone: addr.AltPhone || "",
      AddressLine: addr.AddressLine,
      Landmark: addr.Landmark || "",
      City: addr.City,
      State: addr.State,
      Pincode: addr.Pincode,
      IsDefault: addr.IsDefault,
    });
    setEditingId(addr.Id);
    setShowForm(true);
  };

 const handleDelete = async (id) => {
  if (!id) {
    console.error("Delete failed: id is undefined", id);
    alert("Invalid address id");
    return;
  }

  const addr = addresses.find(a => a._id === id);

  if (addr?.IsDefault) {
    alert("You cannot delete your default address. Set another address as default first.");
    return;
  }

  if (!window.confirm("Delete this address?")) return;

  try {
    await api.delete(`/address/${id}`);

    // ✅ Update UI instantly
    setAddresses(prev => prev.filter(a => a._id !== id));
  } catch (err) {
    console.error("Delete error:", err);
    alert(err.response?.data?.message || "Failed to delete address");
  }
};




 const handleSetDefault = async (id) => {
  try {
    await api.patch(`/address/default/${id}`);

    setAddresses(prev =>
      prev.map(addr =>
        addr._id === id
          ? { ...addr, IsDefault: true }
          : { ...addr, IsDefault: false }
      )
    );
  } catch (err) {
    console.error(err);
    alert(err.response?.data?.message || "Failed to set default address");
  }
};



  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">Loading addresses...</div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-semibold">Your Addresses</h1>
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-lg"
          >
            <Plus className="w-5 h-5" /> Add Address
          </button>
        </div>

        {error && <p className="text-red-600 mb-4">{error}</p>}

        {showForm && (
          <div className="bg-white p-6 rounded-xl shadow-sm border mb-6">
            <h2 className="text-xl font-medium mb-4">
              {editingId ? "Edit Address" : "Add New Address"}
            </h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input name="FullName" value={form.FullName} onChange={handleChange} placeholder="Full Name" required className="border p-2 rounded" />
              <input name="Phone" value={form.Phone} onChange={handleChange} placeholder="Phone" required className="border p-2 rounded" />
              <input name="AltPhone" value={form.AltPhone} onChange={handleChange} placeholder="Alternate Phone" className="border p-2 rounded" />
              <input name="AddressLine" value={form.AddressLine} onChange={handleChange} placeholder="Address Line" required className="border p-2 rounded" />
              <input name="Landmark" value={form.Landmark} onChange={handleChange} placeholder="Landmark" className="border p-2 rounded" />
              <input name="City" value={form.City} onChange={handleChange} placeholder="City" required className="border p-2 rounded" />
              <input name="State" value={form.State} onChange={handleChange} placeholder="State" required className="border p-2 rounded" />
              <input name="Pincode" value={form.Pincode} onChange={handleChange} placeholder="Pincode" required className="border p-2 rounded" />

              <div className="flex items-center gap-2">
                <input type="checkbox" name="IsDefault" checked={form.IsDefault} onChange={handleChange} />
                <span>Set as default</span>
              </div>

              <div className="col-span-2 flex gap-4">
                <button type="submit" className="px-4 py-2 bg-emerald-600 text-white rounded">
                  Save Address
                </button>
                <button type="button" onClick={resetForm} className="px-4 py-2 bg-slate-200 rounded">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {addresses.length === 0 ? (
          <div className="bg-white p-8 rounded-xl border text-center">
            <MapPin className="w-12 h-12 mx-auto text-slate-400 mb-4" />
            <p className="text-slate-600">No addresses saved yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
           {addresses.map((addr, index) => (
  <div key={addr.Id || index} className="bg-white p-5 rounded-xl border relative">

                {addr.IsDefault && (
                  <span className="absolute top-3 right-3 text-emerald-600">
                    <CheckCircle className="w-5 h-5" />
                  </span>
                )}
                <h3 className="font-semibold text-lg mb-1">{addr.FullName}</h3>
                <p className="text-sm text-slate-600 mb-1">{addr.AddressLine}</p>
                {addr.Landmark && <p className="text-sm text-slate-600">{addr.Landmark}</p>}
                <p className="text-sm text-slate-600">
                  {addr.City}, {addr.State} - {addr.Pincode}
                </p>
                <div className="flex items-center gap-2 text-sm text-slate-700 mt-2">
                  <Phone className="w-4 h-4" /> {addr.Phone}
                </div>

                <div className="flex gap-3 mt-4">
                  <button
                    onClick={() => handleEdit(addr)}
                    className="text-blue-600 text-sm flex items-center gap-1"
                  >
                    <Edit2 className="w-4 h-4" /> Edit
                  </button>
    {!addr.IsDefault && (
  <button
    onClick={() => handleDelete(addr._id)}
    className="text-red-600 text-sm flex items-center gap-1"
  >
    <Trash2 className="w-4 h-4" /> Delete
  </button>
)}



                {!addr.IsDefault && (
  <button
    onClick={() => handleSetDefault(addr._id)}
    className="text-emerald-600 text-sm"
  >
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
