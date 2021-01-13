import { EntityAnimation , Frame, FrameWH} from "./entities.js"
import { Collision, CollisionPriority } from "../collider/collisions.js"

export class Entity
{
    // Используется в коллайдере
    public id: number;

    /** Для отображения анимации */
    private lifetime: number = 0;

    /** Коллайдер добавляет сюда коллизии */
    public collisions: Collision[] = [];
    
    /** Хранит текущую анимацию */
    private current_animation: EntityAnimation;

    /** Хранит текущий фрейм анимации */
    private current_frame: number = 0;

    public texture: HTMLImageElement;
    public position: Frame;
    public collision_priority: CollisionPriority;
    public hitbox: Frame;
    public resource: Frame;
    public animations: EntityAnimation[];
    /**
     * Создаёт базовый объект
     * @param texture текстура(статичная или атлас)
     * @param frame координаты прорисовки, ширина, высота
     * @param collision_priority приоритет коллизии
     * @param hitbox хитбокс модельки
     * @param resource координаты в атласе, если не указывать, то будет использована растянутая текстура
     * @param animations анимации, если не указывать, то будет использована растянутая текстура
     */
    constructor(
        texture: HTMLImageElement, 
        position: Frame, 
        collision_priority: CollisionPriority, 
        hitbox?: Frame,
        resource?: Frame, 
        animations?: EntityAnimation[],
    ){
        this.texture = texture;
        
        this.position = position;
        this.hitbox = hitbox;

        this.collision_priority = collision_priority;


        /** Определяет способ отрисовки объекта */
        if(resource){
            this.resource = resource;
        }
        else if(animations){
            this.animations = animations;
            this.current_animation = animations[0];
        }
        else
        {
            this.resource = new FrameWH(0,0,texture.width, texture.height);
        }

        if(hitbox == undefined)
            this.hitbox = position;

    }


    /**
     * Отрисовывает сущность
     * @param context контекст
     */
    draw(context: CanvasRenderingContext2D)
    {
        // Если существует анимация, то отрисовываем следующий кадр
        if(this.animations)
            this.drawOnCanvas(context, this.texture, this.getNextFrame(), this.position);
        // Иначе, отрисовываем статичный ресурс
        else
            this.drawOnCanvas(context, this.texture, this.resource, this.position);
    }

    drawOnCanvas(canvas: CanvasRenderingContext2D, texture: HTMLImageElement, frame_resource: Frame, frame_position: Frame)
    {
        canvas.drawImage(
            // Тектура объекта, откуда берется ресурс
            texture, 
            // С каких координат будет браться ресурс
            frame_resource.x, 
            frame_resource.y, 
            frame_resource.w, 
            frame_resource.h, 
            // На каких координатах будет отрисовываться изображение
            frame_position.x, 
            frame_position.y, 
            frame_position.w, 
            frame_position.h
        )
    }


    getNextFrame()
    {
        let current_animation_frame = this.current_animation.frames[this.current_frame]

        if(this.lifetime % this.current_animation.speed == 0)
        {
            this.current_frame = (++this.current_frame >= this.current_animation.frames_count)? 0 : this.current_frame
        }
        
        this.lifetime++;

        return(current_animation_frame)
    }


    getMidX()
    {return(this.position.x + this.position.w / 2)}
    getMidY()
    {return(this.position.y + this.position.h / 2)}
    getLeft()
    {return(this.position.x)}
    getTop()
    {return(this.position.y)}
    getRight()
    {return(this.position.x + this.position.w)}
    getBottom()
    {return(this.position.y + this.position.h)}
    /** Возвращает длину прямой между серединой этого объекта и XY координатами*/
    getDif(x: number, y: number)
    {return(Math.sqrt(Math.pow(x-this.getMidX(),2) + Math.pow(y-this.getMidY(),2) ))}
}
