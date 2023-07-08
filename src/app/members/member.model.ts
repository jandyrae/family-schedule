import { Family } from "../family/family.model";
import { Event } from "../events/event.model";

export class Member {
  constructor(
    public id: string,
    public name: string,
    public belongsTo: Family,
    public email: string,
    public phone: string,
    public address: string,
    public image: string,
    public events: Event[]
  ) {}
}
