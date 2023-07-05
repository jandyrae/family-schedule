import { Injectable } from '@angular/core';
import { Event } from './event.model';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  events: Event[] = [];
  event: Event;

  constructor() {
    // Load dummy data when the component is initialized
    // this.loadDummyData();

  }

  loadDummyData() {
    const event1 = new Event(
      '1',
      'Event 1',
      new Date('2023-07-05'),
      // new Date('2023-07-05T14:00:00'),
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
      'Event 2',
      new Date('2023-07-06'),
      // new Date('2023-07-06T18:30:00'),
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
  getEvent(id:string): Event {
    return this.events.find((event) => event.id === id);
  }


  getEvents(): Event[] {
    return this.events;
  }

  addEvent(eventData: Event) {
    const newEvent: Event = {
      id: eventData.id,
      name: eventData.name,
      date: eventData.date,
      // time: eventData.time,
      duration: eventData.duration,
      location: eventData.location,
      details: eventData.details,
      belongsTo: eventData.belongsTo,
      members: eventData.members,
    };

    // Add the new event to your events array or perform any other desired actions
    this.events.push(newEvent);
  }

  updateEvent(eventUpdate: Event, event){}
}
