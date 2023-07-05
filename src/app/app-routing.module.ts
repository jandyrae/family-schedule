import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventsComponent } from './events/events.component';
import { MembersComponent } from './members/members.component';
import { FamilyComponent } from './family/family.component';
import { EventEditComponent } from './events/event-edit/event-edit.component';
import { EventDetailComponent } from './events/event-detail/event-detail.component';

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
  { path: 'members', component: MembersComponent },
  { path: 'family', component: FamilyComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
