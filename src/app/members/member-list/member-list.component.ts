import { Component } from '@angular/core';
import { Member } from '../member.model';
import { MemberService } from '../member.service';
import { ActivatedRoute, Router, Params } from '@angular/router';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css'],
})
export class MemberListComponent {
  members: Member[] = [];
  id: string;

  constructor(
    private memberService: MemberService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {

    this.members = this.memberService.getMembers();
    this.memberService.membersChanged.subscribe((members: Member[]) => {
      this.members = members;
    });
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
    });
    // console.log(this.members);
  }

  onNewMember() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }
}
