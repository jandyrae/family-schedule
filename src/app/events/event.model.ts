import { Family } from "../family/family.model";
import { Member } from "../members/member.model";

export class Event {
  constructor(
    public id: string,
    public name: string,
    public date: Date,
    public time: string,
    public duration: Date,
    public location: string,
    public details: string,
    public belongsTo: Family["id"],
    public members: Member[]
  ) {}
}
