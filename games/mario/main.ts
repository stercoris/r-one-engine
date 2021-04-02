import { InteractiveEntity, Frame, FrameWH } from "@Entities";
import { CollisionPriority, Directions, EntityCollider } from "@Collider";
import { TileMap } from "@Map";
import { PRESSED } from "@ArrowsControl";

// импорт не из движка //
import { GAME_MAP, TILE_LIST } from "./MAIN_MAP";
//import { TIMON_ANIMATIONS } from "./TIMON.ts";
import { MARIO_ANIMATIONS, MarioAnimationsIds, FOLLOW_PARAMS } from "./MARIO";

/** Канвас */
let canvas = document.getElementById("canvas") as HTMLCanvasElement;
let ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
ctx.imageSmoothingEnabled = false;

/** Изображения */
let map = document.getElementById("map") as HTMLImageElement;
let timon = document.getElementById("timonImg") as HTMLImageElement;
let mario = document.getElementById("mario") as HTMLImageElement;

/** Глобальные компоненты */
let TIMON: InteractiveEntity;
let MAP: TileMap;
let Collider: EntityCollider;
let MARIO: InteractiveEntity;

document.body.onload = function setup() {
  Collider = new EntityCollider();

  MAP = new TileMap(canvas, 0, 0, 16, map, TILE_LIST);
  MAP.textToTiles(GAME_MAP, true);
  MAP.entities.forEach((tile) => {
    Collider.add(tile);
  });

  //TIMON = new InteractiveEntity(7, 4, timon, new FrameWH(200,200,50,50), CollisionPriority.ENABLED, undefined, TIMON_ANIMATIONS);
  MARIO = new InteractiveEntity(
    3,
    4,
    mario,
    new FrameWH(200, 200, 15, 16),
    CollisionPriority.ENABLED,
    undefined,
    undefined,
    MARIO_ANIMATIONS
  );
  MAP.setPointer(MARIO, FOLLOW_PARAMS);

  //Collider.add(TIMON);
  Collider.add(MARIO);
  setInterval(logic, 15);
};

async function logic() {
  if (PRESSED.Right)
    MARIO.addImpact(Directions.RIGHT, Directions.UNDEFINED, 0.4, 0);
  if (PRESSED.Left)
    MARIO.addImpact(Directions.LEFT, Directions.UNDEFINED, 0.4, 0);
  if (PRESSED.Bottom)
    MARIO.addImpact(Directions.UNDEFINED, Directions.BOTTOM, 0, 0.4);
  if (PRESSED.Top)
    MARIO.addImpact(Directions.UNDEFINED, Directions.TOP, 0, 0.4);

  MAP.clear();
  await MAP.draw();
  //MARIO.draw(ctx);

  Collider.collide();
}
