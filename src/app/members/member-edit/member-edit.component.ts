import { Component, Input, OnInit } from '@angular/core';
import { Member } from '../member.model';
import { NgForm } from '@angular/forms';
import { MemberService } from '../member.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css'],
})
export class MemberEditComponent implements OnInit {
  @Input() member: Member;
  id: string;
  members: Member[];
  editMode = false;

  constructor(
    private memberService: MemberService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.member = this.memberService.getMember(this.id);
    });
  }
  onMemberEdit() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }

  onSubmitMember(form: NgForm) {
    const value = form.value;
    const newMember = new Member(
      '',
      value.name,
      value.belongsTo,
      value.email,
      value.phone,
      value.address,
      value.image,
      (value.events = null)
    );
    if (!this.editMode) {
      this.memberService.addMember(newMember);
    } // add or update
    this.editMode = false;
    form.reset();
    this.router.navigate(["/members"]);
    this.members = this.memberService.getMembers();
  }
}
