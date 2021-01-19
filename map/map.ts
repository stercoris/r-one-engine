import {} from "./maps.js"
import { Entity, Frame, FrameWH, InteractiveEntity } from "../entity/entities.js"
import { FollowParams, FollowMehod } from "./follow_methods.js";
import { Directions } from "../collider/directions.js";

export class GameMap
{
    public entities: Entity[] = [];
    public position: Frame;
    private pointer: InteractiveEntity;
    private follow_params: FollowParams


    constructor(canvas: HTMLCanvasElement, x: number = 0, y:number = 0)
    {
        this.setCanvas(canvas, x, y)
    }

    private context: CanvasRenderingContext2D;


    /**Добавляет объект на карту
     * @param object Объект
    */
    addEntity(entity: Entity)
    {
        this.entities.push(entity);
    }

    setCanvas(canvas: HTMLCanvasElement, x: number = 0, y:number = 0)
    {
        this.context = canvas.getContext("2d");
        this.position = new FrameWH(x, y, canvas.clientWidth, canvas.clientHeight);
    }

    setPointer(entity: InteractiveEntity, follow_params: FollowParams)
    {
        this.entities.push(entity);
        this.follow_params = follow_params;
        this.pointer = entity;
    }

    async draw()
    {
        

        this.entities.forEach(obj => {
            if( obj.getLeft() <= this.position.w + obj.position.w &&
                obj.getTop() <= this.position.h + obj.position.h &&
                obj.getRight() >= 0 &&
                obj.getBottom() >= 0)
            {
                obj.draw(this.context);
            }
        })
        await this.follow();
    }

    clear()
    {
        this.context.clearRect(0, 0,this.position.w, this.position.h);
    }

    setOffset(x, y)
    {
        this.position.x += x;
        this.position.y += y;
    }

    async follow()
    {
        if(this.follow_params) 
        {
            switch(this.follow_params.follow_method)
            {
                case(FollowMehod.SlowReaction):
                    let exit_side = this.follow_params.isInGameArea(this.pointer);
                    switch(exit_side)
                    {
                        case(Directions.UNDEFINED):
                            return;
                        case(Directions.RIGHT):
                            this.setOffset(-this.pointer.accelerationX,0)
                            break;
                        case(Directions.LEFT):
                            this.setOffset(-this.pointer.accelerationX,0)
                            break;
                        case(Directions.TOP):

                    }
                    break;
                case(FollowMehod.NoFollow):
                    break;
            }
        }
    }
}

