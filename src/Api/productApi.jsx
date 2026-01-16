import api from "./Axios_Instance";

export const searchProducts = async (query) => {
  if (!query || query.trim() === "") return [];
  const res = await api.get(`/Products/Search?q=${encodeURIComponent(query)}`);
  return res.data.data || [];
};
