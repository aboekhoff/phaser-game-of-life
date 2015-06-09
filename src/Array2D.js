export default class Array2D {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.content = new Array(width * height);
  }

  get(x, y) {
    return this.content[y * this.width + x];
  }

  getSquare(x, y, w, h) {
    let square = new Array2D(w, h)
    for (let i=0; i<w; i++) {
      for (let j=0; j<h; j++) {
        square.set(i, j, this.get(x + i, y + j))
      }
    }
  }

  set(x, y, newVal) {
    this.content[y * this.width + x] = newVal;
    return this;
  }

  fill(content) {
    this.forEach((_, x, y) => {
      this.set(x, y, content);
    })
  }

  forEach(callback) {
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        callback(this.content[y * this.width + x], x, y);
      }
    }
  }
}