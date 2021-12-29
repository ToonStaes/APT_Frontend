import { Component, OnInit } from '@angular/core';
import { Gerecht } from 'src/app/interfaces/gerecht';
import { GerechtService } from 'src/app/services/gerecht.service';

@Component({
  selector: 'app-gerecht-list',
  templateUrl: './gerecht-list.component.html',
  styleUrls: ['./gerecht-list.component.scss']
})
export class GerechtListComponent implements OnInit {
  gerechten: Gerecht[] = [];

  constructor(private gerechtService: GerechtService) { }

  ngOnInit(): void {
    this.gerechtService.getGerechten().subscribe(result => {
      this.gerechten = result;
    })
  }

}
