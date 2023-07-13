import { Family } from "../family/family.model";
import { Member } from "../members/member.model";

export class Event {
  constructor(
    public id: string,
    public name: string,
    public date: string,
    public time: string,
    public duration: string,
    public location: string,
    public details: string,
    public belongsTo: Family,
    public members: Member[]
  ) {}
}
