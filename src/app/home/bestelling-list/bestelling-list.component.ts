import { Component, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Bestelling } from 'src/app/interfaces/bestelling';
import { BestellingService } from 'src/app/services/bestelling.service';

@Component({
  selector: 'app-bestelling-list',
  templateUrl: './bestelling-list.component.html',
  styleUrls: ['./bestelling-list.component.scss'],
})
export class BestellingListComponent implements OnInit {
  bestellingen: Bestelling[] = [];
  isLoading: boolean = true;

  constructor(
    private bestellingService: BestellingService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.bestellingService.getBestellingen().subscribe((result) => {
      this.bestellingen = result;
      console.log(this.bestellingen);
      this.bestellingen.forEach((bestelling) => {
        bestelling.totaalprijs = 0;
        bestelling.gerechten.forEach((gerecht) => {
          console.log(gerecht.prijs);
          bestelling.totaalprijs! += gerecht.prijs;
        });
        this.isLoading = false;
      });
    });
  }

  toDetail(bestelNummer: string) {
    return this.router.navigateByUrl('/bestelling/' + bestelNummer);
  }

  nieuweBestelling() {
    return this.router.navigateByUrl('/addBestelling', {
      state: { mode: 'add' },
    });
  }

  deleteBestelling(bestelling: Bestelling) {
    this.bestellingService
      .deleteBestelling(bestelling.bestelNummer)
      .subscribe((result) => {
        console.log('deleted');
        console.log(result);
        var index = this.bestellingen.findIndex(x => x.bestelNummer === bestelling.bestelNummer);
        this.bestellingen.splice(index, 1)
      });
  }
}
