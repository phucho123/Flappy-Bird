import { CANVAS_HEIGHT, DELTA_TIME } from './setting'
export class Bird {
    private pos: { x: number; y: number }
    private gravity: number
    private image: HTMLImageElement = new Image()
    private speed: number
    private center: { x: number; y: number }
    private height: number
    private width: number
    private angle = 0
    private frame = 0
    private maxframe = 3
    private originWidth: number
    private originHeight: number
    private animationTime = 0
    public constructor(pos: { x: number; y: number }) {
        this.pos = pos
        this.gravity = 0.08
        this.speed = 0
        this.height = 40
        this.width = 56
        this.image.src = '../assets/images/yellowbird-animate.png'
        this.image.onload = () => {
            this.originWidth = this.image.width
            this.originHeight = this.image.height
        }
        this.center = { x: this.pos.x + this.width / 2, y: this.pos.y + this.height / 2 }
    }
    public draw(ctx: CanvasRenderingContext2D): void {
        ctx.save()
        ctx.translate(this.center.x, this.center.y)
        ctx.rotate(this.angle)
        ctx?.drawImage(
            this.image,
            (this.frame * this.originWidth) / this.maxframe,
            0,
            this.originWidth / this.maxframe,
            this.originHeight,
            -this.width / 2,
            -this.height / 2,
            this.width,
            this.height
        )
        ctx.restore()
    }
    public update(deltaTime: number): void {
        this.animationTime += (1 * deltaTime) / DELTA_TIME
        if (this.animationTime >= 20) {
            this.animationTime = 0
            this.frame = (this.frame + 1) % this.maxframe
        }
        this.angle = Math.min(this.angle + (Math.PI * deltaTime) / (DELTA_TIME * 200), Math.PI / 3)
        this.speed += (this.gravity * deltaTime) / DELTA_TIME
        this.pos.y += (this.speed * deltaTime) / DELTA_TIME
        if (this.pos.y < 0) this.pos.y = 0
        if (this.pos.y + this.height >= 576) this.pos.y = 576 - this.height
        this.center.y = this.pos.y + this.height / 2
    }
    public checkTouchGround(): boolean {
        return this.pos.y + this.height >= CANVAS_HEIGHT
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
    public getCenter(): { x: number; y: number } {
        return this.center
    }
    public getPos(): { x: number; y: number } {
        return this.pos
    }
    public setPos(pos: { x: number; y: number }): void {
        this.pos.x = pos.x
        this.pos.y = pos.y
    }
    public setX(x: number) {
        this.pos.x = x
    }
    public setY(y: number) {
        this.pos.y = y
    }
    public setSpeed(speed: number) {
        this.speed = speed
    }
    public getSpeed(): number {
        return this.speed
    }
    public setAngle(angle: number): void {
        this.angle = angle
    }
}
