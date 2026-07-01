const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export const apiRequest = async (path, { ...options } = {}) => {
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  let data = {};
  try {
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      data = await response.json();
    } else {
      const text = await response.text();
      if (!response.ok) {
        throw new Error(text.slice(0, 100) || `Request failed with status ${response.status}`);
      }
    }
  } catch (err) {
    if (!response.ok) {
      throw new Error(err.message || `Request failed with status ${response.status}`);
    }
  }

  if (!response.ok) {
    throw new Error(data.message || `Request failed with status ${response.status}`);
  }
  
  return data;
};
