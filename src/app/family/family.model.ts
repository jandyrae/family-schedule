import { Member } from '../members/member.model';

export class Family {
  constructor(
    public id: string,
    public name: string,
    public members: Member[],
    public image: string,
  ) {}
}
