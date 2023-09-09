export const capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const isNegative = (num: number) => {
  return num < 0;
};
