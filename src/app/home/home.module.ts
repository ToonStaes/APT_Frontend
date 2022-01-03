import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './home/home.component';
import { GerechtListComponent } from './gerecht-list/gerecht-list.component';
import { PersoneelListComponent } from './personeel-list/personeel-list.component';
import { BestellingListComponent } from './bestelling-list/bestelling-list.component';
import { BestellingDetailComponent } from './bestelling-detail/bestelling-detail.component';

@NgModule({
  declarations: [
    HomeComponent,
    GerechtListComponent,
    PersoneelListComponent,
    BestellingListComponent,
    BestellingDetailComponent
  ],
  imports: [
    SharedModule,
  ]
})
export class HomeModule { }
