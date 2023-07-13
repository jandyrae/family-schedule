import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Member } from '../member.model';
import { NgForm } from '@angular/forms';
import { MemberService } from '../member.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { EventService } from 'src/app/events/event.service';
import { Event } from 'src/app/events/event.model';
import { Family } from 'src/app/family/family.model';
import { FamilyService } from 'src/app/family/family.service';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css'],
})
export class MemberEditComponent implements OnInit {
  @Input() member: Member;
  @ViewChild('memberForm') memberForm: NgForm;
  id: string;
  members: Member[];
  events: Event[];
  editMode = false;
  familyList: Family[] = [];

  constructor(
    private memberService: MemberService,
    private eventService: EventService,
    private familyService: FamilyService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.members = this.memberService.getMembers();
    this.familyList = this.familyService.getFamilies();
    // this.events = this.eventService.getEvents();
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      if (!params) {
        this.editMode = false;
        return;
      }
      this.member = this.memberService.getMember(this.id);
      if (!this.member) {
        return;}
      this.editMode = true;
      console.log(this.editMode, 'editMode');
    });
  }

  onMemberEdit() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }

  onSubmitMember(form: NgForm) {
    const value = form.value;
    this.member = new Member(
      this.id,
      value.name,
      value.belongsTo,
      value.email,
      value.phone,
      value.address,
      value.image,
      value.events,
    );
    const newMember = new Member(
      '',
      value.name,
      value.belongsTo,
      value.email,
      value.phone,
      value.address,
      value.image,
      value.events
    );
    if (this.editMode) {
      this.memberService.updateMember(this.member, newMember );
    } else {
      // add new member
      this.memberService.addMember(newMember);
    }

    this.editMode = false;
    form.reset();
    this.router.navigate(['/members']);
    this.members = this.memberService.getMembers();
  }

  // onDeleteMember() {
  //  this.eventService.deleteEvent(this.member.id);
  //  this.memberService.membersChanged.next(this.members.slice());
  // }

}
