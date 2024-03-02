import { SelectedTile } from './selected-tile';

export class LevelSettings {
  public x: number;
  public y: number;
  public columns: number;
  public rows: number;
  public tileWidth: number;
  public tileHeight: number;
  public tiles: any;
  public selectedTile: SelectedTile;

  constructor(
    x: number,
    y: number,
    columns: number,
    rows: number,
    tileWidth: number,
    tileHeight: number,
    tiles: any,
    selectedTile: SelectedTile
  ) {
    this.x = x;
    this.y = y;
    this.columns = columns;
    this.rows = rows;
    this.tileWidth = tileWidth;
    this.tileHeight = tileHeight;
    this.tiles = tiles;
    this.selectedTile = selectedTile;
  }
}
