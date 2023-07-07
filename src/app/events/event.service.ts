import { Injectable } from '@angular/core';
import { Event } from './event.model';
import { Subject, map } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MemberService } from '../members/member.service';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  eventsChanged = new Subject<Event[]>();
  eventSelectedEvent = new Subject<Event>();
  events: Event[] = [];
  event: Event;
  currentId: number;
  maxId = 0;

  constructor(private http: HttpClient,
    private memberService: MemberService) {
    this.maxId = this.getMaxId();

  }
  getMaxId(): number {
    this.events.forEach((event) => {
      this.currentId = +event.id;
      if (this.currentId > this.maxId) {
        this.maxId = this.currentId;
      }
    });
    return this.maxId;
  }

  getEvent(id: string): Event {
    // return this.events.find((event) => event.id === id);
    this.http
      .get<{ message: string; event: Event }>(`http://127.0.0.1:3000/events/${id}`)
      .pipe(
        map((result) => {
          const event: Event = result.event;
          return event;
        })
      )
      .subscribe({
        next: (value) => {
          this.event = value;

        },
        error: (err) => {
          console.log(err);
        },
        complete() {
          console.log('getEvent succeeded');
        },
      });
    return this.event;
  }

  getEvents(): Event[] {
    // return this.events.slice();
    this.http
      .get<{ message: string; events: Event[] }>('http://127.0.0.1:3000/events')
      .pipe(
        map((result) => {
          const events: Event[] = result.events;
          return events;
        })
      )
      .subscribe({
        next: (value) => {
          this.events = value;
          this.events.sort((a,b) => a.date > b.date ? 1: -1);
          // this.eventsChanged.next([...this.events]);

        },
        error: (err) => {
          console.log(err);
        },
        complete() {
          console.log('getEvents succeeded');
        },
      });
    return this.events.slice();
  }

  addEvent(eventData: Event) {
    // const newEvent: Event = {
    //   id: this.maxId.toString(),
    //   name: eventData.name,
    //   date: eventData.date,
    //   time: eventData.time,
    //   duration: eventData.duration,
    //   location: eventData.location,
    //   details: eventData.details,
    //   belongsTo: eventData.belongsTo,
    //   members: eventData.members,
    // };

    // // Add the new event to your events array or perform any other desired actions
    // this.events.push(newEvent);
    if (!eventData) {
      return;
    }
    eventData.id = '';
    const headers = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    this.http
      .post<{ message: string; eventData: Event }>(
        'http://127.0.0.1:3000/events',
        eventData,
        headers
      )
      .subscribe({
        next: (n) => {
          // this.events.push(n.eventData);
          console.log(n.message);
          this.events.sort((a, b) => (b.date < a.date ? 1 : -1));
          this.events = this.getEvents();
        },
        error: (e) => console.error(Error, 'an error occurred' + e),
        complete: () => {
          this.eventsChanged.next([...this.events]);
        },
      });
  }

  updateEvent(id: string, editedEvent: Event) {
    this.events[id] = editedEvent;
    this.eventsChanged.next(this.events.slice());
  }

  deleteEvent(id: string) {
    this.events.splice(+id, 1);
    this.eventsChanged.next([...this.events]);
  }
}
