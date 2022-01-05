import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Bestelling } from 'src/app/interfaces/bestelling';
import { Gerecht } from 'src/app/interfaces/gerecht';
import { Personeel } from 'src/app/interfaces/personeel';
import { PostBestelling } from 'src/app/interfaces/postBestelling';
import { BestellingService } from 'src/app/services/bestelling.service';
import { GerechtService } from 'src/app/services/gerecht.service';
import { PersoneelService } from 'src/app/services/personeel.service';

@Component({
  selector: 'app-bestelling-form',
  templateUrl: './bestelling-form.component.html',
  styleUrls: ['./bestelling-form.component.scss'],
})
export class BestellingFormComponent implements OnInit {
  isAdd: boolean = false;
  isEdit: boolean = false;
  bestelNummer: string = '';
  bestellingGerechtNummers: string[] = [];
  gerechten: Gerecht[] = [];
  personeel: Personeel[] = [];
  postBestelling: PostBestelling = {
    bestelNummer: '',
    personeelsNummer: '',
    gerechten: [],
  };
  initDone: boolean = false;
  constDone: boolean = false;

  isSubmitted: boolean = false;
  errorMessage: string = '';

  bestelling$: Subscription = new Subscription();
  postBestelling$: Subscription = new Subscription();
  putBestelling$: Subscription = new Subscription();

  // Reactive form
  bestellingForm = new FormGroup({
    personeelsnummer: new FormControl(''),
  });

  constructor(
    private router: Router,
    private bestellingService: BestellingService,
    private personeelService: PersoneelService,
    private gerechtService: GerechtService
  ) {
    this.constDone = false;
    this.isAdd =
      this.router.getCurrentNavigation()?.extras.state?.mode !== 'edit';
    this.isEdit =
      this.router.getCurrentNavigation()?.extras.state?.mode === 'edit';
    this.bestelNummer =
      this.router.getCurrentNavigation()?.extras.state?.bestelNummer;

    if (this.isAdd) {
      this.constDone = true;
    }
    if (this.bestelNummer != null && this.bestelNummer != '') {
      // only entered if edit
      this.bestelling$ = this.bestellingService
        .getBestellingByBestelNummer(this.bestelNummer)
        .subscribe((result) => {
          this.bestellingForm.setValue({
            personeelsnummer: result.personeelslid.personeelsnummer,
          });
        });
    }
  }

  ngOnInit(): void {
    this.initDone = false;
    this.gerechtService.getGerechten().subscribe((result) => {
      this.gerechten = result;
    });
    this.personeelService.getZaalPersoneel().subscribe((result) => {
      this.personeel = result;
      this.initDone = true;
    });
  }

  ngOnDestroy(): void {
    this.bestelling$.unsubscribe();
    this.putBestelling$.unsubscribe();
    this.postBestelling$.unsubscribe();
  }

  submit(): void {
    this.isSubmitted = true;
    if (this.isAdd) {
      console.log(this.bestellingForm.value.personeelsnummer)
      this.postBestelling.personeelsNummer = this.bestellingForm.value.personeelsnummer;
      this.postBestelling.gerechten = this.bestellingGerechtNummers;
      console.log(this.postBestelling)
      this.postBestelling$ = this.bestellingService
        .postBestelling(this.postBestelling)
        .subscribe((result) => {
          console.log(result);
        });
    }
  }

  ToggleInBestelling(gerechtNummer: string) {
    if (this.bestellingGerechtNummers.includes(gerechtNummer)) {
      let index = this.bestellingGerechtNummers.indexOf(gerechtNummer);
      this.bestellingGerechtNummers.splice(index, 1);
    } else {
      this.bestellingGerechtNummers.push(gerechtNummer);
    }
  }
}
