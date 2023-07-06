import { Component, Input, OnInit } from '@angular/core';
import { Event } from '../event.model';
import { EventService } from '../event.service';
import { ActivatedRoute, Router, Params } from '@angular/router';


@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.css']
})
export class EventDetailComponent implements OnInit {
  @Input() event: Event;
  // event: Event;
  id: string;

  constructor(
    private eventService: EventService,
    private route: ActivatedRoute,
    private router: Router){}

  ngOnInit(){
    this.route.params.subscribe((params:Params) => {
      this.id = params['id'];
      this.event= this.eventService.getEvent(this.id);
    })
  }

  onEventEdit() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }

  onDelete() {
    // this.eventService.deleteEvent(this.id);
  }
}
