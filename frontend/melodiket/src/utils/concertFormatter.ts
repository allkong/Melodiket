export const formatPrice = (value: number): string => {
  return `${value.toLocaleString()} MLDY`;
};

// row, col이 1부터 시작한다고 가정
export const formatSeatPosition = (row: number, col: number): string => {
  const rowLetter = String.fromCharCode(65 + (row - 1));
  return `${rowLetter}${col}`;
};

export const formatDetailedSeatPosition = (
  row: number,
  col: number
): string => {
  const rowLetter = String.fromCharCode(65 + (row - 1));
  return `${rowLetter}열 ${col}번`;
};
