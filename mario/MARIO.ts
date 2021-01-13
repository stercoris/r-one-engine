import { EntityAnimation, FrameWH, AnimationIds, Frame } from "../entity/entities.js";


export class MarioAnimationsIds extends AnimationIds
{
    // Сюда новые анимации втавлять
};

export let MARIO_ANIMATIONS = 
[


    new EntityAnimation(AnimationIds.IDLE, 0,
        [
            new FrameWH(1, 9, 15, 16),
        ]
    ),

    new EntityAnimation(AnimationIds.RUN, 5,
        [
            new FrameWH(43, 9, 15, 16),
            new FrameWH(60, 9, 15, 16),
            new FrameWH(78, 9, 15, 16),
            new FrameWH(60, 9, 15, 16),
        ]
    ),

];