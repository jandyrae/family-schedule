import { Component } from '@angular/core';
import { EventService } from '../event.service';
import { Event } from '../event.model';
import { ActivatedRoute, Router, Params } from '@angular/router';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css'],
})
export class EventListComponent {

  events: Event[] = [];
  id: string;

  constructor(
    private eventService: EventService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // this.eventService.loadDummyData();
    this.eventService.getEvents();
    this.eventService.eventsChanged.subscribe((events: Event[]) => {
      this.events = events;
    });
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
    });
    // console.log(this.events);
  }

  onNewEvent() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }
}
