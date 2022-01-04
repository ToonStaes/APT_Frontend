import { Component, OnInit } from '@angular/core';
import { Personeel } from 'src/app/interfaces/personeel';
import { PersoneelService } from 'src/app/services/personeel.service';

@Component({
  selector: 'app-personeel-list',
  templateUrl: './personeel-list.component.html',
  styleUrls: ['./personeel-list.component.scss']
})
export class PersoneelListComponent implements OnInit {
  personeel: Personeel[] = [];
  keukenPersoneel: Personeel[] = [];
  zaalPersoneel: Personeel[] = [];
  selected: string = 'all'
  isLoading: boolean = true;

  constructor(private personeelService: PersoneelService) { }

  ngOnInit(): void {
    this.isLoading = true
    this.personeelService.getPersoneel().subscribe(result => {
      this.personeel = result;
      this.isLoading = false
    })
    this.personeelService.getZaalPersoneel().subscribe((result) => {
      this.zaalPersoneel = result;
      this.isLoading = false;
    });
    this.personeelService.getKeukenPersoneel().subscribe((result) => {
      this.keukenPersoneel = result;
      this.isLoading = false;
    });
  }

  toggleShowPersoneel() {

  }

}
