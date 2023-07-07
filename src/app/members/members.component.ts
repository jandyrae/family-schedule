import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { Member } from './member.model';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent {
selectedMember = new Subject<Member>();
}
