import { Component } from '@angular/core';
import { inject } from '@angular/core';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'ringoffire';

    item$: Observable<any>;
    // Observable ist ein Objekt, daß sich regelmäßig aktualisiert, wenn die Daten geändert werden (d.h. die Daten in der DB)
    // Das $ ist ein Zeichen dafür, daß es sich bei der Variablen um ein Observable handelt (ist aber nicht Pflicht)
    firestore: Firestore = inject(Firestore);
    // Hier wird die Funktionalität von Firestore der Variablen firestore zugeordnet
    // Kann auch im constructor per: constructor(firestore: Firestore) {...} gemacht werden. In der github-Readme von Firestore aber auf die obige Weise gemacht.

    constructor() {
        const itemCollection = collection(this.firestore, 'todos');
        // Hier holen wir aus dem Firestore die Collection mit dem Namen 'todos'
        this.item$ = collectionData(itemCollection);
    }
}
