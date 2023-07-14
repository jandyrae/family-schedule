import { Injectable } from '@angular/core';
import { Family } from './family.model';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class FamilyService {
  family: Family;
  allFamilies: Family[] = [];
  familyChanged = new Subject<Family[]>();
  familySelected = new Subject<Family>();
  maxFamilyId = 0;

  constructor(private http: HttpClient) {}

  getFamily(id: string): Family {
    return this.allFamilies.find((family) => family.id === id);
  }
  getFamilyId(id: string): Family {
    // return this.allFamilies.find((family) => family.id === id);
    this.http
      .get<{ message: String; family: Family }>(
        `http://127.0.0.1:3000/family/${id}`
      )
      .subscribe({
        next: (value) => {
          this.family = value.family;
        },
        error: (err) => console.error(err),
        complete: () => console.log('getFamily succeeded'),
      });
    return this.family;
  }

  getFamilies(): Family[] {
    this.http
      .get<{ message: String; family: Family[] }>(
        'http://127.0.0.1:3000/family'
      )
      .subscribe({
        next: (value) => {
          this.allFamilies = value.family;
          this.allFamilies.sort((a, b) => (a.id > b.id ? 1 : -1));
          this.familyChanged.next([...this.allFamilies]);
        },
        error: (err) => console.error(err),
        complete: () => console.log('getFamilies succeeded'),
      });
    return this.allFamilies.slice();
  }

  addFamily(family: Family) {
    if (!family) {
      return;
    }
    const headers = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    family.id = '';
    this.http
      .post<{ message: String; family: Family }>(
        'http://127.0.0.1:3000/family',
        family,
        headers
      )
      .subscribe({
        next: (value) => {
          this.allFamilies.push(value.family);
          console.log(value.family);
          this.allFamilies.sort((a, b) => (a.id > b.id ? 1 : -1));
          this.allFamilies = this.getFamilies();
        },
        error: (err) => console.error(err),
        complete: () => {
          console.log('addFamily succeeded');
          this.familyChanged.next([...this.allFamilies]);
        },
      });
  }

  updateFamily(originalFamily: Family, newFamily: Family) {
    if (!originalFamily || !newFamily) {
      return;
    }
    const pos = this.allFamilies.findIndex(
      (family) => family.id === originalFamily.id
    );
    if (pos < 0) {
      return;
    }
    const headers = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    newFamily.id = originalFamily.id;
    this.http
      .put<{ message: String; family: Family }>(
        `http://127.0.0.1:3000/family/${originalFamily.id}`,
        newFamily,
        headers
      )
      .subscribe({
        next: (value) => {
          console.log(value.message);
          this.allFamilies[pos] = newFamily;
          this.allFamilies.sort((a, b) => (a.id > b.id ? 1 : -1));
          this.allFamilies = this.getFamilies();
        },
        error: (err) => console.error(err),
        complete: () => {
          console.log('updateFamily succeeded');
          this.familyChanged.next([...this.allFamilies]);
        },
      });
  }

  deleteFamily(family: Family) {
    if (!family) {
      return;
    }
    const pos = this.allFamilies.findIndex((f) => f.id === family.id);
    if (pos < 0) {
      return;
    }
    this.http
      .delete(
        `http://127.0.0.1:3000/family/${family.id}`
      )
      .subscribe({
        next: (value) => {
          this.allFamilies.splice(pos, 1);
          this.allFamilies.sort((a, b) => (a.id > b.id ? 1 : -1));
          // this.allFamilies = this.getFamilies();
          this.familyChanged.next([...this.allFamilies]);
        },
        error: (err) => console.error(err),
        complete: () => {
          console.log('deleteFamily succeeded');
        },
      });
  }
}
