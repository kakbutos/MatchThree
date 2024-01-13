import { SelectedTile } from './selected-tile';

interface Tile {
  type: number;
  shift: number;
}

export class LevelSettings {
  public x: number;
  public y: number;
  public columns: number;
  public rows: number;
  public tileWidth: number;
  public tileHeight: number;
  public tiles: Tile[][];
  public selectedTile: SelectedTile;

  constructor(
    x: number,
    y: number,
    columns: number,
    rows: number,
    tileWidth: number,
    tileHeight: number,
    tiles: Tile[][],
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
