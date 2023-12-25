export class Move {
  public columnFrom: number;
  public rowFrom: number;
  public columnTo: number;
  public rowTo: number;

  constructor(
    columnFrom: number,
    rowFrom: number,
    columnTo: number,
    rowTo: number
  ) {
    this.columnFrom = columnFrom;
    this.rowFrom = rowFrom;
    this.columnTo = columnTo;
    this.rowTo = rowTo;
  }
}
