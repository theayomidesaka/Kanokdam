const BASE = import.meta.env.VITE_API_URL || 'http://localhost:4000';

function getToken() {
  return sessionStorage.getItem('kanokdam_token');
}

export function saveToken(token) {
  sessionStorage.setItem('kanokdam_token', token);
}

export function clearToken() {
  sessionStorage.removeItem('kanokdam_token');
}

async function request(path, options = {}) {
  const token = getToken();
  const headers = { 'Content-Type': 'application/json', ...options.headers };
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const res = await fetch(`${BASE}${path}`, { ...options, headers });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.error || `Request failed (${res.status})`);
  }
  return res.json();
}

// Auth
export const auth = {
  login: (email, password) =>
    request('/api/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) }),
  me: () => request('/api/auth/me'),
};

// Generators
export const generators = {
  list: () => request('/api/generators'),
  get: (id) => request(`/api/generators/${id}`),
  create: (data) => request('/api/generators', { method: 'POST', body: JSON.stringify(data) }),
  update: (id, data) => request(`/api/generators/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id) => request(`/api/generators/${id}`, { method: 'DELETE' }),
  uploadImages: (id, files) => {
    const token = getToken();
    const form = new FormData();
    files.forEach((f) => form.append('images', f));
    return fetch(`${BASE}/api/generators/${id}/images`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: form,
    }).then((r) => r.json());
  },
  deleteImage: (id, imagePath) =>
    request(`/api/generators/${id}/images`, {
      method: 'DELETE',
      body: JSON.stringify({ imagePath }),
    }),
};

// Inquiries
export const inquiries = {
  submit: (data) => request('/api/inquiries', { method: 'POST', body: JSON.stringify(data) }),
  list: (status) => request(`/api/inquiries${status ? `?status=${status}` : ''}`),
  updateStatus: (id, status) =>
    request(`/api/inquiries/${id}/status`, { method: 'PATCH', body: JSON.stringify({ status }) }),
  delete: (id) => request(`/api/inquiries/${id}`, { method: 'DELETE' }),
};

// Dashboard
export const dashboard = {
  stats: () => request('/api/dashboard/stats'),
};
