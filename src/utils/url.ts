export const objToUrlParams = (obj: any): string =>
  Object.keys(obj)
    .reduce(
      (acc: string[], k: string): string[] =>
        obj[k] != null ? [...acc, `${k}=${obj[k]}`] : acc,
      []
    )
    .join("&");
