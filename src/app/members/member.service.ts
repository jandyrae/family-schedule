import { Injectable } from '@angular/core';
import { Subject, map } from 'rxjs';
import { Member } from './member.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MemberService {
membersChanged = new Subject<Member[]>();
members: Member[] = [];
member: Member;
maxMemberId = 0;
  constructor(private http: HttpClient) { }

  getMember(id: string): Member {
    // return this.members.find((member) => member.id === id);
    this.http.get<{message: String, member: Member}>(
      `http://127.0.0.1:3000/members/${id}`
    )
    .pipe(map((result)=> {
      const member: Member = result.member;
      return member;
    })
    )
    .subscribe({
      next: (value) => {
        this.member = value;

      },
      error: (err) => console.error(err),

    })
    return this.member;
  }

  getMembers(): Member[] {
    this.http.get<{message: String, members: Member[]}>(
      'http://127.0.0.1:3000/members'
    )
    .pipe(map((result)=> {
      const members: Member[] = result.members;
      return members;
    })
    )
    .subscribe({
      next: (value) => {
        this.members = value;
        this.members.sort((a,b) => a.id > b.id ? 1 : -1 );
        this.membersChanged.next([...this.members]);
      },
      error: (err) => console.error(err),

    })
    return this.members.slice();
  }




}
