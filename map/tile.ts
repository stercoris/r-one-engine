import { Collision, CollisionPriority } from "../collider/collisions";
import { Frame, FrameWH } from "../entity/entities";

/** Хранит информацию о тайле */
class Tile extends Frame {
  /** Приоритет коллизии */
  public col_priority: CollisionPriority;
  public symbol: string;
  /**
   * Хранит информацию о тайле, координаты обозначают положение в текстуре
   * @param {number} x Начальный Х
   * @param {number} y Начальный У
   * @param {number} x_end Конечный Х
   * @param {number} y_end Конечный У
   * @param {CollisionPriority} collision_priority Приоритет коллизии
   * @param {string} symbol символ тайла
   */
  constructor(
    x: number,
    y: number,
    x_end: number,
    y_end: number,
    collision_priority: CollisionPriority,
    symbol: string
  ) {
    super(x, y, x_end, y_end);
    this.col_priority = collision_priority;
    this.symbol = symbol;
  }
}

class TileWH extends Tile {
  /**
   * Хранит информацию о тайле, но принимает Высоту и ширину, координаты обозначают положение в текстуре
   * @param {number} x Начальный Х
   * @param {number} y Начальный У
   * @param {number} w Ширина
   * @param {number} h Высота
   * @param {CollisionPriority} collision_priority Приоритет коллизии
   * @param {string} symbol символ тайла
   */
  constructor(
    x: number,
    y: number,
    w: number,
    h: number,
    collision_priority: CollisionPriority,
    symbol: string
  ) {
    super(x, y, x + w, y + h, collision_priority, symbol);
  }
}

export { Tile, TileWH };
