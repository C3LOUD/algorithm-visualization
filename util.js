"strict mode";

export const sleep = (s) =>
  new Promise((resolve) => setTimeout(resolve, s * 1000));

export const randomNum = (maxNum) => {
  return Math.trunc(Math.random() * maxNum + 1);
};
