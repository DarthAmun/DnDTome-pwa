export const rollDie = (size: number) => {
  const min = 1;
  const max = size;
  let rand = Math.round(min + Math.random() * (max - min));
  return rand;
};
