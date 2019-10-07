class Life {
  constructor(n, m) {
    this.bounds = { n, m };
    this.cels = new Array(n).fill([]).map(c => {
      const x = new Array(m);
      x.fill(false);
      return x;
    });
    this.nextGenerationCells = new Array(n).fill([]).map(c => {
      const x = new Array(m);
      x.fill(false);
      return x;
    });
  }

  getArray(length) {
    return new Array(length);
  }

  placeCells(amount) {
    for (let i = 0; i < amount; i++) {
      const x = Math.round(Math.random() * (this.bounds.n - 1));
      const y = Math.round(Math.random() * (this.bounds.m - 1));

      this.cels[x][y] = true;
    }
  }

  drawCells() {
    for (let n = 0; n < this.bounds.n; n++) {
      let line = "";
      for (let m = 0; m < this.bounds.m; m++) {
        const cell = this.cels[n][m];
        line += cell ? "*" : " ";
      }
      console.log(line);
    }
  }

  lifeCycle() {
    for (let n = 0; n < this.bounds.n; n++) {
      for (let m = 0; m < this.bounds.m; m++) {
        const nearCellsCount = this.getNearCellsCount(n, m);

        if (nearCellsCount === 3) {
          this.nextGenerationCells[n][m] = true;
        }
        if (nearCellsCount < 2 || nearCellsCount > 3) {
          this.nextGenerationCells[n][m] = false;
        } else if (this.cels[n][m]) {
          this.nextGenerationCells[n][m] = true;
        }
      }
    }
    this.cels = this.nextGenerationCells.map(x => [...x]);
  }

  getNearCellsCount(x, y) {
    return [
      { x: x - 1, y: y - 1 },
      { x: x - 1, y: y + 1 },
      { x: x - 1, y: y },
      { x: x + 1, y: y + 1 },
      { x: x + 1, y: y - 1 },
      { x: x + 1, y: y },
      { x: x, y: y + 1 },
      { x: x, y: y - 1 }
    ]
      .map(pt => {
        return {
          x: pt.x > 0 ? pt.x % this.bounds.n : this.bounds.n - 1,
          y: pt.y > 0 ? pt.y % this.bounds.m : this.bounds.m - 1
        };
      })
      .filter(points => this.cels[points.x][points.y]).length;
  }

  IsDead() {
    let len = 0;
    for (let n = 0; n < this.bounds.n; n++) {
      for (let m = 0; m < this.bounds.m; m++) {
        len = !this.cels[n][m] ? len + 1 : len;
      }
    }
    console.log(len);

    return len === this.bounds.m * this.bounds.m;
  }
}

const lifeGame = new Life(40, 100);
// a.placeCells(100);

lifeGame.cels[10][14] = true;
lifeGame.cels[10][15] = true;
lifeGame.cels[11][15] = true;
lifeGame.cels[10][16] = true;

lifeGame.drawCells();
const interval = setInterval(() => {
  console.clear();
  console.log("==================================");
  lifeGame.lifeCycle();
  lifeGame.drawCells();
  if (lifeGame.IsDead()) clearInterval(interval);
}, 1000);
