import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BestellingDetailComponent } from './home/bestelling-detail/bestelling-detail.component';
import { BestellingFormComponent } from './home/bestelling-form/bestelling-form.component';
import { BestellingListComponent } from './home/bestelling-list/bestelling-list.component';
import { HomeComponent } from './home/home/home.component';
import { PersoneelListComponent } from './home/personeel-list/personeel-list.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'personeel', component: PersoneelListComponent },
  { path: 'bestellingen', component: BestellingListComponent },
  { path: 'bestelling/:bestelNummer', component: BestellingDetailComponent },
  { path: 'addBestelling', component: BestellingFormComponent },
  { path: 'editBestelling', component: BestellingFormComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
