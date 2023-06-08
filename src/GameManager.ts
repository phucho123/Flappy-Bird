import { Background } from './Background'
import { Bird } from './Bird'
import { Pipe } from './Pipe'
import { Audio } from './Audio'
import { Coin } from './Coin'
import { CANVAS_HEIGHT, CANVAS_WIDTH, DELTA_TIME } from './setting'

export class GameManager {
    private canvas: HTMLCanvasElement
    private ctx: CanvasRenderingContext2D | null
    private background: Background = new Background()
    private bird: Bird = new Bird({ x: 100, y: 288 })
    private pipes: Pipe[] = []
    private coins: Coin[] = []
    private extraPipes: Pipe[] = []
    private extraCoins: Coin[] = []
    private timeToSpawnPipe = 0
    private gameOver: boolean
    private score = 0
    private highScore = 0
    private gameOverImage: HTMLImageElement = new Image()
    private message: HTMLImageElement = new Image()
    private startButton: HTMLImageElement = new Image()
    private gameInitial = true
    private audios: Audio = new Audio()
    private clock = Date.now()
    private deltaTime = 0

    public constructor() {
        this.canvas = document.getElementById('mycanvas') as HTMLCanvasElement
        this.ctx = this.canvas.getContext('2d')
        this.canvas.height = CANVAS_HEIGHT
        this.canvas.width = CANVAS_WIDTH
        this.message.src = '../assets/images/message.png'
        this.startButton.src = '../assets/images/start-button.png'
        this.gameOverImage.src = '../assets/images/gameover.png'
        this.gameOverImage.onload = () => {
            this.gameOverImage.width = 450
            this.gameOverImage.height = 100
        }
        this.message.onload = () => {
            this.message.width = 385
            this.message.height = 550
        }
    }
    public run(): void {
        const timeNow = Date.now()
        this.deltaTime = timeNow - this.clock
        this.clock = timeNow

        if (this.gameInitial) {
            this.handleGameInitial()
        } else {
            if (this.bird.checkTouchGround()) {
                this.handleBirdTouchGround()
            }
            if (this.gameOver) {
                this.handleGameOver()
            } else {
                this.increaseTimeToSpawnPipes()

                this.bird.update(this.deltaTime)

                this.background.update(this.deltaTime)

                this.updatePipes(this.deltaTime)

                this.updateCoins(this.deltaTime)

                this.drawGame()
            }
        }
        this.drawScore()
        requestAnimationFrame(() => this.run())
    }
    public spawnPipe(): void {
        const height: number = Math.floor(Math.random() * 200) + 120
        const gap: number = Math.floor(Math.random() * 100) + 100
        if (this.extraPipes.length >= 2) {
            const pipe1 = this.extraPipes.shift()
            const pipe2 = this.extraPipes.shift()
            if (pipe1 != undefined && pipe2 != undefined) {
                pipe1.setPos({ x: this.canvas.width, y: 0 })
                pipe1.setHeight(height)
                pipe1.setState(false)
                pipe1.updateCenter()

                pipe2.setPos({
                    x: this.canvas.width,
                    y: this.canvas.height - (this.canvas.height - height - gap),
                })
                pipe2.setHeight(this.canvas.height - height - gap)
                pipe2.setState(false)
                pipe2.updateCenter()

                this.pipes.push(pipe1)
                this.pipes.push(pipe2)
            }
        } else {
            console.log('Create new pipe')
            this.pipes.push(new Pipe('down', { x: this.canvas.width, y: 0 }, height))
            this.pipes.push(
                new Pipe(
                    'up',
                    {
                        x: this.canvas.width,
                        y: this.canvas.height - (this.canvas.height - height - gap),
                    },
                    this.canvas.height - height - gap
                )
            )
        }
        this.spawnCoin(1024 + Math.floor(Math.random() * 100) + 150)
    }

    public spawnCoin(xpos: number): void {
        const height = Math.floor(Math.random() * 350) + 100
        if (this.extraCoins.length > 0) {
            const coin1 = this.extraCoins.shift()
            if (coin1 != undefined) {
                coin1.setState(false)
                coin1.setPos({ x: xpos, y: height })
                coin1.updateCenter()

                this.coins.push(coin1)
            }
        } else {
            console.log('Create new coin')
            this.coins.push(new Coin({ x: xpos, y: height }))
        }
    }

