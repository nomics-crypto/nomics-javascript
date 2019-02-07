import fetch from "cross-fetch";

export const fetchJSON = async (path: string): Promise<any> => {
  try {
    const res = await fetch(path);

    if (res.status >= 400) {
      throw new Error("Bad response from server");
    }

    return await res.json();
  } catch (err) {
    console.error(err);
  }
};

export const objToUrlParams = (obj: any): string =>
  Object.keys(obj)
    .reduce(
      (acc: string[], k: string): string[] =>
        obj[k] ? [...acc, `${k}=${obj[k]}`] : acc,
      []
    )
    .join("&");
