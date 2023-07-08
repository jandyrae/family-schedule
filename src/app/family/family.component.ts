import { Component, OnInit } from '@angular/core';
import { Family } from './family.model';
import { FamilyService } from './family.service';

@Component({
  selector: 'app-family',
  templateUrl: './family.component.html',
  styleUrls: ['./family.component.css']
})
export class FamilyComponent implements OnInit {
selectedFamily: Family;

constructor(private familyService: FamilyService) { }

ngOnInit(): void {
  this.familyService.familySelected.subscribe((family: Family) => {
    this.selectedFamily = family;
  });
}
}
