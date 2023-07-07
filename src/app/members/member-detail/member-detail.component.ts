import { Component, Input } from '@angular/core';
import { Member } from '../member.model';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent {
@Input() member: Member;
}
