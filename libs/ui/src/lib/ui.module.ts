import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '@video-manager/material';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { ListComponent } from './list/list.component';
import { FormComponent } from './form/form.component';
import { FileUploadComponent } from './file-upload/file-upload.component';

@NgModule({
  imports: [MaterialModule, CommonModule, RouterModule],
  declarations: [
    LoginComponent,
    NotFoundComponent,
    ToolbarComponent,
    ListComponent,
    FormComponent,
    FileUploadComponent
  ],
  exports: [
    LoginComponent,
    NotFoundComponent,
    ToolbarComponent,
    ListComponent,
    FormComponent
  ]
})
export class UiModule {}
