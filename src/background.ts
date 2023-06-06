export class Background{
    background1: HTMLImageElement = new Image();
    background2: HTMLImageElement = new Image();
    pos: {x:number,y:number};
    constructor(){
        this.background1.src = "../assets/images/background-night.png";
        this.background2.src = "../assets/images/background-night.png";
        this.pos = {x:0,y:0};
        this.background1.onload = () =>{
            this.background1.width = 1024;
            this.background1.height = 576;
        }
        this.background2.onload = () =>{
            this.background2.width = 1024;
            this.background2.height = 576;
        }
    }
    draw(ctx:CanvasRenderingContext2D | null):void{
        ctx?.drawImage(
            this.background1,
            this.pos.x,
            this.pos.y,
            this.background1.width,
            this.background1.height
        )
        ctx?.drawImage(
            this.background2,
            1024-Math.abs(this.pos.x),
            this.pos.y,
            this.background2.width,
            this.background2.height
        )
    }
    update(): void{
        this.pos.x-=3;
        if(this.pos.x<=-1024) this.pos.x = 0;
    }
    // changeBackground(): void{
    //     if(this.background1.src.split("/").at(-1) == "background-day.png"){
    //         this.background1.src = "../assets/images/background-night.png";
    //         this.background2.src = "../assets/images/background-night.png";
    //     }else if(this.background2.src.split("/").at(-1) == "background-night.png"){
    //         this.background1.src = "../assets/images/background-day.png";
    //         this.background2.src = "../assets/images/background-day.png";
    //     }
        
    // }
}