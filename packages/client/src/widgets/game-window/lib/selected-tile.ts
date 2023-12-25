export class SelectedTile {
  public selected: boolean;
  public column: number;
  public row: number;

  constructor(selected: boolean, column: number, row: number) {
    this.selected = selected;
    this.column = column;
    this.row = row;
  }
}
