import { CANVAS_HEIGHT, CANVAS_WIDTH, DELTA_TIME } from './setting'

export class Background {
    private background1: HTMLImageElement = new Image()
    private background2: HTMLImageElement = new Image()
    private pos: Position

    public constructor() {
        this.background1.src = 'assets/images/background-night.png'
        this.background2.src = 'assets/images/background-night.png'
        this.pos = { x: 0, y: 0 }
        this.background1.onload = () => {
            this.background1.width = CANVAS_WIDTH
            this.background1.height = CANVAS_HEIGHT
        }
        this.background2.onload = () => {
            this.background2.width = CANVAS_WIDTH
            this.background2.height = CANVAS_HEIGHT
        }
    }

    public draw(ctx: CanvasRenderingContext2D | null): void {
        ctx?.drawImage(
            this.background1,
            this.pos.x,
            this.pos.y,
            this.background1.width,
            this.background1.height
        )
        ctx?.drawImage(
            this.background2,
            1024 - Math.abs(this.pos.x),
            this.pos.y,
            this.background2.width,
            this.background2.height
        )
    }

    public update(deltaTime: number): void {
        this.pos.x -= (3 * deltaTime) / DELTA_TIME
        if (this.pos.x <= -1024) this.pos.x = 0
    }
}
