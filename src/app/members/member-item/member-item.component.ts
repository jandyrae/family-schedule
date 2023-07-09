import { Component, Input, OnInit, Output } from '@angular/core';
import { Member } from '../member.model';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-member-item',
  templateUrl: './member-item.component.html',
  styleUrls: ['./member-item.component.css']
})
export class MemberItemComponent implements OnInit {
@Input() member: Member;
@Input() id: string;
@Output() memberSelected = new Subject<void>();
memberInfo: string;


  onSelected(){
    this.memberSelected.next();
  }
  ngOnInit(): void {
    this.memberInfo = this.member?.belongsTo.name;
  }
}
