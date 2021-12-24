import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { ControlMessagesComponent } from './errorMsg';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ImageUploadComponent } from './image-upload/image-upload.component';
import { ImageDragDirective } from './image-drag.directive';
import { FormComponent } from './form/form.component';

@NgModule({
  declarations: [AppComponent, ControlMessagesComponent, ImageUploadComponent, ImageDragDirective, FormComponent],
  imports: [BrowserModule, ReactiveFormsModule ,AppRoutingModule, RouterModule, NgbModule, FormsModule, DragDropModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
