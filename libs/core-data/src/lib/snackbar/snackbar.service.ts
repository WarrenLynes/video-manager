import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';

@Injectable({providedIn: 'root'})
export class SnackbarService {

  snackbarRefs: MatSnackBarRef<SimpleSnackBar>[] = [];

  constructor(private _snackBar: MatSnackBar) {}

  openSnackBar(data: string, duration=1500) {
    this.snackbarRefs.push(this._snackBar.open(data, null, { duration }));
  }
}
