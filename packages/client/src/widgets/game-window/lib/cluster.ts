export class Cluster {
  public column: number;
  public row: number;
  public length: number;
  public isHorizontal: boolean;

  constructor(
    column: number,
    row: number,
    length: number,
    isHorizontal: boolean
  ) {
    this.column = column;
    this.row = row;
    this.length = length;
    this.isHorizontal = isHorizontal;
  }
}
