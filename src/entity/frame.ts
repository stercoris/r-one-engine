export class Frame 
{
    public x: number;
    public y: number;
    public x_end: number;
    public y_end: number;
    public w: number;
    public h: number;

    /**
     * Класс для хранения координат
     * @param x_start Начальная координата Х
     * @param y_start Начальная координата Y
     * @param x_end Конечная координата Х
     * @param y_end Конечная координата Y
    */
    constructor(x_start: number, y_start: number, x_end: number, y_end: number)
    {
        this.x = x_start;
        this.y = y_start;
        this.x_end = x_end;
        this.y_end = y_end;
        this.w = this.x_end - this.x;
        this.h = this.y_end - this.y;
    }
}


export class FrameWH extends Frame
{
    /**
     * Те же самое что и Frame, но работает с шириной и высотой.
     * @param x_start Начальная координата Х
     * @param y_start Начальная координата Y
     * @param w Ширина
     * @param h Высота
    */
    constructor(x_start: number, y_start: number, w: number, h: number)
    {
        super(x_start, y_start, x_start + w, y_start + h);
    }
}