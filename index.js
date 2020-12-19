const getRandomLatinSquare = (n, minIterations = null) => {
  let idMatrix =
    Array.from({length: n}, (_, i) =>
        Array.from({length: n}, (_, j) => i !== j ? 0 : 1));
  let cube = idMatrix.map((e, i) => [
    ...idMatrix.slice(i - n, n).map(e => [...e]),
    ...idMatrix.slice(0, i - n).map(e => [...e])
  ]);
  let isProper = true;
  let improperCell = null;
  minIterations = minIterations || n*n*n;
  for (let i = 0; i < minIterations || !isProper; i++) {
    let j, t = Array(3), c = Array(3);
    if (isProper) {
      do {
        t = [
          Math.floor((Math.random() * n)),
          Math.floor((Math.random() * n)),
          Math.floor((Math.random() * n))
        ];
      } while (cube[t[0]][t[1]][t[2]] != 0);
      for(j = 0; cube[j][t[1]][t[2]] == 0; j++); c[0] = j;
      for(j = 0; cube[t[0]][j][t[2]] == 0; j++); c[1] = j;
      for(j = 0; cube[t[0]][t[1]][j] == 0; j++); c[2] = j;
    } else {
      t = improperCell;
      let candidates = [[],[],[]];
      for (j = 0; j < n; j++) {
        if (cube[j][t[1]][t[2]] == 1) candidates[0].push(j);
        if (cube[t[0]][j][t[2]] == 1) candidates[1].push(j);
        if (cube[t[0]][t[1]][j] == 1) candidates[2].push(j);
      }
      c[0] = candidates[0][Math.floor(Math.random() * candidates[0].length)];
      c[1] = candidates[1][Math.floor(Math.random() * candidates[1].length)];
      c[2] = candidates[2][Math.floor(Math.random() * candidates[2].length)];
    }
    cube[t[0]][t[1]][t[2]]++;
    cube[t[0]][c[1]][c[2]]++;
    cube[c[0]][c[1]][t[2]]++;
    cube[c[0]][t[1]][c[2]]++;
    cube[t[0]][t[1]][c[2]]--;
    cube[t[0]][c[1]][t[2]]--;
    cube[c[0]][t[1]][t[2]]--;
    cube[c[0]][c[1]][c[2]]--;
    isProper = cube[c[0]][c[1]][c[2]] != -1;
    if (!isProper) improperCell = [...c];
  }
  let square = idMatrix;
  for(let x = 0; x < n; x++) {
    for(let y = 0; y < n; y++) {
      for(let s = 0; s < n; s++) {
        if(cube[x][y][s] == 1) {
          square[x][y] = s;
          break;
        }
      }
    }
  }
  return square;
}


module.exports = {
  getRandomLatinSquare
};
