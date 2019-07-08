import fetch from "cross-fetch";

export const fetchJSON = async (path: string): Promise<any> => {
  const res = await fetch(path);

  if (res.status >= 400) {
    throw new Error("Bad response from server");
  }

  return res.json();
};
