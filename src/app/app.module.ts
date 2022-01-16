import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { ControlMessagesComponent } from './errorMsg';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ImageUploadComponent } from './image-upload/image-upload.component';
import { ImageDragDirective } from './image-drag.directive';
import { FormComponent } from './form/form.component';
import { TableComponent } from './table/table.component';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatSortModule } from '@angular/material/sort';
import { MatMenuModule} from '@angular/material/menu';
import { MatRadioModule} from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AssortmentOrderComponent } from './assortment-order/assortment-order.component';
import { MatSlideToggleModule} from '@angular/material/slide-toggle';
import { MatChipsModule} from '@angular/material/chips';
import { MapComponent } from './map/map.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { MatIconModule } from '@angular/material/icon';
// import { PdfViewerModule } from 'ng2-pdf-viewer';
//'AIzaSyB65kN-PlYmAXBEEI2Vj-vgkN70iR9MwBI' API KEY

@NgModule({
  declarations: [ AppComponent, ControlMessagesComponent, ImageUploadComponent, ImageDragDirective, FormComponent, TableComponent, 
  AssortmentOrderComponent, MapComponent ],
  imports: [ BrowserModule, BrowserAnimationsModule, ReactiveFormsModule , AppRoutingModule, RouterModule, 
  NgbModule, FormsModule, DragDropModule, MatTableModule, MatSortModule, MatPaginatorModule, MatFormFieldModule,
  MatMenuModule, MatRadioModule, MatSelectModule, MatInputModule, MatButtonModule, MatSlideToggleModule, MatChipsModule, GoogleMapsModule,
  MatIconModule, ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
