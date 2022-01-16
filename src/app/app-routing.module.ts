import { MapComponent } from './map/map.component';
import { AssortmentOrderComponent } from './assortment-order/assortment-order.component';
import { ImageUploadComponent } from './image-upload/image-upload.component';
import { FormComponent } from './form/form.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { TableComponent } from './table/table.component';

const routes: Routes = [
  {path: "", component: FormComponent},
  {path: "catlog", component: ImageUploadComponent},
  {path: "table", component: TableComponent},
  {path: "assortment", component: AssortmentOrderComponent},
  {path: 'map', component: MapComponent}
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
