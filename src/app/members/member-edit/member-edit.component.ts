import { Component } from '@angular/core';
import { Member } from '../member.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent {
member: Member;



  onSubmitMember(form: NgForm) {
    console.log(form);
  }
}
