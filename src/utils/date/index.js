export const getDate = timestamp => {
  const date = timestamp.toDate();
  const verifyZero = number => {
    if (number > 9) {
      return number;
    } else {
      return `0${number}`;
    }
  };

  return `${verifyZero(date.getDate())}/${verifyZero(
    date.getMonth() + 1
  )}/${date.getFullYear()}`;
};
