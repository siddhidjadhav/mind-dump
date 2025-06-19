const API_URL = 'https://your-cloud-backend-url.com/api'; // Replace with actual Render or cloud URL

export const saveThought = async (thought, token) => {
  const res = await fetch(`${API_URL}/thoughts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(thought)
  });
  return res.json();
};

export const fetchThoughts = async (token) => {
  const res = await fetch(`${API_URL}/thoughts`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.json();
};
