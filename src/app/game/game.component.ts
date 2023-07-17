import { Component, OnInit, inject } from '@angular/core';
import { Game } from 'src/models/game';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { Firestore, addDoc, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-game',
    templateUrl: './game.component.html',
    styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
    pickCardAnimation: boolean = false;
    currentCard: string = '';
    game: Game = new Game();  // auch möglich: Explizite Zuweisung des Typs mit -> game!: Game;

    firestore: Firestore = inject(Firestore);
    games$: Observable<any>;
    gamesCollection = collection(this.firestore, 'games');
    // Hier holen wir aus dem Firestore die Collection mit dem Namen 'games'

    constructor(private route: ActivatedRoute, public dialog: MatDialog) {
    }

    ngOnInit(): void {
        // this.newGame();

        this.route.params.subscribe( (params) => {
            // So kann ich auf Parameter zugreifen, die in der Adresse der Seite angegeben sind
            // WICHTIG: Es handelt sich NICHT um Parameter des Typs: &Param=...
            // Sondern um Parameter, die in app-routing.module.ts als Parameter im path angegeben sind. Hier: /:id
            console.log(params);
        })

        this.games$ = collectionData(this.gamesCollection);
        // Hier holen wir aus dem Firestore die Collection mit dem Namen 'gamesCollection' (s.o.)

        // Jetzt die Daten/Änderungen abonnieren:
        this.games$.subscribe(
            (game) => {
                // Wird immer (!!) automatisch ausgeführt, wenn eine Aktualisierung erfolgt
                // Auf diese Weise können z.B. Benachrichtigungen erfolgen, ähnlich wie in Chat-Apps, die eine Benachrichtigung bei neuen Nachrichten ausgeben.
                console.log('Game update', game);
            }
        )
    }

    newGame() {
        this.game = new Game();

        // let gameID = 
        addDoc(this.gamesCollection, this.game.toJson());
        // console.log('ID: ', gameID);
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
