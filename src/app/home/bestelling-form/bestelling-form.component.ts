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
      this.router.getCurrentNavigation()?.extras.state?.mode === 'add';
    this.isEdit =
      this.router.getCurrentNavigation()?.extras.state?.mode === 'edit';
    this.bestelNummer =
      this.router.getCurrentNavigation()?.extras.state?.bestelNummer;

    if (this.isAdd) {
      this.bestellingForm.setValue({
        personeelsnummer: '0',
      });
      this.constDone = true;
    }
    if (this.bestelNummer != null && this.bestelNummer != '') {
      // only entered if edit
      this.bestelling$ = this.bestellingService
        .getBestellingByBestelNummer(this.bestelNummer)
        .subscribe((result) => {
          console.log('bestelling gevonden');
          console.log(result.personeelslid.personeelsnummer);
          if (result.personeelslid.personeelsnummer[0] === 'K') {
            this.bestellingForm.setValue({
              personeelsnummer: '0',
            });
          } else {
            this.bestellingForm.setValue({
              personeelsnummer: result.personeelslid.personeelsnummer,
            });
          }
          result.gerechten.forEach(gerecht => {
            this.bestellingGerechtNummers.push(gerecht.gerechtNummer)
          })

          this.constDone = true;
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

    console.log(this.bestellingForm.value.personeelsnummer);
  }

  ngOnDestroy(): void {
    this.bestelling$.unsubscribe();
    this.putBestelling$.unsubscribe();
    this.postBestelling$.unsubscribe();
  }

  submit(): void {
    this.isSubmitted = true;
    if (
      this.bestellingForm.value.personeelsnummer === '0' ||
      this.bestellingForm.value.personeelsnummer === null ||
      this.bestellingForm.value.personeelsnummer === ''
    ) {
      alert('Selecteer een personeelslid');
    } else if (this.bestellingGerechtNummers.length === 0) {
      alert('Selecteer gerechten');
    } else {
      if (this.isAdd) {
        this.postBestelling.personeelsNummer = this.bestellingForm.value.personeelsnummer;
        this.postBestelling.gerechten = this.bestellingGerechtNummers;
        this.postBestelling$ = this.bestellingService
          .postBestelling(this.postBestelling)
          .subscribe((result) => {
            this.router.navigateByUrl('/bestelling/' + result.bestelNummer)
          });
      }
      else if (this.isEdit){
        this.postBestelling.personeelsNummer = this.bestellingForm.value.personeelsnummer;;
        this.postBestelling.gerechten = this.bestellingGerechtNummers;
        this.postBestelling.bestelNummer = this.bestelNummer
        console.log(this.postBestelling)
        this.putBestelling$ = this.bestellingService.putBestelling(this.postBestelling).subscribe(result => {
          console.log(result)
          this.router.navigateByUrl('/bestelling/' + result.bestelNummer);
        })
      }
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

  findAmount(gerechtNummer: string) {
    let counter = 0;
    this.bestellingGerechtNummers.forEach((item) => {
      if (item === gerechtNummer) {
        counter++;
      }
    });
    return counter;
  }
}
