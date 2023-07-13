import { Component, OnInit, ViewChild } from '@angular/core';
import { Member } from 'src/app/members/member.model';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { Event } from '../event.model';
import { NgForm } from '@angular/forms';
import { EventService } from '../event.service';
import { MemberService } from 'src/app/members/member.service';
import { Family } from 'src/app/family/family.model';
import { FamilyService } from 'src/app/family/family.service';

@Component({
  selector: 'app-event-edit',
  templateUrl: './event-edit.component.html',
  styleUrls: ['./event-edit.component.css'],
})
export class EventEditComponent implements OnInit {
  @ViewChild('eventForm') eventForm: NgForm;
  event: Event;
  events: Event[] = [];
  editMode: boolean = false;
  id: string;
  member: Member;
  memberList: Member[] = [];
  familyList: Family[] = [];

  constructor(
    private eventService: EventService,
    private memberService: MemberService,
    private familyService: FamilyService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.memberList = this.memberService.getMembers();
    this.familyList = this.familyService.getFamilies();
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      if (!params) {
        this.editMode = false;
        return;
      }
      this.event = this.eventService.getEvent(this.id);
      if (!this.event) {
        return;
      }
      this.editMode = true;

      console.log(this.memberList);
    });
  }

  onSubmitEvent(form: NgForm) {
    const value = form.value;
    this.event = new Event(
      this.id,
      value.name,
      value.date,
      value.time,
      value.duration,
      value.location,
      value.details,
      value.belongsTo,
      value.members
    );
    const newEvent = new Event(
      '',
      value.name,
      value.date,
      value.time,
      value.duration,
      value.location,
      value.details,
      value.belongsTo,
      value.members
    );

    if (this.editMode) {
      //update event
      this.eventService.updateEvent(this.event, newEvent);
    } else {
      //create new event
      this.eventService.addEvent(newEvent);
    }
    this.editMode = false;
    form.reset();
    // navigate to list
    this.router.navigate(['/events']);
    this.events = this.eventService.getEvents();
  }

  isInvalidMember(newMember: Member) {
    if (!newMember) {
      return true;
    }
    if (this.member && newMember.id === this.member.id) {
      return true;
    }
    for (let i = 0; i < this.memberList.length; i++) {
      if (newMember.id === this.memberList[i].id) {
        return true;
      }
    }
    return false;
  }

  addToEvent($event: any) {
    const selectedMember: Member = $event.dragData;
    const invalidGroupMember = this.isInvalidMember(selectedMember);
    var message = document.getElementById('unableToAdd');
    message.style.display = 'none';
    if (invalidGroupMember) {
      message.style.display = 'block';
      message.innerText =
        'Member cannot be added to the group. Either it is already in the group or is the current Member.';
      return;
    }
    message.style.display = 'none';
    this.memberList.push(selectedMember);
  }

  onDeleteEvent() {
    this.eventService.deleteEvent(this.event.id);
    this.router.navigate(['/events']);
  }
}
