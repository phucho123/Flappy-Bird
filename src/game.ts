import { Background } from "./background";
import { Bird } from "./bird";
import { Pipe } from "./pipe";
import { Audio } from "./audio";
import { Coin } from "./coin";


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
    coins: Coin[] = [];
    timeToSpawnPipe: number = 0;
    // timeToSpawnCoin: number = 0;
    // intervalId: any;
    // animationFrameId: number;
    gameOver: boolean;
    score: number = 0;
    highScore: number = 0;
    gameOverImage: HTMLImageElement = new Image();
    message: HTMLImageElement = new Image();
    gameInitial: boolean = true;
    audios: Audio = new Audio();
    public constructor() {
        this.canvas = document.getElementById("mycanvas") as HTMLCanvasElement;
        this.ctx = this.canvas.getContext('2d');
        this.canvas.height = 576;
        this.canvas.width = 1024;
        this.scoreDisplay = document.getElementById("score") as HTMLObjectElement;
        this.startButton = document.getElementById("restart") as HTMLObjectElement;
        this.highScoreDisplay = document.getElementById("highscore") as HTMLObjectElement;
        this.message.src = "../assets/images/message.png";
        if(this.startButton){
            this.startButton.onclick = () =>{
                if(this.gameInitial){
                    this.gameInitial = false;
                    // this.intervalId = setInterval(() => this.spawnPipe(),1000);
                }
                if(this.gameOver) this.initial();
            }
        }
        this.gameOverImage.src = "../assets/images/gameover.png";
        this.gameOverImage.onload = () => {
            this.gameOverImage.width = 450;
            this.gameOverImage.height = 100;
        }
        this.message.onload = () => {
            this.message.width = 385;
            this.message.height = 550;
        }
        // this.animationFrameId = requestAnimationFrame(() => this.run());
        requestAnimationFrame(() => this.run());
        this.canvas.addEventListener("click",() => {
            if(!this.gameOver){
                this.audios.wing.play();
                this.bird.speed = -4;
                this.bird.angle = -Math.PI/3;
            }
        });
        window.addEventListener("keypress",(e) =>{
            if(e.key == " " && !this.gameOver){
                this.audios.wing.play();
                this.bird.speed = -4;
                this.bird.angle = -Math.PI/3;
            }
        });
    }
    public run(): void{
        console.log(this.coins.length);
        if(this.gameInitial){
            this.background.update();
            this.background.draw(this.ctx);
            this.drawMessage();
        }else{
            if(this.bird.pos.y + this.bird.height >= this.canvas.height){
                if(!this.gameOver){
                    this.audios.hit.play();
                    this.audios.die.play();
                }
                this.gameOver = true;
            }
            if(this.gameOver){
                this.bird.update();
                if(this.ctx){
                    this.background.draw(this.ctx);
                    this.pipes.map((pipe) => {
                        if(this.ctx) pipe.draw(this.ctx);
                    });
                    this.coins.map(coin => {
                        if(this.ctx){
                            coin.animate();
                            coin.draw(this.ctx);
                        }
                    })
                    this.bird.draw(this.ctx);
                }
                // cancelAnimationFrame(this.animationFrameId);
                // clearInterval(this.intervalId);
                this.drawGameOver();
                // return;
            }
            else{
                this.timeToSpawnPipe++;
                // this.timeToSpawnCoin++;
                if(this.timeToSpawnPipe >= 150){
                    this.timeToSpawnPipe = 0;
                    this.spawnPipe();
                }
                // if(this.timeToSpawnCoin >= 237){
                //     this.timeToSpawnCoin = 0;
                //     this.spawnCoin();
                // }

                this.bird.update();
                this.background.update();

                let numberOfPipeLost = 0;
                let numOfPipeCross = 0;
                this.pipes.map((pipe) => {
                    pipe.update();
                    if(pipe.checkScore(this.bird)){
                        numOfPipeCross+=0.5;
                    }
                    if(pipe.checkCollide(this.bird)){
                        // cancelAnimationFrame(this.animationFrameId);
                        this.audios.hit.play();
                        this.audios.die.play();
                        this.gameOver = true;
                    }
                    if(pipe.width+pipe.pos.x < 0) numberOfPipeLost+=1;
                });
                if(numOfPipeCross){
                    this.score+=Math.floor(numOfPipeCross);
                    this.audios.point.play();
                }
                if(numberOfPipeLost > 0){
                    this.pipes = this.pipes.slice(numberOfPipeLost,this.pipes.length);
                }

                let numberOfCoinLost = 0;
                this.coins.map((coin) => {
                    coin.update();
                    if(coin.collide(this.bird)){
                        this.score+=10;
                        coin.state = true;
                        this.audios.coin.play();
                    }
                    if(coin.width+coin.pos.x < 0) numberOfCoinLost+=1;
                });
                if(numberOfCoinLost > 0){
                    this.coins = this.coins.slice(numberOfCoinLost,this.coins.length);
                }

                if(this.ctx){
                    this.background.draw(this.ctx);
                    
                    this.coins.map((coin) => {
                        if(this.ctx) coin.draw(this.ctx);
                    })
                    this.pipes.map((pipe) => {
                        if(this.ctx) pipe.draw(this.ctx);
                    });
                    this.bird.draw(this.ctx);
                }
                if(this.scoreDisplay){
                    this.scoreDisplay.innerHTML = this.score.toString();
                }
            }
           
        }
        // this.animationFrameId = requestAnimationFrame(() => this.run());
        requestAnimationFrame(() => this.run());
    }
    public spawnPipe(): void{
        // const types: string[] = ["up","down"];
        const height:number = Math.floor(Math.random() * 200)+120;
        const gap: number = Math.floor(Math.random()*100)+120;
        this.pipes.push(new Pipe("down",{x:this.canvas.width,y:0},height));
        this.pipes.push(
            new Pipe("up",
            {x:this.canvas.width,y:this.canvas.height-(this.canvas.height-height-gap)},
            this.canvas.height-height-gap)
        );
        this.spawnCoin(1024+Math.floor(Math.random()*100)+150);
    }
    public spawnCoin(xpos:number): void{
        const height = Math.floor(Math.random()*350)+100;
        this.coins.push(new Coin({x:xpos,y:height}));
    }
    public initial(): void{
        this.highScore = Math.max(this.highScore,this.score);
        if(this.highScoreDisplay) this.highScoreDisplay.innerHTML = this.highScore.toString();
        this.pipes = [];
        this.coins = [];
        // this.timeToSpawnCoin = 0;
        this.timeToSpawnPipe = 0;
        this.bird.pos.y = 288;
        this.bird.speed = 0;
        // this.intervalId = setInterval(() => this.spawnPipe(),800);
        this.score = 0;
        this.gameOver = false;
        // requestAnimationFrame(() => this.run());
    }
    public drawGameOver(): void{
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
    public drawMessage(): void{
        if(this.ctx){
            this.ctx.drawImage(
                this.message,
                this.canvas.width/2-this.message.width/2,
                this.canvas.height/2-this.message.height/2,
                this.message.width,
                this.message.height
            );
        }
    }
}

new Game();
