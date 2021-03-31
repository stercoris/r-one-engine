import { EntityAnimation, FrameWH, AnimationIds } from "../entity/entities";

export let TIMON_ANIMATIONS = [
  new EntityAnimation(AnimationIds.IDLE, 12, [
    new FrameWH(0, 508, 40, 42),
    new FrameWH(40, 508, 40, 42),
    new FrameWH(80, 508, 40, 42),
    new FrameWH(120, 508, 40, 42),
  ]),
];
