import { Injectable } from '@angular/core';
import { Event } from './event.model';
import { Subject } from 'rxjs';

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
  constructor() {
    // Load dummy data when the component is initialized
    // this.loadDummyData();
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

  loadDummyData() {
    const event1 = new Event(
      '1',
      'Family Vacation Planning Meeting',
      new Date('2023-07-05'),
      '6:00 PM',
      new Date('1970-01-01T02:30:00'),
      'Meeting Room',
      'Discuss family vacation plans',
      '1', // Belongs to Family ID
      [
        { id: '1', name: 'Jaynann Perrett', belongsTo: '0' },
        { id: '2', name: 'Jorden Perrett', belongsTo: '1' },
        { id: '3', name: 'Jandy Kiger', belongsTo: '2' },
      ]
    );

    const event2 = new Event(
      '2',
      "Planning Mtg for 2024 Girl's Night",
      new Date('2023-07-06'),
      '5:30 PM',
      new Date('1970-01-01T01:15:00'),
      'Living Room',
      'Family movie night',
      '0', // Belongs to Family ID
      [
        { id: '1', name: 'Jaynann Perrett', belongsTo: '0' },
        { id: '8', name: 'Marissa Perrett', belongsTo: '1' },
        { id: '13', name: 'Vaeh Perrett', belongsTo: '1' },
      ]
    );

    // Add the dummy events to the events array
    this.events.push(event1, event2);
  }
  getEvent(id: string): Event {
    return this.events.find((event) => event.id === id);
  }

  getEvents(): Event[] {
    return this.events.slice();
  }

  addEvent(eventData: Event) {
    const newEvent: Event = {
      id: this.maxId.toString(),
      name: eventData.name,
      date: eventData.date,
      time: eventData.time,
      duration: eventData.duration,
      location: eventData.location,
      details: eventData.details,
      belongsTo: eventData.belongsTo,
      members: eventData.members,
    };

    // Add the new event to your events array or perform any other desired actions
    this.events.push(newEvent);
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
