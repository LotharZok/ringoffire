import { Component, OnInit } from '@angular/core';
import { Game } from 'src/models/game';

@Component({
    selector: 'app-game',
    templateUrl: './game.component.html',
    styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
    pickCardAnimation = false;
    game: Game = new Game();  // auch möglich: Explizite Zuweisung des Typs mit -> game!: Game;

    constructor() {}

    ngOnInit(): void {
        // this.newGame();
        console.log(this.game);
    }

    newGame() {
        this.game = new Game();
        console.log(this.game);
    }

    pickCard() {
        this.pickCardAnimation = true;
    }
}
