export const objToUrlParams = (obj: any): string =>
  Object.keys(obj)
    .reduce(
      (acc: string[], k: string): string[] =>
        obj[k] != null ? [...acc, `${k}=${encodeURIComponent(obj[k])}`] : acc,
      []
    )
    .join("&");
