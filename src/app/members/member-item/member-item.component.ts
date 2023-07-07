import { Component, Input, Output } from '@angular/core';
import { Member } from '../member.model';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-member-item',
  templateUrl: './member-item.component.html',
  styleUrls: ['./member-item.component.css']
})
export class MemberItemComponent {
@Input() member: Member;
@Input() id: string;
@Output() memberSelected = new Subject<void>();

  onSelected(){
    this.memberSelected.next();
  }
}
