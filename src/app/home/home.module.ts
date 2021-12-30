import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './home/home.component';
import { GerechtListComponent } from './gerecht-list/gerecht-list.component';
import { PersoneelListComponent } from './personeel-list/personeel-list.component';

@NgModule({
  declarations: [
    HomeComponent,
    GerechtListComponent,
    PersoneelListComponent
  ],
  imports: [
    SharedModule,
  ]
})
export class HomeModule { }
