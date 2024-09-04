import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ArasaacService {
  private apiUrl = 'https://api.arasaac.org/v1';

  constructor(private http: HttpClient) {}

  getPictogramId(searchText: string): Observable<number> {
    return this.http.get<{ _id: number }[]>(`${this.apiUrl}/pictograms/es/bestsearch/${searchText}`)
      .pipe(
        map(response => {
          console.log('getPictogramId response:', response); // Log the response
          if (response.length > 0) {
            return response[0]._id; // Ensure only a single id is returned
          } else {
            throw new Error('No pictogram found');
          }
        })
      );
  }

  getPictogramImage(id: number): Observable<string> {
    return this.http.get(`${this.apiUrl}/pictograms/${id}`, {
      params: {
        download: 'false',
        plural: 'false',
        color: 'true',
      },
      responseType: 'blob',
    }).pipe(
      map((response: Blob) => URL.createObjectURL(response))
    );
  }
}
