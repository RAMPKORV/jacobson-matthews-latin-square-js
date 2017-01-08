class LatinSquare {
  constructor(n, generateDefault = true) {
    this.n = n;
    this.square = new Array(n);
    for(let i = 0; i < n; i++) {
      this.square[i] = new Array(n);
    }
    if(generateDefault) {
      let lookup = [];
      for(let a = 0; a < 2; a++) {
        for(let i = 0; i < n; i++) {
          lookup[a*n+i] = i;
        }
      }
      for(let y = 0; y < n; y++) {
        for(let x = 0; x < n; x++) {
          this.square[y][x] = lookup[y+x];
        }
      }
    }
  }
  toIncidenceCube() {
    let incidenceCube = new IncidenceCube(this.n);
    for(let x = 0; x < this.n; x++) {
      for(let y = 0; y < this.n; y++) {
        incidenceCube.cube[x][y][this.square[x][y]] = 1;
      }
    }
    return incidenceCube;
  }
}

class IncidenceCube {
  constructor(n) {
    this.n = n;
    this.cube = new Array(n);
    for(let i = 0; i < n; i++) {
      this.cube[i] = new Array(n);
      for(let j = 0; j < n; j++) {
        this.cube[i][j] = new Array(n).fill(0);
      }
    }
    this.proper = true;
    this.improverCell = null;
  }
  toSquare() {
    let latinSquare = new LatinSquare(this.n, false);
    for(let x = 0; x < this.n; x++) {
      for(let y = 0; y < this.n; y++) {
        for(let s = 0; s < this.n; s++) {
          if(this.cube[x][y][s] == 1) {
            latinSquare.square[x][y] = s;
            break;
          }
        }
      }
    }
    return latinSquare;
  }
  move(t, x1, y1, z1) {
    this.cube[t.x][t.y][t.z]++;
    this.cube[t.x][y1][z1]++;
    this.cube[x1][y1][t.z]++;
    this.cube[x1][t.y][z1]++;
    this.cube[t.x][t.y][z1]--;
    this.cube[t.x][y1][t.z]--;
    this.cube[x1][t.y][t.z]--;
    this.cube[x1][y1][z1]--;
  }
  shuffle(min_iterations) {
    let iterations = 0;
    for (iterations=0; iterations < min_iterations || !this.proper; iterations++) {
      let t = {}, x1, y1, z1;
      if (this.proper) {
        do {
          t.x = Math.floor((Math.random() * this.n));
          t.y = Math.floor((Math.random() * this.n));
          t.z = Math.floor((Math.random() * this.n));
        } while(this.cube[t.x][t.y][t.z] != 0);
        let i = 0;
        while(this.cube[i][t.y][t.z] == 0) {
          i++;
        }
        x1 = i;
        i = 0;
        while(this.cube[t.x][i][t.z] == 0) {
          i++;
        }
        y1 = i;
        i = 0;
        while(this.cube[t.x][t.y][i] == 0) {
          i++;
        }
        z1 = i;
      } else {
        t = this.improperCell;
        let skip_next = Math.random() < 0.5;
        for(let i = 0; i < this.n; i++) {
          if(this.cube[i][t.y][t.z] == 1) {
            x1 = i;
            if(!skip_next) break;
          }
        }
        skip_next = Math.random() < 0.5;
        for(let i = 0; i < this.n; i++) {
          if(this.cube[t.x][i][t.z] == 1) {
            y1 = i;
            if(!skip_next) break;
          }
        }
        skip_next = Math.random() < 0.5;
        for(let i = 0; i < this.n; i++) {
          if(this.cube[t.x][t.y][i] == 1) {
            z1 = i;
            if(!skip_next) break;
          }
        }
      }
      this.move(t, x1, y1, z1);
      this.proper = this.cube[x1][y1][z1] != -1;
      if(!this.proper) {
        this.improperCell = {x: x1, y: y1, z: z1};
      }
    }
    return iterations;
  }
}

let latinSquare = {
  generate: function(n) {
    let latinSquare = new LatinSquare(n);
    let incidenceCube = latinSquare.toIncidenceCube();
    incidenceCube.shuffle(n*n*n);
    return incidenceCube.toSquare();
  }
};

module.exports = latinSquare;
