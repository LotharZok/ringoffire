import { Component, OnInit } from '@angular/core';
import { Game } from 'src/models/game';

@Component({
    selector: 'app-game',
    templateUrl: './game.component.html',
    styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
    pickCardAnimation: boolean = false;
    currentCard: string = '';
    game: Game = new Game();  // auch möglich: Explizite Zuweisung des Typs mit -> game!: Game;

    constructor() {}

    ngOnInit(): void {
        // this.newGame();
    }

    newGame() {
        this.game = new Game();
    }

    pickCard() {
        if (!this.pickCardAnimation) {
            this.currentCard = this.game.stack.pop() as string;
            // pop() kann auch ein undefined zurückgeben, was currentCard aber nicht annehmen kann. Deshalb das "as string". So kommt auf jeden Fall ein string zurück.
            this.pickCardAnimation = true;
            
            console.log('neue Karte:', this.currentCard);
            console.log('game-Array', this.game);
            
            setTimeout(() => {
                this.game.playedCards.push(this.currentCard);
                // Auch hier hätte es einen Fehler gegeben, wenn currentCard ein undefined hätte sein können. Durch die Zeile oben (as string) wird das verhindert.
                this.pickCardAnimation = false;
            }, 1000);
        }
        
    }
}
