import { GameManager } from './GameManager'

class Game {
    private gameManager: GameManager
    public constructor() {
        this.gameManager = new GameManager()
    }
}

new Game()
