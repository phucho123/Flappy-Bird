import { Bird } from './Bird'
import { DELTA_TIME } from './setting'
export class Coin {
    private pos: Position
    private frame = 0
    private maxFrame = 10
    private height = 50
    private width = 50
    private image: HTMLImageElement = new Image()
    private animationTime = 0
    private center: Position
    private state = false

    public constructor(pos: Position) {
        this.pos = pos
        this.image.src = '../assets/images/coin-animation.png'
        this.center = { x: this.pos.x + this.width / 2, y: this.pos.y + this.height / 2 }
    }

    public draw(ctx: CanvasRenderingContext2D): void {
        if (this.state) return
        ctx.drawImage(
            this.image,
            (this.frame * this.image.width) / this.maxFrame,
            0,
            this.image.width / this.maxFrame,
            this.image.height,
            this.pos.x,
            this.pos.y,
            this.width,
            this.height
        )
    }

    public update(deltaTime: number) {
        this.animate(deltaTime)
        this.pos.x -= (3 * deltaTime) / DELTA_TIME
        this.center.x -= (3 * deltaTime) / DELTA_TIME
    }

    public animate(deltaTime: number) {
        this.animationTime += (1 * deltaTime) / DELTA_TIME
        if (this.animationTime >= 10) {
            this.animationTime = 0
            this.frame = (this.frame + 1) % this.maxFrame
        }
    }

    public collide(bird: Bird) {
        if (this.state) return false
        const tmp_x: number = Math.abs(this.center.x - bird.getCenter().x)
        const tmp_y: number = Math.abs(this.center.y - bird.getCenter().y)
        if (
            tmp_x <= this.width / 2 + bird.getWidth() / 2 &&
            tmp_y <= this.height / 2 + bird.getHeight() / 2
        ) {
            return true
        }
        return false
    }

    public updateCenter(): void {
        this.center = { x: this.pos.x + this.width / 2, y: this.pos.y + this.height / 2 }
    }

    public getWidth(): number {
        return this.width
    }

    public getHeight(): number {
        return this.height
    }

    public getCenter(): Position {
        return this.center
    }

    public getPos(): Position {
        return this.pos
    }

    public setPos(pos: Position): void {
        this.pos.x = pos.x
        this.pos.y = pos.y
    }

    public setState(state: boolean): void {
        this.state = state
    }

    public setX(x: number) {
        this.pos.x = x
    }

    public setY(y: number) {
        this.pos.y = y
    }
}
