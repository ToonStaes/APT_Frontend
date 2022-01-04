import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './home/home.component';
import { GerechtListComponent } from './gerecht-list/gerecht-list.component';
import { PersoneelListComponent } from './personeel-list/personeel-list.component';
import { BestellingListComponent } from './bestelling-list/bestelling-list.component';
import { BestellingDetailComponent } from './bestelling-detail/bestelling-detail.component';
import { BestellingFormComponent } from './bestelling-form/bestelling-form.component';

@NgModule({
  declarations: [
    HomeComponent,
    GerechtListComponent,
    PersoneelListComponent,
    BestellingListComponent,
    BestellingDetailComponent,
    BestellingFormComponent
  ],
  imports: [
    SharedModule,
  ]
})
export class HomeModule { }
