export class Bird{
    pos: {x:number,y:number};
    gravity: number;
    image: HTMLImageElement = new Image();
    speed: number;
    center:{x:number,y:number};
    height: number;
    width:number;
    angle: number = 0;
    frame: number = 0;
    maxframe:number = 3;
    originWidth:number;
    originHeight:number;
    animationTime:number = 0;
    public constructor(pos: {x:number,y:number}){
        this.pos = pos;
        this.gravity = 0.08;
        this.speed = 0;
        this.height = 50;
        this.width = 70;
        this.image.src = '../assets/images/yellowbird-animate.png';
        this.image.onload = () =>{
            this.originWidth = this.image.width;
            this.originHeight = this.image.height;
            // console.log(this.originWidth,this.originHeight);
            // this.image.width = this.width;
            // this.image.height = this.height;
            // console.log(this.width,this.height);
        }
        this.center = {x:this.pos.x+this.width/2,y:this.pos.y+this.height/2};
    }
    public draw(ctx: CanvasRenderingContext2D): void {
        ctx.save();
        ctx.translate(this.center.x,this.center.y);
        ctx.rotate(this.angle);
        ctx?.drawImage(
            this.image,
            this.frame*this.originWidth/this.maxframe,
            0,
            this.originWidth/this.maxframe,
            this.originHeight,
            -this.width/2,
            -this.height/2,
            this.width,
            this.height
        )
        ctx.restore();
    }
    public update(): void{
        this.animationTime+=1
        if(this.animationTime == 20){
            this.animationTime = 0;
            this.frame = (this.frame+1)%this.maxframe;
        }
        this.angle = Math.min(this.angle+Math.PI/200,Math.PI/3);
        this.speed+=this.gravity;
        this.pos.y+=this.speed;
        if(this.pos.y < 0) this.pos.y = 0;
        if(this.pos.y + this.height >= 576) this.pos.y = 576-this.height;
        this.center.y = this.pos.y+this.height/2;
    }
}