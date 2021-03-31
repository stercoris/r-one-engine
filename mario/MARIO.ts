import {
  EntityAnimation,
  FrameWH,
  AnimationIds,
  Frame,
} from "../entity/entities";
import { FollowParams, FollowMehod } from "../map/follow_methods";

export class MarioAnimationsIds extends AnimationIds {
  // Сюда новые анимации втавлять
}

export let MARIO_ANIMATIONS = [
  new EntityAnimation(AnimationIds.IDLE, 0, [new FrameWH(1, 9, 15, 16)]),

  new EntityAnimation(AnimationIds.RUN, 5, [
    new FrameWH(43, 9, 15, 16),
    new FrameWH(60, 9, 15, 16),
    new FrameWH(78, 9, 15, 16),
    new FrameWH(60, 9, 15, 16),
  ]),
];

export let FOLLOW_PARAMS = new FollowParams(
  new Frame(16, 16, 500, 256),
  FollowMehod.SlowReaction
);
