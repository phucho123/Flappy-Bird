export class Audio {
    private hit: HTMLAudioElement
    private wing: HTMLAudioElement
    private die: HTMLAudioElement
    private point: HTMLAudioElement
    private coin: HTMLAudioElement

    public constructor() {
        this.hit = document.getElementById('hit-audio') as HTMLAudioElement
        this.wing = document.getElementById('wing-audio') as HTMLAudioElement
        this.die = document.getElementById('die-audio') as HTMLAudioElement
        this.point = document.getElementById('point-audio') as HTMLAudioElement
        this.coin = document.getElementById('coin-audio') as HTMLAudioElement
        this.wing.playbackRate = 1.5
        this.point.playbackRate = 2
        this.coin.playbackRate = 2
    }

    public playHitAudio() {
        this.hit.play()
    }

    public playWingAudio() {
        this.wing.play()
    }

    public playDieAudio() {
        this.die.play()
    }

    public playPointAudio() {
        this.point.play()
    }

    public playCoinAudio() {
        this.coin.play()
    }
}
