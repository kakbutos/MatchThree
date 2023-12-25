import { Animationstate } from '../types/animationstates.enum';
import { Cluster } from './cluster';
import { Gamestate } from '../types/gamestates.enum';
import { LevelSettings } from './level-settings';
import { Move } from './move';
import { SelectedTile } from './selected-tile';
import { TilesThemes } from '../types/tiles-themes';
import { Position } from './position';

const TILE_WIDTH = 70;
const TILE_HEIGHT = 70;
const COUNT_COLUMN_TILES = 8;
const COUNT_ROW_TILES = 8;

const TOTAL_TIME_ANIMATION = 0.3;

const MATCH_HORIZONTAL_COLOR = '#000000';
const MATCH_VERTICAL_COLOR = '#000000';
const MOVE_HINT_COLOR = '#000000';
const BORDER_BOARD_COLOR = '#000000';

export class GameEngine {
  public canvas: HTMLCanvasElement;
  public context: CanvasRenderingContext2D | null;
  public levelSettings: LevelSettings;

  private lastframe: number;
  private fpstime: number;
  private framecount: number;
  private fps: number;

  private isGameover: boolean;
  private score: number;
  private isShowMoves: boolean;
  private gamestate: Gamestate;
  private moves: Move[];
  private clusters: Cluster[];
  private tilecolors: Array<Array<number>>;
  private isDrag: boolean;
  private currentmove: Move;

  private animationstate: Animationstate;
  private animationtime: number;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.context = canvas.getContext('2d');
    this.isGameover = false;
    this.score = 0;
    this.isShowMoves = false;
    this.gamestate = Gamestate.INIT;
    this.moves = new Array<Move>();
    this.clusters = new Array<Cluster>();
    this.currentmove = new Move(0, 0, 0, 0);

    this.lastframe = 0;
    this.fpstime = 0;
    this.framecount = 0;
    this.fps = 0;

    this.animationstate = Animationstate.FOUND_AND_REMOVED;
    this.animationtime = 0;

    this.isDrag = false;
    this.tilecolors = TilesThemes.DEFAULT;
    this.levelSettings = new LevelSettings(
      40,
      113,
      COUNT_COLUMN_TILES,
      COUNT_ROW_TILES,
      TILE_WIDTH,
      TILE_HEIGHT,
      [],
      new SelectedTile(false, 0, 0)
    );

