export const getPathVariable = (location: any, val: string): string => {
  let result: string = "";
  let locationParts: string[] = location.search.substring(1).split("&");
  locationParts.forEach((part: string) => {
    if (part.includes(val)) result = part.replace(`${val}=`, "");
  });
  return unescape(result);
};
