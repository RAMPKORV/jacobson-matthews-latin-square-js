module.exports = (n, minIterations = null) => {
  let idMatrix =
    Array.from({length: n}, (_, i) =>
        Array.from({length: n}, (_, j) => i !== j ? 0 : 1));
  let cube = idMatrix.map((e,i) => [
    ...idMatrix.slice(i - n, n).map(e => [...e]),
    ...idMatrix.slice(0, i - n).map(e => [...e])
  ]);
  let isProper = true;
  let improperCell = null;
  minIterations = minIterations || n*n*n;
  for (let i = 0; i < minIterations || !isProper; i++) {
    let t = Array(3), c = Array(3);
    if (isProper) {
      do {
        t = [
          Math.floor((Math.random() * n)),
          Math.floor((Math.random() * n)),
          Math.floor((Math.random() * n))
        ];
      } while (cube[t[0]][t[1]][t[2]] != 0);
      let i;
      for(i = 0; cube[i][t[1]][t[2]] == 0; i++); c[0] = i;
      for(i = 0; cube[t[0]][i][t[2]] == 0; i++); c[1] = i;
      for(i = 0; cube[t[0]][t[1]][i] == 0; i++); c[2] = i;
    } else {
      t = improperCell;
      let skipNexts = [
        Math.random() < 0.5, Math.random() < 0.5, Math.random() < 0.5
      ];
      for (let i = 0; i < n; i++) {
        if ((!c[0] || !skipNexts[0]) && cube[i][t[1]][t[2]] == 1) c[0] = i;
        if ((!c[1] || !skipNexts[1]) && cube[t[0]][i][t[2]] == 1) c[1] = i;
        if ((!c[2] || !skipNexts[2]) && cube[t[0]][t[1]][i] == 1) c[2] = i;
      }
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
