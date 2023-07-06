import { Component, Input, Output } from '@angular/core';
import { Event } from '../event.model';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-event-item',
  templateUrl: './event-item.component.html',
  styleUrls: ['./event-item.component.css']
})
export class EventItemComponent {
  @Input() event:Event;
  @Input() id:number;
  @Output() eventSelected = new Subject<void>();

  onSelected() {
    this.eventSelected.next();
  }
}
