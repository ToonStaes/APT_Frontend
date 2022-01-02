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

  constructor(private personeelService: PersoneelService) { }

  ngOnInit(): void {
    this.personeelService.getPersoneel().subscribe(result => {
      this.personeel = result;
    })
    this.personeelService.getZaalPersoneel().subscribe((result) => {
      this.zaalPersoneel = result;
    });
    this.personeelService.getKeukenPersoneel().subscribe((result) => {
      this.keukenPersoneel = result;
    });
  }

  toggleShowPersoneel() {

  }

}
