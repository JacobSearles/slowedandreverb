export async function makeAPICall(method, url, body) {
  const headers = {
    "Content-Type": "application/json",
  };
  const token = localStorage.token;
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  try {
    let req = fetch(url, {
      method,
      headers,
      body: JSON.stringify(body),
    });
    return req;
  } catch (er) {
    throw er;
  }
}
