import { useNavigate } from "react-router-dom";

export default function SearchResults({ results, onClose }) {
  const navigate = useNavigate();

  if (!results.length) return (
    <div className="absolute z-50 w-full bg-white border rounded-lg mt-2 p-3 text-sm text-slate-500">
      No products found
    </div>
  );

  return (
    <div className="absolute z-50 w-full bg-white border rounded-xl mt-2 shadow-xl max-h-96 overflow-y-auto">
      {results.map(p => (
        <div
          key={p.id}
          onClick={() => {
            navigate(`/product/${p.id}`);
            onClose();
          }}
          className="flex items-center gap-3 p-3 hover:bg-slate-50 cursor-pointer"
        >
          <img src={p.imageUrl} className="w-12 h-12 object-cover rounded-lg" />
          <div>
            <p className="font-semibold text-slate-900">{p.name}</p>
            <p className="text-xs text-slate-500">${p.price}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
