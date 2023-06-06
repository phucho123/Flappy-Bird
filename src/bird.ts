export class Bird{
    pos: {x:number,y:number};
    gravity: number;
    image: HTMLImageElement = new Image();
    speed: number;
    center:{x:number,y:number};
    height: number;
    width:number;
    angle: number = 0;
    constructor(pos: {x:number,y:number}){
        this.pos = pos;
        this.gravity = 0.08;
        this.speed = 0;
        this.height = 50;
        this.width = 70;
        this.image.src = '../assets/images/yellowbird.png';
        this.image.onload = () =>{
            this.image.width = this.width;
            this.image.height = this.height;
        }
        this.center = {x:this.pos.x+this.width/2,y:this.pos.y+this.height/2};
        window.addEventListener("keydown",(e) =>{
            if(e.key == " "){
                this.speed = -4;
                this.angle = -Math.PI/3;
            }
        })
    }
    draw(ctx: CanvasRenderingContext2D): void {
        ctx.save();
        ctx.translate(this.pos.x,this.pos.y);
        ctx.rotate(this.angle);
        ctx?.drawImage(
            this.image,
            0,
            0,
            this.image.width,
            this.image.height
        )
        ctx.restore();
    }
    update(): void{
        this.angle = Math.min(this.angle+Math.PI/200,Math.PI/3);
        this.speed+=this.gravity;
        this.pos.y+=this.speed;
        if(this.pos.y < 0) this.pos.y = 0;
        if(this.pos.y + this.image.height >= 576) this.pos.y = 576-this.image.height;
        this.center.y = this.pos.y+this.height/2;
    }
}