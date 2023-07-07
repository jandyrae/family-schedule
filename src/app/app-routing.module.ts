import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { EventsComponent } from './events/events.component';
import { MembersComponent } from './members/members.component';
import { FamilyComponent } from './family/family.component';
import { EventEditComponent } from './events/event-edit/event-edit.component';
import { EventDetailComponent } from './events/event-detail/event-detail.component';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';


const routes: Routes = [
  { path: '', redirectTo: '/events', pathMatch: 'full' },
  {
    path: 'events',
    component: EventsComponent,
    children: [
      { path: 'new', component: EventEditComponent },
      { path: ':id', component: EventDetailComponent },
      { path: ':id/edit', component: EventEditComponent },
    ],
  },
  { path: 'members', component: MembersComponent, children: [
    {path: 'new', component: MemberEditComponent},
    {path: ':id', component: MemberDetailComponent},
    {path: ':id/edit', component: MemberEditComponent},
  ]},
  { path: 'family', component: FamilyComponent },
];

@NgModule({
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
