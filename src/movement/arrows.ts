

export class R1Arrows
{
    public Top: boolean = false;
    public Bottom: boolean = false;
    public Left: boolean = false;
    public Right: boolean = false;
    private keys: Map<number, boolean> = new Map<number, boolean>();

    constructor()
    {

        let down = function(event){
            this.keys[event.keyCode] = true;
            this.arrows();
        }
        window.addEventListener("keydown", down.bind(this), false);


        let up = function(event){
            this.keys[event.keyCode] = false;
            this.arrows();
        }
        window.addEventListener("keyup", up.bind(this), false);
    }

    eventHandler(keyCode: number, pressed: boolean)
    {
        console.log('AAAA')
        this.keys[keyCode] = pressed;
        this.arrows();
    }

    arrows()
    {
        this.Left = this.keys[65]
        if(this.Left) 
            this.Right = false
        else 
            this.Right = this.keys[68]

        this.Top = this.keys[87]
        if(this.Top) 
            this.Bottom = false
        else 
            this.Bottom = this.keys[83]
    }

}

let PRESSED = new R1Arrows();
export { PRESSED }