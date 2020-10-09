const getRandomInteger = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
export const generateBrokerId = () => {
  let password = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < 13; i++) {
    password += characters[getRandomInteger(0, characters.length - 1)];
  }
  return password;
};
