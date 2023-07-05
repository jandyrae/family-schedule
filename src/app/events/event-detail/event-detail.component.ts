import { Component, Input } from '@angular/core';
import { Event } from '../event.model';


@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.css']
})
export class EventDetailComponent {
  @Input() event: Event;

  constructor(){}
  ngOnInit(){

  }
  onDelete() {}
}
