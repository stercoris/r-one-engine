import { TileList, TileWH } from "@Map";
import { CollisionPriority } from "@Collider";

let GAME_MAP = `
||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
|                                                                                                                                        |
|                                                                                                                                        |
|                      обл                                                                                                               |
|        обл           аки       обббл                                                                                                   |
|        аки                     аккки                                                                                                   |
|                         +                                                                                                              |
|                                                                                                                                        |
|                                                                                                                                        |
|                                                                                                                                        |
|                    +  %+%+%                                                                                                            |
|    y                                                                                                                                   |
|   brg                y                                                                                                                 |
|  booog         kssstbrg  kst                                                                                                           |
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@`;

let TILE_LIST = new TileList();

TILE_LIST.addTile(new TileWH(0, 0, 16, 16, CollisionPriority.STATIC, "*")); // Блестящий блок
TILE_LIST.addTile(new TileWH(112, 0, 16, 16, CollisionPriority.DISABLED, " ")); // Чистое небо
TILE_LIST.addTile(new TileWH(112, 0, 16, 16, CollisionPriority.STATIC, "|")); // Чистое небо(для статического неба)
TILE_LIST.addTile(new TileWH(16, 0, 16, 16, CollisionPriority.STATIC, "@")); //
TILE_LIST.addTile(new TileWH(32, 0, 16, 16, CollisionPriority.STATIC, "%")); //
TILE_LIST.addTile(new TileWH(48, 0, 16, 16, CollisionPriority.STATIC, "+")); //

/** Облако -
 *          обл
 *          ако
 */

TILE_LIST.addTile(new TileWH(64, 0, 16, 16, CollisionPriority.DISABLED, "о"));
TILE_LIST.addTile(new TileWH(80, 0, 16, 16, CollisionPriority.DISABLED, "б"));
TILE_LIST.addTile(new TileWH(96, 0, 16, 16, CollisionPriority.DISABLED, "л"));
TILE_LIST.addTile(new TileWH(64, 16, 16, 16, CollisionPriority.STATIC, "а"));
TILE_LIST.addTile(new TileWH(80, 16, 16, 16, CollisionPriority.STATIC, "к"));
TILE_LIST.addTile(new TileWH(96, 16, 16, 16, CollisionPriority.STATIC, "и"));

/** Куст - kst*/
TILE_LIST.addTile(new TileWH(16, 16, 16, 16, CollisionPriority.DISABLED, "k"));
TILE_LIST.addTile(new TileWH(33, 16, 16, 16, CollisionPriority.DISABLED, "s"));
TILE_LIST.addTile(new TileWH(49, 16, 16, 16, CollisionPriority.DISABLED, "t"));

/** Бугор -
 *           y
 *          brg
 *         booog
 */

TILE_LIST.addTile(new TileWH(128, 0, 16, 16, CollisionPriority.DISABLED, "y"));
TILE_LIST.addTile(new TileWH(128, 16, 16, 16, CollisionPriority.DISABLED, "r"));
TILE_LIST.addTile(new TileWH(112, 16, 16, 16, CollisionPriority.DISABLED, "b"));
TILE_LIST.addTile(new TileWH(144, 16, 16, 16, CollisionPriority.DISABLED, "g"));
TILE_LIST.addTile(new TileWH(144, 0, 16, 16, CollisionPriority.DISABLED, "o"));

export { GAME_MAP, TILE_LIST };
