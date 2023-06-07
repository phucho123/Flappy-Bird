import { Bird } from "./bird";

export class Coin{
    pos: {x:number,y:number};
    frame: number = 0;
    maxFrame: number = 10;
    height: number = 50;
    width: number = 50;
    image: HTMLImageElement = new Image();
    animationTime: number = 0;
    center: {x: number,y:number};
    state: boolean = false;
    public constructor(pos:{x: number,y:number}){
        this.pos = pos;
        this.image.src = "../assets/images/coin-animation.png";
        this.center = {x:this.pos.x+this.width/2,y:this.pos.y+this.height/2};
    }
    public draw(ctx: CanvasRenderingContext2D): void{
        // console.log(this.image.width,this.image.height);
        if(this.state) return;
        ctx.drawImage(
            this.image,
            this.frame*this.image.width/this.maxFrame,
            0,
            this.image.width/this.maxFrame,
            this.image.height,
            this.pos.x,
            this.pos.y,
            this.width,
            this.height
        )
    }
    public update(){
        this.animate();
        this.pos.x-=3;
        this.center.x-=3;
    }
    public animate(){
        this.animationTime++;
        if(this.animationTime == 10){
            this.animationTime = 0;
            this.frame = (this.frame+1)%this.maxFrame;
        }
    }
    public collide(bird: Bird){
        if(this.state) return false;
        const tmp_x: number = Math.abs(this.center.x - bird.center.x);
        const tmp_y: number = Math.abs(this.center.y - bird.center.y);
        if((tmp_x <= this.width/2+bird.width/2) && (tmp_y <= this.height/2+bird.height/2)){
            return true;
        }
        return false;
    }
}