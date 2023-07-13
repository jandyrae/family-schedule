import { Injectable } from '@angular/core';
import { Subject, map } from 'rxjs';
import { Member } from './member.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class MemberService {
  membersChanged = new Subject<Member[]>();
  memberSelected = new Subject<Member>();
  members: Member[] = [];
  member: Member;
  maxMemberId = 0;
  constructor(private http: HttpClient) {}

  getMember(id: string) {
    return this.members.find((member) => member.id === id);
  }
  getMemberById(id: string): Member {
    this.http
      .get<{ message: String; member: Member }>(
        `http://127.0.0.1:3000/members/${id}`
      )
      .pipe(
        map((result) => {
          const member: Member = result.member;
          return member;
        })
      )
      .subscribe({
        next: (value) => {
          this.member = value;
        },
        error: (err) => console.error(err),
      });
    return this.member;
  }

  getMembers(): Member[] {
    this.http
      .get<{ message: String; members: Member[] }>(
        'http://127.0.0.1:3000/members'
      )
      .pipe(
        map((result) => {
          const members: Member[] = result.members;
          return members;
        })
      )
      .subscribe({
        next: (value) => {
          this.members = value;
          this.members.sort((a, b) => (a.id > b.id ? 1 : -1));
          this.membersChanged.next([...this.members]);
        },
        error: (err) => console.error(err),
      });
    return this.members.slice();
  }

  addMember(member: Member) {
    if (!member) {
      return;
    }
    member.id = '';
    const headers = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    this.http
      .post<{ message: string; member: Member }>(
        'http://127.0.0.1:3000/members',
        member,
        headers
      )
      .subscribe({
        next: (n) => {
          this.members.push(n.member);
          console.log(n.message);
          this.members.sort((a, b) => (b.id < a.id ? 1 : -1));
          this.members = this.getMembers();
        },
        error: (e) => console.error(Error, 'an error occurred' + e),
        complete: () => {
          this.membersChanged.next([...this.members]);
        },
      });
  }

  updateMember(originalMember: Member, editedMember: Member) {
    if (!originalMember || !editedMember) {
      return;
    }
    const pos = this.members.findIndex((m) => m.id === originalMember.id);
    if (pos < 0) {
      return;
    }
    editedMember.id = originalMember.id;
    const headers = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    this.http
      .put(
        `http://127.0.0.1:3000/members/${originalMember.id}`,
        editedMember,
        headers
      )
      .subscribe({
        next: (n) => {
          this.members[pos] = editedMember;
          console.log(n, 'updated');
          this.members.sort((a, b) => (b.id < a.id ? 1 : -1));
          this.membersChanged.next([...this.members]);
        },
        error: (e) => console.error(Error, 'an error occurred' + e),
        complete: () => { console.log('complete'); },
      });
  }

  deleteMember(member: Member) {
    if (!member) {
      return;
    }
    const pos = this.members.findIndex((m) => m.id === member.id);
    if (pos < 0) {
      return;
    }
    this.http.delete(`http://127.0.0.1:3000/members/${member.id}`).subscribe({
      next: (n) => {
        this.members.splice(pos, 1);
        this.members.sort((a, b) => (b.id < a.id ? 1 : -1));
        this.membersChanged.next([...this.members]);
      },
      error: (e) => console.error(Error, 'an error occurred' + e),
    });
  }
}
