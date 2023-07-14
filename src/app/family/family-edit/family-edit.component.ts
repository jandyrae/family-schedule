import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Family } from '../family.model';
import { FamilyService } from '../family.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Member } from 'src/app/members/member.model';
import { MemberService } from 'src/app/members/member.service';

@Component({
  selector: 'app-family-edit',
  templateUrl: './family-edit.component.html',
  styleUrls: ['./family-edit.component.css'],
})
export class FamilyEditComponent implements OnInit {
  @ViewChild('familyForm') familyForm: NgForm;
  family: Family;
  id: string;
  families: Family[] = [];
  memberList: Member[] = [];
  editMode = false;

  constructor(
    private familyService: FamilyService,
    private memberService: MemberService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.families = this.familyService.getFamilies();
    this.memberList = this.memberService.getMembers();
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      if (!params) {
        this.editMode = false;
        return;
      }
      this.family = this.familyService.getFamily(this.id);
      if (!this.family) {
        return;
      }
      this.editMode = true;
    });
  }

  onFamilyEdit() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }

  onSubmitFamily(form: NgForm) {
    const value = form.value;
    this.family = new Family(
      this.id,
      value.name,
      value.members,
      value.image);
    const newFamily = new Family(
      '',
      value.name,
      (value.members || []),
      value.image
    );
    if (this.editMode) {
      this.familyService.updateFamily(this.family, newFamily);
    } else {
      // add or update
      this.familyService.addFamily(newFamily);
    }

    this.editMode = false;
    form.reset();
    this.router.navigate(['/family']);
    this.families = this.familyService.getFamilies();
  }
}
