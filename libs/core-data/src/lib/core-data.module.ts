import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SnackbarComponent } from './snackbar/snackbar.component';

@NgModule({
  declarations: [SnackbarComponent],
  imports: [ CommonModule, HttpClientModule ],
  entryComponents: [SnackbarComponent],
})
export class CoreDataModule {}