    public initial(): void {
        this.highScore = Math.max(this.highScore, this.score)
        while (this.pipes.length) {
            const pipe = this.pipes.shift()
            if (pipe != undefined) this.extraPipes.push(pipe)
        }
        while (this.coins.length) {
            const coin = this.coins.shift()
            if (coin != undefined) this.extraCoins.push(coin)
        }
        this.timeToSpawnPipe = 0
        this.bird.setY(288)
        this.bird.setSpeed(0)
        this.score = 0
        this.gameOver = false
    }
    public drawGameOver(): void {
        if (this.ctx) {
            this.ctx.drawImage(
                this.gameOverImage,
                this.canvas.width / 2 - this.gameOverImage.width / 2,
                this.canvas.height / 2 - this.gameOverImage.height / 2,
                this.gameOverImage.width,
                this.gameOverImage.height
            )
        }
    }
    public drawMessage(): void {
        if (this.ctx) {
            this.ctx.drawImage(
                this.message,
                this.canvas.width / 2 - this.message.width / 2,
                this.canvas.height / 2 - this.message.height / 2,
                this.message.width,
                this.message.height
            )
        }
    }
    public drawScore(): void {
        if (this.ctx) {
            this.ctx.fillStyle = 'black'
            this.ctx.beginPath()
            this.ctx.font = '30px Audiowide'
            this.ctx.fillText(`High Score: ${this.highScore}`, 10, 50)
            this.ctx.fillText(`Score: ${this.score}`, 10, 100)
        }
    }
    public drawStartButton(): void {
        if (this.ctx) {
            this.ctx.drawImage(this.startButton, 800, 400, 200, 100)
        }
    }
    public drawGame(): void {
        if (this.ctx) {
            this.background.draw(this.ctx)

            this.coins.map((coin) => {
                if (this.ctx) coin.draw(this.ctx)
            })

            this.pipes.map((pipe) => {
                if (this.ctx) pipe.draw(this.ctx)
            })

            this.bird.draw(this.ctx)
        }
    }
    public updateCoins(deltaTime: number): void {
        let numberOfCoinLost = 0
        this.coins.map((coin) => {
            coin.update(deltaTime)
            if (coin.collide(this.bird)) {
                this.score += 10
                coin.setState(true)
                this.audios.playCoinAudio()
            }
            if (coin.getWidth() + coin.getPos().x < 0) numberOfCoinLost += 1
        })

        if (numberOfCoinLost > 0) {
            for (let i = 0; i < numberOfCoinLost; i++) {
                const lostCoin = this.coins.shift()
                if (lostCoin != undefined) this.extraCoins.push(lostCoin)
            }
        }
    }
    public updatePipes(deltaTime: number): void {
        let numberOfPipeLost = 0
        let numOfPipeCross = 0
        this.pipes.map((pipe) => {
            pipe.update(deltaTime)
            if (pipe.checkScore(this.bird)) {
                numOfPipeCross += 0.5
            }
            if (pipe.checkCollide(this.bird)) {
                this.audios.playHitAudio()
                this.audios.playDieAudio()
                this.gameOver = true
            }
            if (pipe.getWidth() + pipe.getPos().x < 0) numberOfPipeLost += 1
        })

        if (numOfPipeCross) {
            this.score += Math.floor(numOfPipeCross)
            this.audios.playPointAudio()
        }

        if (numberOfPipeLost > 0) {
            for (let i = 0; i < numberOfPipeLost; i++) {
                const lostPipe = this.pipes.shift()
                if (lostPipe != undefined) this.extraPipes.push(lostPipe)
            }
        }
    }
    public increaseTimeToSpawnPipes(): void {
        this.timeToSpawnPipe += (1 * this.deltaTime) / DELTA_TIME

        if (this.timeToSpawnPipe >= 150) {
            this.timeToSpawnPipe = 0
            this.spawnPipe()
        }
    }
    public handleGameOver(): void {
        this.bird.update(this.deltaTime)
        if (this.ctx) {
            this.background.draw(this.ctx)
            this.pipes.map((pipe) => {
                if (this.ctx) pipe.draw(this.ctx)
            })
            this.coins.map((coin) => {
                if (this.ctx) {
                    coin.animate(this.deltaTime)
                    coin.draw(this.ctx)
                }
            })
            this.bird.draw(this.ctx)
        }

        this.drawGameOver()
        this.drawStartButton()
    }
    public handleGameInitial(): void {
        this.background.update(this.deltaTime)
        this.background.draw(this.ctx)
        this.drawMessage()
        this.drawStartButton()
    }
    public handleBirdTouchGround(): void {
        if (!this.gameOver) {
            this.audios.playHitAudio()
            this.audios.playDieAudio()
        }
        this.gameOver = true
    }
    public handleClickInput(): void {
        this.canvas.addEventListener('click', (e) => {
            if (!this.gameOver) {
                this.audios.playWingAudio()
                this.bird.setSpeed(-3)
                this.bird.setAngle(-Math.PI / 3)
            }
            const rect = this.canvas.getBoundingClientRect()
            if (
                e.clientX - rect.left >= 800 &&
                e.clientX - rect.left <= 1000 &&
                e.clientY - rect.top >= 400 &&
                e.clientY - rect.top <= 500
            ) {
                if (this.gameOver) {
                    this.audios.playWingAudio()
                    this.initial()
                }
                if (this.gameInitial) {
                    this.audios.playWingAudio()
                    this.gameInitial = false
                }
            }
        })
    }
    public handleKeyInput(): void {
        window.addEventListener('keypress', (e) => {
            if (e.key == ' ' && !this.gameOver) {
                this.audios.playWingAudio()
                this.bird.setSpeed(-3)
                this.bird.setAngle(-Math.PI / 3)
            }
        })
    }
}
