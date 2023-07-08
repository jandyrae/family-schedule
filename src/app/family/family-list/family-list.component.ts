import { Component } from '@angular/core';
import { Family } from '../family.model';

@Component({
  selector: 'app-family-list',
  templateUrl: './family-list.component.html',
  styleUrls: ['./family-list.component.css']
})
export class FamilyListComponent {
families: Family[] = [];


onNewFamily()
{}
}
