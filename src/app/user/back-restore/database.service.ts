import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Backup } from 'src/app/types/Backup';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  private baseurl = environment.apiBaseUrl;
  constructor(private httpClient: HttpClient) {}

  backup(backup: Backup): Observable<Object> {
    return this.httpClient.post(`${this.baseurl}/database/backup`, backup);
  }

  restore(backup: Backup): Observable<Object> {
    return this.httpClient.post(`${this.baseurl}/database/restore`, backup);
  }
}
