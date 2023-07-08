import { Component, Input, OnInit } from '@angular/core';
import { Family } from '../family.model';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { FamilyService } from '../family.service';

@Component({
  selector: 'app-family-detail',
  templateUrl: './family-detail.component.html',
  styleUrls: ['./family-detail.component.css'],
})
export class FamilyDetailComponent implements OnInit {
  @Input() family: Family;
  id: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private familyService: FamilyService
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

  onDelete(){
    // this.familyService.deleteFamily(this.id);
    // this.router.navigate(['../'], { relativeTo: this.route });
  }
}
