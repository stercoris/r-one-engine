import { GameMap, TileList} from "./maps.js"
import { Entity, Frame, FrameWH } from "../entity/entities.js"
import { EntityArray } from "./entityarray.js";


export class TileMap extends GameMap
{

    public texture: HTMLImageElement;
    public tiles: TileList;
    public size: number;
    public max_w: number;

    private test: Entity[] = [];

    /** Позволяет создайть карту из тайлов */
    constructor(canvas: HTMLCanvasElement, x: number = 0, y:number = 0, size: number, texture: HTMLImageElement, tiles: TileList)
    {
        super(canvas, x, y)
        this.texture = texture;
        this.tiles = tiles;
        this.size = size;
    }
    

    /**
     * Преобразовывает текст в кучу Сущностей с помощью словаря тайлов
     * @param text текст
     * @param ignore_first_linebreak игнорировать первый Ентер
     */
    textToTiles(text: string, ignore_first_linebreak = false)
    {
        if(ignore_first_linebreak) text = text.substr(1,text.length);
        this.entities = [];


        let rows: string[] =  text.split('\n');
        

        let temp_chunk: Entity[] = [];
        let result_chunks: Entity[] = [];
        let currentSymbol: string = rows[0][0];


        // По каждой строке
        for (let row_i = 0; row_i < rows.length; row_i++) {
            const row = rows[row_i];
            
            currentSymbol = rows[row_i][0];
            temp_chunk = [];


            // По каждому символу
            for (let symb_i = 0; symb_i < row.length;symb_i++) {

                const symb = row[symb_i];
                const tile = this.tiles.getTile(symb);

                // Позиция тайла на карте
                const tile_position = new FrameWH(
                    symb_i * this.size + this.position.x, 
                    row_i * this.size + this.position.y, 
                    this.size, 
                    this.size
                );
                // Можно использовать класс тайла, но можно так же использовать и урезанный класс, 
                // который является основой для класса тайла
                // const tile_resource = new FrameWH(tile.x, tile.y, tile.w, tile.h)

                temp_chunk.push(
                    new Entity(
                        this.texture,
                        tile_position,
                        tile.col_priority,
                        undefined,
                        tile,
                    )
                );
                /** Если это последний элемент строки или дальще идет не обрабатываемый(сейчас) символ */
                if(row[symb_i + 1] == undefined || row[symb_i + 1] != symb)
                {
                    result_chunks.push(new EntityArray(temp_chunk));
                    temp_chunk = [];
                    currentSymbol = symb;
                } 
            }
            
        }

        // TODO: Найти нормальный способ сжимать чанки по вертикали
        // let is_chunk_compressed: boolean = true;
        // let chunk_compressed: Entity[] = [];

        // while(!is_chunk_compressed){

        //     is_chunk_compressed = false;

        //     result_chunks.forEach(chunk => {
                
        //         result_chunks.forEach(chunk_next => {
        //             if(
        //                 chunk != chunk_next && 
        //                 chunk.position.w == chunk_next.position.w && 
        //                 (chunk.getBottom() == chunk_next.getTop() || 
        //                 chunk.getTop() == chunk_next.getBottom())
        //             )
        //             {
        //                 is_chunk_compressed = true;
        //                 chunk_compressed.push(new EntityArray([chunk, chunk_next]));
        //                 result_chunks.slice(result_chunks.indexOf(chunk), 1);
        //                 result_chunks.slice(result_chunks.indexOf(chunk_next), 1);

        //             }
        //         });
        //     });


        //     result_chunks = chunk_compressed;
        //     chunk_compressed = [];
        // }

        result_chunks.forEach(chunk => {
            this.addEntity(chunk);
        });
        console.log(result_chunks.length);
        this.max_w = rows.reduce(function (a, b) {return a.length > b.length ? a : b;}).length * this.size;
        
    }

    setOffset(x, y)
    {
        // Смещение направо + планируемое смещение ИИИ смещение направо + ширина карты больше 0
        if(this.position.x + x <= 0 && this.position.x + this.max_w - this.position.w + x >= 0) 
        {
            this.position.x += x
            this.position.x += y
            this.entities.forEach(ent => {
                ent.position.x += x
                ent.position.y += y
            })
        }
        
    }
}
