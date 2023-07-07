import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule} from '@angular/common/http'
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
import { EventItemComponent } from './events/event-item/event-item.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { MemberItemComponent } from './members/member-item/member-item.component';

@NgModule({
  declarations: [
    AppComponent,
    FamilyComponent,
    EventsComponent,
    MembersComponent,
    EventEditComponent,
    EventDetailComponent,
    EventListComponent,
    HeaderComponent,
    EventItemComponent,
    MemberListComponent,
    MemberDetailComponent,
    MemberEditComponent,
    MemberItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
