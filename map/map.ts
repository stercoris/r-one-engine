import {} from "./maps.js"
import { Entity, Frame, FrameWH } from "../entity/entities.js"

export class GameMap
{
    public entities: Entity[] = [];
    public position: Frame;

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

    draw()
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

        
    }

    clear()
    {
        this.context.clearRect(0, 0,this.position.w, this.position.h);
    }
}