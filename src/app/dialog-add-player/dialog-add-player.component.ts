import { Component, Inject } from '@angular/core';

// import {MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule} from '@angular/material/dialog';
// import {MatButtonModule} from '@angular/material/button';
// import {FormsModule} from '@angular/forms';
// import {MatInputModule} from '@angular/material/input';
// import {MatFormFieldModule} from '@angular/material/form-field';

@Component({
    selector: 'app-dialog-add-player',
    templateUrl: './dialog-add-player.component.html',
    styleUrls: ['./dialog-add-player.component.scss'],

    // imports: [MatDialogModule, MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule],
})
export class DialogAddPlayerComponent {

    // constructor(
    //     public dialogRef: MatDialogRef<DialogAddPlayerComponent>,

    // ) {}

    name: string = '';

    // onNoClick(): void {
    //     this.dialogRef.close();
    // }

    onNoClick() {
        
    }
}
