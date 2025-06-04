const API_BASE_URL = "http://localhost:5000/api";

export const fetchApi = async (
  endpoint: string,
  options: RequestInit = {}
): Promise<any> => {
  const url = `${API_BASE_URL}${endpoint}`;
  const token = localStorage.getItem("token");
  const headers: { [key: string]: string } = {
    "Content-Type": "application/json",
    ...(options.headers as { [key: string]: string } || {}),
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const message = errorData.error || `HTTP error! status: ${response.status}`;
    throw new Error(message);
  }

  return response.json();
};
