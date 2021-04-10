
export default function Winner(board: number[][], NUMTILES: number) {
  let sum;
  const arr = board;
  for (let i = 0; i < NUMTILES; i++) {
    sum = arr[i][0] + arr[i][1] + arr[i][2]
    if (sum == 3) {
      return 1;
    } else if (sum == -3) {
      return -1;
    }
  }
  for (let i = 0; i < NUMTILES; i++) {
    sum = arr[0][i] + arr[1][i] + arr[2][i]
    if (sum == 3) {
      return 1;
    } else if (sum == -3) {
      return -1;
    }
  }
  sum = arr[0][0] + arr[1][1] + arr[2][2]
  if (sum == 3) {
    return 1;
  } else if (sum == -3) {
    return -1;
  }
  sum = arr[2][0] + arr[1][1] + arr[0][2]
  if (sum == 3) {
    return 1;
  } else if (sum == -3) {
    return -1;
  }
  return 0;
}