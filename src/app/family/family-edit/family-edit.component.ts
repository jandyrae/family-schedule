import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Family } from '../family.model';
import { FamilyService } from '../family.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { NgForm } from '@angular/forms';

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
  editMode = false;

  constructor(
    private familyService: FamilyService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
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
      this.familyService.getFamilies();
    });
  }

  // onFamilyEdit() {
  //   this.router.navigate(['edit'], { relativeTo: this.route });
  // }
  onSubmitFamily(form: NgForm) {
    const value = form.value;
    const newFamily = new Family(
      '',
      value.name,
      (value.members = null),
      value.image,
    );
    if (!this.editMode) {
      this.familyService.addFamily(newFamily);
    } // add or update
    // else { this.familyService.updateFamily(this.id, newFamily); }
    this.editMode = false;
    form.reset();
    this.router.navigate(['/family']);
    this.families = this.familyService.getFamilies();
  }
}
