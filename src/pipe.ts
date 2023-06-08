import { Bird } from './Bird'
import { DELTA_TIME } from './setting'

export class Pipe {
    private type: string
    private pos: Position
    private height: number
    private width: number
    private image: HTMLImageElement = new Image()
    private center: Position
    private state = false
    public constructor(type: string, pos: Position, height: number) {
        this.type = type
        this.height = height
        this.width = 70
        this.pos = pos
        if (this.type == 'up') this.image.src = '../assets/images/up-pipe.png'
        else this.image.src = '../assets/images/down-pipe.png'

        this.center = { x: this.pos.x + this.width / 2, y: this.pos.y + this.height / 2 }
    }
    public draw(ctx: CanvasRenderingContext2D): void {
        if (this.type == 'down') {
            const height = (this.image.height / this.image.width) * this.width
            if (height > this.height) {
                ctx?.drawImage(
                    this.image,
                    this.pos.x,
                    this.pos.y - (height - this.height),
                    this.width,
                    height
                )
            } else {
                ctx?.drawImage(this.image, this.pos.x, this.pos.y, this.width, height)
            }
        } else {
            const height = (this.image.height / this.image.width) * this.width
            ctx?.drawImage(this.image, this.pos.x, this.pos.y, this.width, height)
        }
    }
    public update(deltaTime: number): void {
        this.pos.x -= (3 * deltaTime) / DELTA_TIME
        this.center.x -= (3 * deltaTime) / DELTA_TIME
    }
    public checkCollide(bird: Bird): boolean {
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
    public checkScore(bird: Bird): boolean {
        if (this.state) return false
        const tmp_x: number = bird.getCenter().x - this.center.x
        if (tmp_x > this.width / 2 + bird.getWidth() / 2) {
            this.state = true
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
    public setHeight(height: number): void {
        this.height = height
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
