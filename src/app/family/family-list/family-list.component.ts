import { Component, OnInit } from '@angular/core';
import { Family } from '../family.model';
import { ActivatedRoute, Router, Params } from '@angular/router';

import { FamilyService } from '../family.service';

@Component({
  selector: 'app-family-list',
  templateUrl: './family-list.component.html',
  styleUrls: ['./family-list.component.css'],
})
export class FamilyListComponent implements OnInit {
  families: Family[] = [];
  id: string;

  constructor(
    private familyService: FamilyService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.familyService.getFamilies();
    this.familyService.familyChanged.subscribe((families: Family[]) => {
      this.families = families;
    });
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
    });
  }
  onNewFamily() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }
}
