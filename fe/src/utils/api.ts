
export const postApi = async (targetUrl: string, parem: any) => {
  const res = await fetch(process.env.REACT_APP_API_URL + targetUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(parem),
  });
  return await res.json();
};