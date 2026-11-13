const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

/**
 * Universal API Client with automatic JSON parsing and credentials (cookies) included.
 */
export async function apiFetch(endpoint, options = {}) {
  const url = `${API_BASE}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;

  const defaultHeaders = {
    'Content-Type': 'application/json',
  };

  const response = await fetch(url, {
    ...options,
    credentials: 'include', // Crucial: sends & receives httpOnly cookies across ports & LAN
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const error = new Error(data.message || `Request failed with status ${response.status}`);
    error.status = response.status;
    error.data = data;
    throw error;
  }

  return data;
}

export const authApi = {
  register: (payload) =>
    apiFetch('/auth/register', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),

  login: (payload) =>
    apiFetch('/auth/login', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),

  getCurrentUser: () => apiFetch('/auth/me', { method: 'GET' }),

  logout: () => apiFetch('/auth/logout', { method: 'POST' }),
};
