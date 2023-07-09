import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Member } from './member.model';
import { MemberService } from './member.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css'],
})
export class MembersComponent implements OnInit {
  selectedMember: Member;
  exports:[FormsModule];

  constructor(private memberService: MemberService) {}

  ngOnInit(): void {
    // this.memberService.getMembers();
    this.memberService.memberSelected
    .subscribe((member: Member) => {
      this.selectedMember = member;
    });
  }
}
