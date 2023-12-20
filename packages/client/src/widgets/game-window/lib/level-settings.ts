import { SelectedTile } from './selected-tile';

export class LevelSettings {
  public x: number;
  public y: number;
  public columns: number;
  public rows: number;
  public tilewidth: number;
  public tileheight: number;
  public tiles: any;
  public selectedtile: SelectedTile;

  constructor(
    x: number,
    y: number,
    columns: number,
    rows: number,
    tilewidth: number,
    tileheight: number,
    tiles: any,
    selectedtile: SelectedTile
  ) {
    this.x = x;
    this.y = y;
    this.columns = columns;
    this.rows = rows;
    this.tilewidth = tilewidth;
    this.tileheight = tileheight;
    this.tiles = tiles;
    this.selectedtile = selectedtile;
  }
}
