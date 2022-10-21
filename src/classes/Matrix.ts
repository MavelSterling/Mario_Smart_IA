class Matrix {
  static matrix: string[][] = [];

  constructor(matrix: string) {
    const array: string[] = matrix.split("\r\n");
    Matrix.matrix = array.map(a => a.split(" "));
    this.buildGame(document.querySelector(".matrix")!);
  }

  buildGame(element: HTMLElement): void {
    let p: string = "";
    Matrix.matrix.forEach(row => {
      p += `<div class="cell">`;
      row.forEach(item => {
        p += `<span class="cell__item">${item}</span>`;
      });
      p += `</div>`;
    });
    console.log({ p });
    element.innerHTML = p;
  }
}

export default Matrix;
