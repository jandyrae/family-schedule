import { Component } from '@angular/core';
import { Member } from '../member.model';

@Component({
  selector: 'app-member-item',
  templateUrl: './member-item.component.html',
  styleUrls: ['./member-item.component.css']
})
export class MemberItemComponent {
member: Member;

  onSelected(){}
}
