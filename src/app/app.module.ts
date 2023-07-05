import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FamilyComponent } from './family/family.component';
import { EventsComponent } from './events/events.component';
import { MembersComponent } from './members/members.component';
import { FormsModule } from '@angular/forms';
import { EventEditComponent } from './events/event-edit/event-edit.component';
import { EventDetailComponent } from './events/event-detail/event-detail.component';
import { EventListComponent } from './events/event-list/event-list.component';
import { HeaderComponent } from './header.component';
import { Router, RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    FamilyComponent,
    EventsComponent,
    MembersComponent,
    EventEditComponent,
    EventDetailComponent,
    EventListComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
