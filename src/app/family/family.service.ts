import { Injectable } from '@angular/core';
import { Family } from './family.model';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FamilyService {
family: Family;
allFamilies: Family[] = [];
familyChanged = new Subject<Family[]>();
familySelected = new Subject<Family>();
maxFamilyId = 0;

  constructor(private http: HttpClient) { }

  getFamily(id: string): Family {
    return this.allFamilies.find((family) => family.id === id);
  }

  getFamilies(): Family[] {
    this.http.get<{message: String, family: Family[]}>(
      'http://127.0.0.1:3000/family')
      .subscribe({
        next: (value) => {
          this.allFamilies = value.family;
          this.allFamilies.sort((a,b) => a.name > b.name ? 1 : -1 );
          this.familyChanged.next([...this.allFamilies]);

        },
        error: (err) => console.error(err),
      })
    return this.allFamilies.slice();
  }

  addFamily(family:Family) {
    const headers = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    family.id = '';
    this.http.post<{message: String, family: Family}>(
      'http://127.0.0.1:3000/family', family, headers )
      .subscribe({
        next: (value) => {
          this.allFamilies.push(value.family);
          this.familyChanged.next([...this.allFamilies]);
        },
        error: (err) => console.error(err),
      })
    }

}
