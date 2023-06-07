import { Bird } from "./bird";

export class Pipe{
    type: string;
    pos:{x:number,y:number};
    height:number;
    width: number;
    image: HTMLImageElement = new Image();
    center:{x:number,y:number};
    state: number = 0;
    constructor(type:string,pos:{x:number,y:number},height:number){
        this.type = type;
        this.height = height;
        this.width = 70;
        this.pos = pos;
        if(this.type == "up") this.image.src = "../assets/images/up-pipe.png";
        else this.image.src = "../assets/images/down-pipe.png";
        // this.image.onload = () => {
        //     this.image.width = this.width;
        //     this.image.height = this.height;
        // }
        this.center = {x:this.pos.x+this.width/2,y:this.pos.y+this.height/2};
    }
    draw(ctx:CanvasRenderingContext2D):void {
        if(this.type == "down"){
            const height = (this.image.height/this.image.width)*this.width;
            if(height > this.height){
                ctx?.drawImage(
                    this.image,
                    this.pos.x,
                    this.pos.y-(height-this.height),
                    this.width,
                    height
                )
            }else{
                ctx?.drawImage(
                    this.image,
                    this.pos.x,
                    this.pos.y,
                    this.width,
                    height
                )
            }
        }else{
            const height = (this.image.height/this.image.width)*this.width;
            ctx?.drawImage(
                this.image,
                this.pos.x,
                this.pos.y,
                this.width,
                height
            )
        }
        
    }
    update(): void{
        this.pos.x-=3;
        this.center.x-=3;
    }
    checkCollide(bird: Bird): boolean{
        const tmp_x: number = Math.abs(this.center.x - bird.center.x);
        const tmp_y: number = Math.abs(this.center.y - bird.center.y);
        if((tmp_x <= this.width/2+bird.width/2) && (tmp_y <= this.height/2+bird.height/2)){
            // console.log("Collison");
            return true;
        }
        return false;
    }
    checkScore(bird: Bird): boolean{
        if(this.state) return false;
        const tmp_x: number = bird.center.x - this.center.x;
        if(tmp_x > this.width/2+bird.width/2){
            // console.log("You have 1 score");
            this.state = 1;
            return true;
        }
        return false;
    }
}