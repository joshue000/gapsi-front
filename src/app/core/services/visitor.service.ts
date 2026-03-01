import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface VisitorResponse {
  code: number;
  description: string;
  data: {
    type: string;
    visitorId: string;
    welcome: string;
    version: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class VisitorService {
  constructor(private http: HttpClient) {}

  createVisitor(): Observable<VisitorResponse> {
    return this.http.post<VisitorResponse>(`${environment.apiUrl}visitors`, {});
  }
}
