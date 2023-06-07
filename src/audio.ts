export class Audio{
    hit: HTMLAudioElement;
    wing: HTMLAudioElement;
    die: HTMLAudioElement;
    point: HTMLAudioElement;
    coin: HTMLAudioElement;
    public constructor(){
        this.hit = document.getElementById("hit-audio") as HTMLAudioElement;
        this.wing = document.getElementById("wing-audio") as HTMLAudioElement;
        this.die = document.getElementById("die-audio") as HTMLAudioElement;
        this.point = document.getElementById("point-audio") as HTMLAudioElement;
        this.coin = document.getElementById("coin-audio") as HTMLAudioElement;
        // this.hit.playbackRate = 1;
        this.wing.playbackRate = 1.5;
        // this.die.playbackRate = 1;
        this.point.playbackRate = 2;
        this.coin.playbackRate = 2;
    }
}