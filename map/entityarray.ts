import { Entity, FrameWH } from "../entity/entities.js";



export class EntityArray extends Entity
{


     constructor(tiles: Entity[])
    {
        let sample_tile = tiles[0];

        let w = tiles.reduce((maxX, object) => maxX = (object.getRight() > maxX.getRight()) ? object : maxX).getRight() - sample_tile.getLeft();
        let h = tiles.reduce((maxY, object) => maxY = (object.getBottom() > maxY.getBottom()) ? object : maxY).getBottom() - sample_tile.getTop();
        

        

        let frame_position = new FrameWH(sample_tile.getLeft(), sample_tile.getTop(), w, h);
        
        

        let render: HTMLCanvasElement = document.createElement('canvas');
        let ctx = render.getContext('2d');
        ctx.imageSmoothingEnabled = false;

        

        render.width = w;
        render.height = h;
        
        
        let relative_x = sample_tile.position.x;
        let relative_y = sample_tile.position.y;

        tiles.forEach(ent => {
            ent.position.x -= relative_x;
            ent.position.y -= relative_y;
            
            ent.draw(ctx);
        });


        let texture = document.createElement('img');
        texture.onload = function() {}
        texture.src = render.toDataURL();
        
        

        super(texture, frame_position,sample_tile.collision_priority);
    }

}