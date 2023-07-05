import { Member } from "../members/member.model";

export class Family {
  constructor(
    public id: string,
    public name: string,
    public image: string,
    public members: Member[],
    public events: Event[]
  ){}
}
