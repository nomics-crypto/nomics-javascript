import fetch from "cross-fetch";

export const fetchJSON = async (
  path: string,
  options?: RequestInit
): Promise<any> => {
  const res = await fetch(path, options);

  if (!res.ok) {
    throw res;
  }

  return res.json();
};
