import { GameManager } from './GameManager'

class Game {
    private gameManager: GameManager
    public constructor() {
        this.gameManager = new GameManager()
        this.gameManager.handleClickInput()
        this.gameManager.handleKeyInput()
        requestAnimationFrame(() => this.gameManager.run())
    }
}

new Game()
