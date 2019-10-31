import fetch from "cross-fetch";

export const fetchJSON = (path: string, options?: RequestInit): Promise<any> =>
  fetch(path, options)
    .then(res => {
      if (!res.ok) {
        throw res;
      }
      return res;
    })
    .then(res => res.json());
