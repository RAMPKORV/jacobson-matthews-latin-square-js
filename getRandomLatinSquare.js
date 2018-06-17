module.exports = (n) => {
  let idMatrix =
    Array.from({length: n}, (_, i) =>
        Array.from({length: n}, (_, j) => i !== j ? 0 : 1));
  let cube = idMatrix.map((e,i) => [
    ...idMatrix.slice(i - n, n).map(e => [...e]),
    ...idMatrix.slice(0, i - n).map(e => [...e])
  ]);

  let isProper = true;
  let improperCell = null;
  let minIterations = n*n*n;

  for (let i = 0; i < minIterations || !isProper; i++) {
    let t = Array(3), c = Array(3);
    if (isProper) {
      do {
        t[0] = Math.floor((Math.random() * n));
        t[1] = Math.floor((Math.random() * n));
        t[2] = Math.floor((Math.random() * n));
      } while (cube[t[0]][t[1]][t[2]] != 0);
      let i = 0;
      while(cube[i][t[1]][t[2]] == 0) i++;
      c[0] = i; i = 0;
      while(cube[t[0]][i][t[2]] == 0) i++;
      c[1] = i; i = 0;
      while(cube[t[0]][t[1]][i] == 0) i++;
      c[2] = i;
    } else {
      t = improperCell;
      let skipNext = Math.random() < 0.5;
      for (let i = 0; i < n; i++) {
        if (cube[i][t[1]][t[2]] == 1) {
          c[0] = i;
          if (!skipNext) break;
        }
      }
      skipNext = Math.random() < 0.5;
      for (let i = 0; i < n; i++) {
        if (cube[t[0]][i][t[2]] == 1) {
          c[1] = i;
          if (!skipNext) break;
        }
      }
      skipNext = Math.random() < 0.5;
      for (let i = 0; i < n; i++) {
        if (cube[t[0]][t[1]][i] == 1) {
          c[2] = i;
          if (!skipNext) break;
        }
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
