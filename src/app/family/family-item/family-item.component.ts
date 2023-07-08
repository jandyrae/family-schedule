import { Component, Input, Output } from '@angular/core';
import { Family } from '../family.model';
import { FamilyService } from '../family.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-family-item',
  templateUrl: './family-item.component.html',
  styleUrls: ['./family-item.component.css'],
})
export class FamilyItemComponent {
  @Input() family: Family;
  @Input() id: string;
  @Output() familySelected = new Subject<void>();
  constructor(private familyService: FamilyService) {}
  onSelected() {
    this.familySelected.next();
  }
}
