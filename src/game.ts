import { Background } from "./background";
import { Bird } from "./bird";
import { Pipe } from "./pipe";
class Game {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D | null;
    scoreDisplay: HTMLObjectElement | null;
    highScoreDisplay: HTMLObjectElement | null;
    startButton: HTMLObjectElement | null;
    state: string;
    background: Background = new Background();
    bird: Bird = new Bird({x:100,y:288});
    pipes: Pipe[] = [];
    intervalId: any;
    // animationFrameId: number;
    gameOver: boolean;
    score: number = 0;
    highScore: number = 0;
    gameOverImage: HTMLImageElement = new Image();
    constructor() {
        this.canvas = document.getElementById("mycanvas") as HTMLCanvasElement;
        this.ctx = this.canvas.getContext('2d');
        this.canvas.height = 576;
        this.canvas.width = 1024;
        this.scoreDisplay = document.getElementById("score") as HTMLObjectElement;
        this.startButton = document.getElementById("restart") as HTMLObjectElement;
        this.highScoreDisplay = document.getElementById("highscore") as HTMLObjectElement;
        if(this.startButton){
            this.startButton.onclick = () =>{
                if(this.gameOver) this.initial();
            }
        }
        this.gameOverImage.src = "../assets/images/gameover.png";
        this.gameOverImage.onload = () => {
            this.gameOverImage.width = 450;
            this.gameOverImage.height = 100;
        }
        requestAnimationFrame(() => this.run());
        this.intervalId = setInterval(() => this.spawnPipe(),1000);
    }
    run(): void{
        if(this.bird.pos.y + this.bird.height >= 576) this.gameOver = true;
        if(this.gameOver){
            clearInterval(this.intervalId);
            this.drawGameOver();
            return;
        }
        this.bird.update();
        this.background.update();
        let numberOfPipeLost = 0;
        this.pipes.map((pipe) => {
            pipe.update();
            if(pipe.checkScore(this.bird)) this.score++;
            if(pipe.checkCollide(this.bird)){
                // cancelAnimationFrame(this.animationFrameId);
                this.gameOver = true;
            }
            if(pipe.width+pipe.pos.x < 0) numberOfPipeLost+=1;
        });
        if(numberOfPipeLost > 0){
            this.pipes = this.pipes.slice(numberOfPipeLost,this.pipes.length);
        }
        if(this.ctx){
            this.background.draw(this.ctx);
            this.bird.draw(this.ctx);
            this.pipes.map((pipe) => {
                if(this.ctx) pipe.draw(this.ctx);
            });
        }
        // console.log(this.pipes.length);
        if(this.scoreDisplay){
            this.scoreDisplay.innerHTML = this.score.toString();
        }
        requestAnimationFrame(() => this.run());
    }
    spawnPipe(): void{
        const types: string[] = ["up","down"];
        const type: string = types[Math.floor(Math.random()*types.length)];
        const height:number = Math.floor(Math.random() * 100)+100;
        if(type == "up") this.pipes.push(new Pipe(type,{x:1024,y:576-height},height));
        else this.pipes.push(new Pipe(type,{x:1024,y:0},height));
    }
    initial(): void{
        this.highScore = Math.max(this.highScore,this.score);
        if(this.highScoreDisplay) this.highScoreDisplay.innerHTML = this.highScore.toString();
        this.pipes = [];
        this.bird.pos.y = 288;
        this.bird.speed = 0;
        this.intervalId = setInterval(() => this.spawnPipe(),800);
        this.score = 0;
        this.gameOver = false;
        requestAnimationFrame(() => this.run());
    }
    drawGameOver(): void{
        if(this.ctx){
            this.ctx.drawImage(
                this.gameOverImage,
                this.canvas.width/2-this.gameOverImage.width/2,
                this.canvas.height/2-this.gameOverImage.height/2,
                this.gameOverImage.width,
                this.gameOverImage.height
            );
        }
    }
}

new Game()
