import { Component, Input, OnInit } from '@angular/core';
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
  @Input() family: Family;
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
      this.family = this.familyService.getFamily(this.id);
    });
  }

  onFamilyEdit() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }
  onSubmitFamily(form: NgForm) {
    const value = form.value;
    const newFamily = new Family(
      '',
      value.name,
      value.image,
      (value.members = null)
    );
    if (!this.editMode) {
      this.familyService.addFamily(newFamily);
    } // add or update
    this.editMode = false;
    form.reset();
    this.router.navigate(['/family']);
    this.families = this.familyService.getFamilies();
  }
}
