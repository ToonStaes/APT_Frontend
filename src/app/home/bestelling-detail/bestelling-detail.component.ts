import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Bestelling } from 'src/app/interfaces/bestelling';
import { Personeel } from 'src/app/interfaces/personeel';
import { BestellingService } from 'src/app/services/bestelling.service';

@Component({
  selector: 'app-bestelling-detail',
  templateUrl: './bestelling-detail.component.html',
  styleUrls: ['./bestelling-detail.component.scss']
})
export class BestellingDetailComponent implements OnInit {
  bestellingen: Bestelling[] = [];
  bestelling: Bestelling = {_id: '', bestelNummer: '', personeelslid: {} as Personeel, gerechten: [], totaalprijs: 0}

  constructor(private bestellingService: BestellingService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    // Get bestelNummer from URL
    const bestelNummer = this.route.snapshot.paramMap.get('bestelNummer');

    if (bestelNummer != null && bestelNummer !== '') {
      this.bestellingService
        .getBestellingByBestelNummer(bestelNummer)
        .subscribe((result) => {
          this.bestellingen = result;
          this.bestelling = this.bestellingen[0]
          console.log(this.bestelling)
          console.log(this.bestelling.gerechten);
          this.bestelling.totaalprijs = 0;
          this.bestelling.gerechten.forEach(gerecht => {
            this.bestelling.totaalprijs! += gerecht.prijs;
            console.log(this.bestelling.totaalprijs);
          });
        });
    }
  }

}
