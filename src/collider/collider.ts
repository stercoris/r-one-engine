import { Entity } from "@Entities";
import { Collision, CollisionPriority, Directions } from "@Collider";

export class EntityCollider {
  private objectpull: Entity[];

  /** Отвечает зо создание событий стокновения
   *
   * Запихивает коллюзию в объект, тот уже сам решает что с ней делать.
   */
  constructor() {
    this.objectpull = [];
  }

  /**
   * Добавляет объект в коллайдер
   * @param object объект
   */
  add(object: Entity) {
    object.id = this.objectpull.length;
    this.objectpull.push(object);
  }

  /** Поводит наисложнейшие математические опреации для вычисления
   * всевозможных столкновения в игровой области,
   * попутно распихивая оные в  объекты, что бы те сами решали что с ней делать! */
  collide() {
    this.objectpull.forEach((object) => {
      // НАДА Проверять коллизию у ДВИЖУЩЕЙСЯ МОЖЕЛЬКИ с недвигающейся, поэтому:
      // МОДЕЛИ ДВИГАЮЩИЕСЯ   === ENABLED  (игрок, враг, снаряд)
      // МОДЕЛИ CТАЧИЧНЫЕ     === STATIC (гарницы, платформы и тд)
      // МОДЕЛИ БЕЗ КОЛЛИЗИИ  === DISABLED (задний фон и т.д.)
      if (
        object.collision_priority != CollisionPriority.DISABLED &&
        object.collision_priority != CollisionPriority.STATIC
      ) {
        this.objectpull.forEach((collided) => {
          if (
            collided.id != object.id &&
            collided.collision_priority != CollisionPriority.DISABLED
          ) {
            let l_dif = object.getLeft() - collided.getRight();
            let r_dif = collided.getLeft() - object.getRight();
            let t_dif = object.getTop() - collided.getBottom();
            let b_dif = collided.getTop() - object.getBottom();

            if (l_dif < 0 && r_dif < 0 && t_dif < 0 && b_dif < 0) {
              let dir = undefined;

              l_dif = Math.abs(l_dif);
              r_dif = Math.abs(r_dif);
              t_dif = Math.abs(t_dif);
              b_dif = Math.abs(b_dif);

              switch (Math.min.apply(null, [l_dif, r_dif, t_dif, b_dif])) {
                case l_dif:
                  dir = Directions.LEFT;
                  break;
                case r_dif:
                  dir = Directions.RIGHT;
                  break;
                case t_dif:
                  dir = Directions.TOP;
                  break;
                case b_dif:
                  dir = Directions.BOTTOM;
                  break;
              }

              if (dir != undefined)
                object.collisions.push(new Collision(object, collided, dir));
            }
          }
        });
      }
    });
  }
}
