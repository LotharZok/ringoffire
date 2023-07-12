import { Component, OnInit } from '@angular/core';
import { Game } from 'src/models/game';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';

@Component({
    selector: 'app-game',
    templateUrl: './game.component.html',
    styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
    pickCardAnimation: boolean = false;
    currentCard: string = '';
    game: Game = new Game();  // auch möglich: Explizite Zuweisung des Typs mit -> game!: Game;

    constructor(public dialog: MatDialog) {}

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
            
            // console.log('neue Karte:', this.currentCard);
            // console.log('game-Array', this.game);
            
            setTimeout(() => {
                this.game.playedCards.push(this.currentCard);
                // Auch hier hätte es einen Fehler gegeben, wenn currentCard ein undefined hätte sein können. Durch die Zeile oben (as string) wird das verhindert.
                this.pickCardAnimation = false;
                
                this.game.currentPlayer++;
                this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;  // nächsten Spieler anzeigen
                // console.log('currentPlayer:', this.game.currentPlayer);
            }, 1000);
        }
        
    }

    openDialog(): void {
        const dialogRef = this.dialog.open(DialogAddPlayerComponent);
    
        dialogRef.afterClosed().subscribe(result => {
            // console.log('The dialog was closed', result);
            if (result && result.length > 0) {
                this.game.players.push(result);
            }
            
        });
    }

}
