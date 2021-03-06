import { Directions } from "@Collider";
import { Entity, Frame } from "@Entities";

export class FollowParams {
  constructor(private game_area: Frame, public follow_method: FollowMehod) {}

  /**
   *
   * @param pointer_position позиция указателя
   * @returns сторону, в которую выходит персонаж из игровой зоны, если не выходит, то фалсе
   */
  isInGameArea(pointer: Entity): Directions {
    if (pointer.Right > this.game_area.x_end) return Directions.RIGHT;
    else if (pointer.Left < this.game_area.x) return Directions.LEFT;
    else if (pointer.Top < this.game_area.y) return Directions.TOP;
    else if (pointer.Bottom > this.game_area.y_end) return Directions.BOTTOM;
    else return Directions.UNDEFINED;
  }
}

export enum FollowMehod {
  SlowReaction = 1,
  NoFollow = 2,
}