    this.main = this.main.bind(this);
  }

  public init() {
    this.canvas.addEventListener('mousemove', this.onMouseMove);
    this.canvas.addEventListener('mousedown', this.onMouseDown);
    this.canvas.addEventListener('mouseup', this.onMouseUp);
    this.canvas.addEventListener('mouseout', this.onMouseOut);

    for (let i = 0; i < this.levelSettings.columns; i++) {
      this.levelSettings.tiles[i] = [];

      for (let j = 0; j < this.levelSettings.rows; j++) {
        this.levelSettings.tiles[i][j] = {
          type: 0,
          shift: 0,
        };
      }
    }

    this.newGame();
    this.main(0);
  }

  public newGame() {
    this.score = 0;
    this.gamestate = Gamestate.READY;
    this.isGameover = false;

    this.createLevel();
  }

  // Главный цикл
  public main(tframe: number) {
    window.requestAnimationFrame(this.main);

    this.update(tframe);
    this.render();
  }

  public stopGame() {
    const levelwidth =
      this.levelSettings.columns * this.levelSettings.tilewidth;
    const levelheight = this.levelSettings.rows * this.levelSettings.tileheight;

    this.context!.fillStyle = 'rgba(0, 0, 0, 0.8)';
    this.context!.fillRect(
      this.levelSettings.x,
      this.levelSettings.y,
      levelwidth,
      levelheight
    );

    this.context!.fillStyle = '#ffffff';
    this.context!.font = '24px Verdana';
    this.drawCenterText(
      'Game Over!',
      this.levelSettings.x,
      this.levelSettings.y + levelheight / 2 + 10,
      levelwidth
    );
  }

  public setBlissTileTheme() {
    this.tilecolors = TilesThemes.BLISS;
    this.newGame();
  }

  public setVintageTileTheme() {
    this.tilecolors = TilesThemes.VINTAGE;
    this.newGame();
  }

  public setCandyTileTheme() {
    this.tilecolors = TilesThemes.CANDY;
    this.newGame();
  }

  private updateFoundAndRemovedState() {
    if (this.animationtime <= TOTAL_TIME_ANIMATION)
      return

    this.findClusters();

    if (this.clusters.length > 0) {
      for (let i = 0; i < this.clusters.length; i++) {
        this.score += 100 * (this.clusters[i].length - 2);
      }

      this.removeClusters();

      this.animationstate = Animationstate.NEED_TO_BE_SHIFTED;
    } else {
      this.gamestate = Gamestate.READY;
    }

    this.animationtime = 0;
  }

  private updateNeedToBeShiftedState() {
    if (this.animationtime <= TOTAL_TIME_ANIMATION)
      return

    this.shiftTiles();

    this.animationstate = Animationstate.FOUND_AND_REMOVED;
    this.animationtime = 0;

    this.findClusters();

    if (this.clusters.length <= 0) {
      this.gamestate = Gamestate.READY;
    }
  }

  private updateSwappingState() {
    if (this.animationtime <= TOTAL_TIME_ANIMATION)
      return

    this.swap(
      this.currentmove.columnFrom,
      this.currentmove.rowFrom,
      this.currentmove.columnTo,
      this.currentmove.rowTo
    );

    // Проверка, создал ли свап кластер
    this.findClusters();

    if (this.clusters.length > 0) {
      this.animationstate = Animationstate.FOUND_AND_REMOVED;
      this.animationtime = 0;
      this.gamestate = Gamestate.RESOLVE;
    } else {
      this.animationstate = Animationstate.REWIND_SWAPPING;
      this.animationtime = 0;
    }

    this.findMoves();
    this.findClusters();
  }

  private updateRewindSwappingState() {
    if (this.animationtime <= TOTAL_TIME_ANIMATION)
      return

    this.swap(
      this.currentmove.columnFrom,
      this.currentmove.rowFrom,
      this.currentmove.columnTo,
      this.currentmove.rowTo
    );

    this.gamestate = Gamestate.READY;
  }

  public update(tframe: number) {
    const dt = (tframe - this.lastframe) / 1000;
    this.lastframe = tframe;

    this.updateFps(dt);

    if (this.gamestate === Gamestate.READY && this.moves.length <= 0) {
      this.isGameover = true;
    }

    if (this.gamestate === Gamestate.RESOLVE) {
      this.animationtime += dt;

      switch (this.animationstate) {
        case Animationstate.FOUND_AND_REMOVED:
          this.updateFoundAndRemovedState();
          break;
        case Animationstate.NEED_TO_BE_SHIFTED:
          this.updateNeedToBeShiftedState();
          break;
        case Animationstate.SWAPPING:
          this.updateSwappingState();
          break;
        case Animationstate.REWIND_SWAPPING:
          this.updateRewindSwappingState();
          break;
      }

      this.findMoves();
      this.findClusters();
    }
  }

  private render() {
    // Отрисовка кадра
    this.drawFrame();

    // Отрисовка счёта
    this.context!.fillStyle = '#000000';
    this.context!.font = 'bold 24px Verdana';
    this.drawCenterText(
      'Score:',
      (this.canvas.width - 150) / 2,
      this.levelSettings.y - 55,
      150
    );
    this.drawCenterText(
      this.score,
      (this.canvas.width - 150) / 2,
      this.levelSettings.y - 25,
      150
    );

    // Отрисовка фона уровня
    const levelwidth =
      this.levelSettings.columns * this.levelSettings.tilewidth;
    const levelheight = this.levelSettings.rows * this.levelSettings.tileheight;
    this.context!.fillStyle = BORDER_BOARD_COLOR;
    this.context!.fillRect(
      this.levelSettings.x - 4,
      this.levelSettings.y - 4,
      levelwidth + 8,
      levelheight + 8
    );

    this.renderTiles();
    this.renderClusters();

    if (
      this.isShowMoves &&
      this.clusters.length <= 0 &&
      this.gamestate === Gamestate.READY
    ) {
      this.renderMoves();
    }

    if (this.isGameover) {
      this.stopGame();
    }
  }

  private createLevel() {
    let isDone = false;

    while (!isDone) {
      for (let i = 0; i < this.levelSettings.columns; i++) {
        for (let j = 0; j < this.levelSettings.rows; j++) {
          this.levelSettings.tiles[i][j].type = this.getRandomTile();
        }
      }

      this.resolveClusters();
      this.findMoves();

      if (this.moves.length > 0) {
        isDone = true;
      }
    }
  }

  private drawCenterText(
    text: string | number,
    x: number,
    y: number,
    width: number
  ) {
    const textdim = this.context!.measureText(text.toString());
    this.context!.fillText(text.toString(), x + (width - textdim.width) / 2, y);
  }

  private renderTiles() {
    for (let i = 0; i < this.levelSettings.columns; i++) {
      for (let j = 0; j < this.levelSettings.rows; j++) {
        const shift = this.levelSettings.tiles[i][j].shift;
        const coord = this.getTileCoordinate(
          i,
          j,
          0,
          (this.animationtime / TOTAL_TIME_ANIMATION) * shift
        );

        // Проверка, есть ли плитка
        if (this.levelSettings.tiles[i][j].type >= 0) {
          const rgbColor = this.tilecolors[this.levelSettings.tiles[i][j].type];

          this.drawTile(
            coord.tilex,
            coord.tiley,
            rgbColor[0],
            rgbColor[1],
            rgbColor[2]
          );
        }

        // Отрисовка выбранной плитки
        if (this.levelSettings.selectedtile.selected) {
          if (
            this.levelSettings.selectedtile.column === i &&
            this.levelSettings.selectedtile.row === j
          ) {
            this.drawTile(coord.tilex, coord.tiley, 0, 0, 0, 0.4);
          }
        }
      }
    }

    // Рендеринг свап анимации
    if (
      this.gamestate === Gamestate.RESOLVE &&
      (this.animationstate === Animationstate.SWAPPING ||
        this.animationstate === Animationstate.REWIND_SWAPPING)
    ) {
      const shiftx = this.currentmove.columnTo - this.currentmove.columnFrom;
      const shifty = this.currentmove.rowTo - this.currentmove.rowFrom;

      const coord1 = this.getTileCoordinate(
        this.currentmove.columnFrom,
        this.currentmove.rowFrom,
        0,
        0
      );
      const coord1shift = this.getTileCoordinate(
        this.currentmove.columnFrom,
        this.currentmove.rowFrom,
        (this.animationtime / TOTAL_TIME_ANIMATION) * shiftx,
        (this.animationtime / TOTAL_TIME_ANIMATION) * shifty
      );
      const rgbColor1 =
        this.tilecolors[
        this.levelSettings.tiles[this.currentmove.columnFrom][
          this.currentmove.rowFrom
        ].type
        ];

      const coord2 = this.getTileCoordinate(
        this.currentmove.columnTo,
        this.currentmove.rowTo,
        0,
        0
      );
      const coord2shift = this.getTileCoordinate(
        this.currentmove.columnTo,
        this.currentmove.rowTo,
        (this.animationtime / TOTAL_TIME_ANIMATION) * -shiftx,
        (this.animationtime / TOTAL_TIME_ANIMATION) * -shifty
      );
      const rgbColor2 =
        this.tilecolors[
        this.levelSettings.tiles[this.currentmove.columnTo][
          this.currentmove.rowTo
        ].type
        ];

      this.drawTile(coord1.tilex, coord1.tiley, 0, 0, 0);
      this.drawTile(coord2.tilex, coord2.tiley, 0, 0, 0);

      // Изменяем порядок в зависимости от состояния анимации
      if (this.animationstate === Animationstate.SWAPPING) {
        this.drawTile(
          coord1shift.tilex,
          coord1shift.tiley,
          rgbColor1[0],
          rgbColor1[1],
          rgbColor1[2]
        );
        this.drawTile(
          coord2shift.tilex,
          coord2shift.tiley,
          rgbColor2[0],
          rgbColor2[1],
          rgbColor2[2]
        );
      } else {
        this.drawTile(
          coord2shift.tilex,
          coord2shift.tiley,
          rgbColor2[0],
          rgbColor2[1],
          rgbColor2[2]
        );
        this.drawTile(
          coord1shift.tilex,
          coord1shift.tiley,
          rgbColor1[0],
          rgbColor1[1],
          rgbColor1[2]
        );
      }
    }
  }

  private updateFps(dt: number) {
    if (this.fpstime > 0.25) {
      this.fps = Math.round(this.framecount / this.fpstime);

      this.fpstime = 0;
      this.framecount = 0;
    }

    this.fpstime += dt;
    this.framecount++;
  }

  private getRandomTile() {
    return Math.floor(Math.random() * this.tilecolors.length);
  }

  private renderMoves() {
    for (let i = 0; i < this.moves.length; i++) {
      const coord1 = this.getTileCoordinate(
        this.moves[i].columnFrom,
        this.moves[i].rowFrom,
        0,
        0
      );
      const coord2 = this.getTileCoordinate(
        this.moves[i].columnTo,
        this.moves[i].rowTo,
        0,
        0
      );

      this.context!.strokeStyle = MOVE_HINT_COLOR;
      this.context!.beginPath();
      this.context!.moveTo(
        coord1.tilex + this.levelSettings.tilewidth / 2,
        coord1.tiley + this.levelSettings.tileheight / 2
      );
      this.context!.lineTo(
        coord2.tilex + this.levelSettings.tilewidth / 2,
        coord2.tiley + this.levelSettings.tileheight / 2
      );
      this.context!.stroke();
    }
  }

  private renderClusters() {
    for (let i = 0; i < this.clusters.length; i++) {
      const titleCoordinate = this.getTileCoordinate(
        this.clusters[i].column,
        this.clusters[i].row,
        0,
        0
      );

      if (this.clusters[i].isHorizontal) {
        this.context!.fillStyle = MATCH_HORIZONTAL_COLOR;
        this.context!.fillRect(
          titleCoordinate.tilex + this.levelSettings.tilewidth / 2,
          titleCoordinate.tiley + this.levelSettings.tileheight / 2 - 4,
          (this.clusters[i].length - 1) * this.levelSettings.tilewidth,
          8
        );
      } else {
        this.context!.fillStyle = MATCH_VERTICAL_COLOR;
        this.context!.fillRect(
          titleCoordinate.tilex + this.levelSettings.tilewidth / 2 - 4,
          titleCoordinate.tiley + this.levelSettings.tileheight / 2,
          8,
          (this.clusters[i].length - 1) * this.levelSettings.tileheight
        );
      }
    }
  }

  private onMouseMove = (e: MouseEvent) => {
    const mousePosition = this.getMousePos(this.canvas, e);

    if (this.isDrag && this.levelSettings.selectedtile.selected) {
      const currentTile = this.getMouseTile(mousePosition);

      if (!currentTile.valid) return;

      if (
        !this.canSwap(
          currentTile.x,
          currentTile.y,
          this.levelSettings.selectedtile.column,
          this.levelSettings.selectedtile.row
        )
      )
        return;

      this.mouseSwap(
        currentTile.x,
        currentTile.y,
        this.levelSettings.selectedtile.column,
        this.levelSettings.selectedtile.row
      );
    }
  };

  private onMouseDown = (e: MouseEvent) => {
    const mousePosition = this.getMousePos(this.canvas, e);

    // Начало перемещения
    if (!this.isDrag) {
      const currentTile = this.getMouseTile(mousePosition);

      if (currentTile.valid) {
        let swapped = false;

        if (this.levelSettings.selectedtile.selected) {
          if (
            currentTile.x === this.levelSettings.selectedtile.column &&
            currentTile.y === this.levelSettings.selectedtile.row
          ) {
            this.levelSettings.selectedtile.selected = false;
            this.isDrag = true;
            return;
          } else if (
            this.canSwap(
              currentTile.x,
              currentTile.y,
              this.levelSettings.selectedtile.column,
              this.levelSettings.selectedtile.row
            )
          ) {
            this.mouseSwap(
              currentTile.x,
              currentTile.y,
              this.levelSettings.selectedtile.column,
              this.levelSettings.selectedtile.row
            );
            swapped = true;
          }
        }

        if (!swapped) {
          this.levelSettings.selectedtile = new SelectedTile(
            true,
            currentTile.x,
            currentTile.y
          );
        }
      } else {
        this.levelSettings.selectedtile.selected = false;
      }

      this.isDrag = true;
    }
  };

  public toggleMovesVisibility() {
    this.isShowMoves = !this.isShowMoves;
  }

  private onMouseUp = () => {
    this.isDrag = false;
  };

  private onMouseOut = () => {
    this.isDrag = false;
  };

  private getMousePos = (canvas: HTMLCanvasElement, e: MouseEvent) => {
    const rect = canvas.getBoundingClientRect();

    return new Position(
      Math.round(
        ((e.clientX - rect.left) / (rect.right - rect.left)) * canvas.width
      ),
      Math.round(
        ((e.clientY - rect.top) / (rect.bottom - rect.top)) * canvas.height
      )
    );
  };

  // Меняет местами 2 плитки
  public mouseSwap(
    columnFrom: number,
    rowFrom: number,
    columnTo: number,
    rowTo: number
  ) {
    this.currentmove = new Move(columnFrom, rowFrom, columnTo, rowTo);
    this.levelSettings.selectedtile.selected = false;

    this.animationstate = Animationstate.SWAPPING;
    this.animationtime = 0;
    this.gamestate = Gamestate.RESOLVE;
  }

  private swap(x1: number, y1: number, x2: number, y2: number) {
    const typeswap = this.levelSettings.tiles[x1][y1].type;

    this.levelSettings.tiles[x1][y1].type =
      this.levelSettings.tiles[x2][y2].type;
    this.levelSettings.tiles[x2][y2].type = typeswap;
  }

  // Проверка, можно ли выполнить перемещение
  private canSwap(x1: number, y1: number, x2: number, y2: number) {
    return (Math.abs(x1 - x2) === 1 && y1 === y2) ||
      (Math.abs(y1 - y2) === 1 && x1 === x2);
  }

  private getMouseTile(position: Position) {
    const tileX = Math.floor(
      (position.x - this.levelSettings.x) / this.levelSettings.tilewidth
    );
    const tileY = Math.floor(
      (position.y - this.levelSettings.y) / this.levelSettings.tileheight
    );

    if (this.checkIsTileValid(tileX, tileY)) {
      return {
        valid: true,
        x: tileX,
        y: tileY,
      };
    }

    return {
      valid: false,
      x: 0,
      y: 0,
    };
  }

  private checkIsTileValid(xCoord: number, yCoord: number) {
    return (
      xCoord >= 0 &&
      xCoord < this.levelSettings.columns &&
      yCoord >= 0 &&
      yCoord < this.levelSettings.rows
    );
  }

  // Cдвинуть плитки и создать новые в пустых ячейках
  private shiftTiles() {
    for (let i = 0; i < this.levelSettings.columns; i++) {
      for (let j = this.levelSettings.rows - 1; j >= 0; j--) {
        if (this.levelSettings.tiles[i][j].type === -1) {
          this.levelSettings.tiles[i][j].type = this.getRandomTile();
        } else {
          const shift = this.levelSettings.tiles[i][j].shift;

          if (shift > 0) {
            this.swap(i, j, i, j + shift);
          }
        }

        this.levelSettings.tiles[i][j].shift = 0;
      }
    }
  }

  private removeClusters = () => {
    // Изменить тип плитки на -1, что указывает на удаленную плитку.

    this.loopClusters(
      (_index: number, column: number, row: number, _cluster: Cluster) => {
        this.levelSettings.tiles[column][row].type = -1;
      }
    );

    for (let i = 0; i < this.levelSettings.columns; i++) {
      let shift = 0;
      for (let j = this.levelSettings.rows - 1; j >= 0; j--) {
        if (this.levelSettings.tiles[i][j].type === -1) {
          shift++;
          this.levelSettings.tiles[i][j].shift = 0;
        } else {
          this.levelSettings.tiles[i][j].shift = shift;
        }
      }
    }
  };

  private loopClusters(
    func: (
      _index: number,
      column: number,
      row: number,
      _cluster: Cluster
    ) => void
  ) {
    for (let i = 0; i < this.clusters.length; i++) {
      const cluster = this.clusters[i];
      let columnOffset = 0;
      let rowOffset = 0;

      for (let j = 0; j < cluster.length; j++) {
        func(
          i,
          cluster.column + columnOffset,
          cluster.row + rowOffset,
          cluster
        );

        if (cluster.isHorizontal) {
          columnOffset++;
        } else {
          rowOffset++;
        }
      }
    }
  }

  private findMoves() {
    this.moves = [];

    // Поиск горизонтальных свапов
    for (let j = 0; j < this.levelSettings.rows; j++) {
      for (let i = 0; i < this.levelSettings.columns - 1; i++) {
        this.swap(i, j, i + 1, j);
        this.findClusters();
        this.swap(i, j, i + 1, j);

        if (this.clusters.length > 0) {
          this.moves.push({
            columnFrom: i,
            rowFrom: j,
            columnTo: i + 1,
            rowTo: j,
          });
        }
      }
    }

    // Поиск вертикальных свапов
    for (let i = 0; i < this.levelSettings.columns; i++) {
      for (let j = 0; j < this.levelSettings.rows - 1; j++) {
        this.swap(i, j, i, j + 1);
        this.findClusters();
        this.swap(i, j, i, j + 1);

        if (this.clusters.length > 0) {
          this.moves.push({
            columnFrom: i,
            rowFrom: j,
            columnTo: i,
            rowTo: j + 1,
          });
        }
      }
    }

    this.clusters = [];
  }

  private findClusters() {
    this.clusters = [];

    // Поиск горизонтальных кластеров
    for (let j = 0; j < this.levelSettings.rows; j++) {
      let matchLength = 1;

      for (let i = 0; i < this.levelSettings.columns; i++) {
        let isLastTile = false;

        if (i === this.levelSettings.columns - 1) {
          isLastTile = true;
        } else {
          if (
            this.levelSettings.tiles[i][j].type ===
            this.levelSettings.tiles[i + 1][j].type &&
            this.levelSettings.tiles[i][j].type != -1
          ) {
            matchLength += 1;
          } else {
            isLastTile = true;
          }
        }

        if (isLastTile) {
          if (matchLength >= 3) {
            this.clusters.push({
              column: i + 1 - matchLength,
              row: j,
              length: matchLength,
              isHorizontal: true,
            });
          }

          matchLength = 1;
        }
      }
    }

    // Поиск вертикальных кластеров
    for (let i = 0; i < this.levelSettings.columns; i++) {
      let matchLength = 1;

      for (let j = 0; j < this.levelSettings.rows; j++) {
        let isLastTile = false;

        if (j === this.levelSettings.rows - 1) {
          isLastTile = true;
        } else {
          if (
            this.levelSettings.tiles[i][j].type ===
            this.levelSettings.tiles[i][j + 1].type &&
            this.levelSettings.tiles[i][j].type != -1
          ) {
            matchLength += 1;
          } else {
            isLastTile = true;
          }
        }

        if (isLastTile) {
          if (matchLength >= 3) {
            this.clusters.push({
              column: i,
              row: j + 1 - matchLength,
              length: matchLength,
              isHorizontal: false,
            });
          }

          matchLength = 1;
        }
      }
    }
  }

  // Убрать кластеры и сдвинуть плитки
  private resolveClusters() {
    this.findClusters();

    while (this.clusters.length > 0) {
      this.removeClusters();

      this.shiftTiles();

      this.findClusters();
    }
  }

  private getTileCoordinate(
    column: number,
    row: number,
    columnoffset: number,
    rowoffset: number
  ) {
    const tilex =
      this.levelSettings.x +
      (column + columnoffset) * this.levelSettings.tilewidth;
    const tiley =
      this.levelSettings.y + (row + rowoffset) * this.levelSettings.tileheight;
    return { tilex, tiley };
  }

  private drawTile(
    x: number,
    y: number,
    r: number,
    g: number,
    b: number,
    a = 1
  ) {
    this.context!.fillStyle = 'rgb(' + r + ',' + g + ',' + b + ',' + a + ')';
    this.context!.fillRect(
      x + 2,
      y + 2,
      this.levelSettings.tilewidth - 4,
      this.levelSettings.tileheight - 4
    );
  }

  private drawFrame() {
    // Отрисовка фона и границ
    this.context!.fillStyle = 'black';
    this.context!.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.context!.fillStyle = '#cfb499';
    this.context!.fillRect(1, 1, this.canvas.width - 2, this.canvas.height - 2);

    // Отображение шапки игры
    this.context!.fillStyle = '#303030';
    this.context!.fillRect(0, 0, this.canvas.width, 25);

    // Отображение фпс
    this.context!.fillStyle = '#ffffff';
    this.context!.font = '12px Verdana';
    this.context!.fillText('Fps: ' + this.fps, 13, 16);
  }

  // БОНУСЫ
  public clearLine(row: number) {
    // TODO: Доделать добавление очков и анимацию (сейчас линия удаляется без анимации)
    this.clusters.push({
      column: 0,
      row: row,
      length: COUNT_COLUMN_TILES,
      isHorizontal: true,
    });

    while (this.clusters.length > 0) {
      // Удалить бонусный кластер
      this.removeClusters();

      // Сдвинуть клетки
      this.shiftTiles();

      // Проверка, если сформировались новые кластеры
      this.findClusters();
    }
  }
}
