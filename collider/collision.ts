import { Entity } from "../entity/entities.js"
import { Directions } from "./collisions.js"

/**  */
export class Collision
{
    public master: Entity;
    public slave: Entity;
    public direction: Directions;

    /**
     * Хранит в себе свойства коллизии
     * @param master объект, порождающий коллизию
     * @param slave объект, испытывающий коллизию
     * @param direction направление коллизии
     */
    constructor(
        master: Entity,
        slave: Entity,
        direction: Directions
    ){
        this.master = master;
        this.slave = slave;
        this.direction = direction;
    }
}