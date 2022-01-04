import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Bestelling } from 'src/app/interfaces/bestelling';
import { BestellingService } from 'src/app/services/bestelling.service';

@Component({
  selector: 'app-bestelling-list',
  templateUrl: './bestelling-list.component.html',
  styleUrls: ['./bestelling-list.component.scss']
})
export class BestellingListComponent implements OnInit {
  bestellingen?: Bestelling[]
  isLoading: boolean = true

  constructor(private bestellingService: BestellingService, private router: Router) { }

  ngOnInit(): void {
    this.isLoading = true
    this.bestellingService.getBestellingen().subscribe(result => {
      this.bestellingen = result;
      console.log(this.bestellingen)
      this.bestellingen.forEach(bestelling => {
        bestelling.totaalprijs = 0
        bestelling.gerechten.forEach(gerecht => {
          console.log(gerecht.prijs)
          bestelling.totaalprijs! += gerecht.prijs
        })
        this.isLoading = false
      })
    })
  }

  toDetail(bestelNummer: string) {
    console.log(bestelNummer)
    return this.router.navigateByUrl("/bestelling/" + bestelNummer)
  }

}
