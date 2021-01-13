import { Tile, TileWH } from "./maps.js"


export class TileList 
{
    private tiles: Tile[] = [];

    /**
     * Работает как адаптер для хранения и нахождения тайлов
     * 
     * addTile() - добавляет новый тайл в список
     * 
     * getTile() - вытаскивает тайл из списка по символу тайла
     */
    constructor(){}


    /**
     * Добавляет тайл в список.
     * @param {Tile} new_tile новый элемент в словаре тайлов
     */
    addTile(new_tile: Tile)
    {
        this.tiles.forEach(tile => {
            if(tile.symbol == new_tile.symbol) throw new Error("Тайл с таким символом уже сущесвует");
        });
        this.tiles.push(new_tile);
    }


    /**
     * Находит тайл по символу.
     * @param symbol символ, по которому нужно найти тайл
     */
    getTile(symbol: string): Tile
    {
        let index = this.tiles.findIndex(tile => tile.symbol === symbol );
        if(index != -1) return(this.tiles[index]);
        else throw new Error("Тайла с таким символом не сущесвует");
    }


}