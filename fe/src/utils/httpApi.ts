/**
 * 
 * @param targetUrl 
 * @param parem 
 * @returns 
 */
export const postApi = async (targetUrl: string, param: any) => {
  const res = await fetch(process.env.REACT_APP_API_URL + targetUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(param),
  });
  return await res.json();
};