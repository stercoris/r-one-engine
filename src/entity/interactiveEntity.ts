import { Entity, EntityAnimation, FrameWH, Frame } from "@Entities";
import {
  Collision,
  CollisionPriority,
  Directions,
} from "../collider/collisions";

export class InteractiveEntity extends Entity {
  public max_speed: number;
  private gravity: number;

  public accelerationX: number = 0;
  public accelerationY: number = 0;

  private lastImpactX = Directions.RIGHT;
  private lastImpactY = Directions.TOP;

  /**
   * Модель с возможностью движения с ускорением и замедлением
   * @param max_speed максимальная скорость
   * @param gravity гравитация
   * @param texture текстура(статичная или атлас)
   * @param frame координаты прорисовки, ширина, высота
   * @param collision_priority приоритет коллизии
   * @param resource координаты в атласе, если не указывать, то будет использована растянутая текстура
   * @param animations анимации, если не указывать, то будет использована растянутая текстура
   */
  constructor(
    max_speed: number,
    gravity: number,
    texture: HTMLImageElement,
    frame: Frame,
    collision_priority: CollisionPriority,
    hitbox?: Frame,
    resource?: Frame,
    animations?: EntityAnimation[]
  ) {
    super(texture, frame, collision_priority, hitbox, resource, animations);

    this.gravity = gravity;
    this.max_speed = max_speed;
  }

  /**
   * Задаёт импульс в заданных направлениях
   * @param directionH Направление по горизонтали
   * @param directionV Направление по вертикали
   * @param accelerationX Ускорение по горизонталь
   * @param accelerationY Ускорение по вертикали
   */
  addImpact(
    directionH: Directions,
    directionV: Directions,
    accelerationX: number = this.max_speed,
    accelerationY: number = this.max_speed
  ) {
    // Если направление импакта не равно направлению движения , то мы уменьшаем скорость в данном направлении
    if (directionH == Directions.LEFT && this.accelerationX > -this.max_speed)
      this.accelerationX -= accelerationX;
    else if (
      directionH == Directions.RIGHT &&
      this.accelerationX < this.max_speed
    )
      this.accelerationX += accelerationX;

    if (directionV == Directions.TOP && this.accelerationY > -this.max_speed)
      this.accelerationY -= accelerationY;
    else if (
      directionV == Directions.BOTTOM &&
      this.accelerationY < this.max_speed
    )
      this.accelerationY += accelerationY;

    //TODO: добавить направления по надобности
  }

  /**
   * Обрабатывает столкновения и отрисовка
   * @param context контекст канваса
   */
  draw(context: CanvasRenderingContext2D) {
    this.position.x += this.accelerationX += this.move(this.accelerationX);
    this.position.y += this.accelerationY +=
      this.move(this.accelerationY) + 0.2; // + this.gravity

    if (Math.abs(this.accelerationX) < 0.01) this.accelerationX = 0;
    if (Math.abs(this.accelerationY) < 0.01) this.accelerationY = 0;

    this.collisionCheck();

    super.draw(context);
  }

  /** Расчитывает ускорение
   * @param axic_acceleration ускорение по оси
   */
  private move(axic_acceleration: number): number {
    let diff = 0;
    let stopX = axic_acceleration / 15;

    if (axic_acceleration > 0) {
      diff -= stopX;
      if (axic_acceleration - stopX < 0) diff = 0;
    } else if (axic_acceleration < 0) {
      diff -= stopX;
      if (axic_acceleration - stopX > 0) diff = 0;
    }
    return diff;
  }

  /** Обработка коллизий, выданных коллайдером */
  private collisionCheck() {
    this.collisions.forEach((collision) => {
      let slave = collision.slave;
      switch (collision.direction) {
        case Directions.RIGHT:
          this.position.x = slave.Left - this.position.w; //+ this.accelerationX;
          this.accelerationX = 0;
          break;
        case Directions.LEFT:
          this.position.x = slave.Right; // + this.accelerationX;
          this.accelerationX = 0;
          break;
        case Directions.TOP:
          this.position.y = slave.Bottom; //+ this.accelerationY;
          this.accelerationY = 0;
          break;
        case Directions.BOTTOM:
          this.position.y = slave.Top - this.position.h; //+ this.accelerationY;
          this.accelerationY = 0;
          break;
      }
    });
    this.collisions = [];
  }
}
