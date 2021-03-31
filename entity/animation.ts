import { Frame, FrameWH } from "./entities";
import { AnimationIds } from "./animationids";

export class EntityAnimation {
  public id: AnimationIds;
  public animationname: string;
  public speed: number;
  public frames: Frame[];
  public frames_count: number;

  /**
   * Создаёт анимацию, заполненную Frame'ами.
   * @param id id анимации, пока не придумал зачем, но потом точно понадобица
   * @param animationname задумано, как нечто, позволяющее создавать событя перехода анимаций
   * @param speed скорость анимации(через колько отрисовок кадр поменяется на следующий)
   * @param frames массив из Frame'ов, каждый из которых отвечает за отдельный кадр анимации
   */
  constructor(id: number, speed: number, frames: Frame[]) {
    this.id = id;
    this.speed = speed;
    this.frames = frames;
    this.frames_count = frames.length;
  }
}
