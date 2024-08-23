import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  saveUser(data: any): Observable<any> {
    return this.http.post('http://localhost:3000/api/user/signup', data);
  }

  loginUser(data: any): Observable<any> {
    return this.http.post('http://localhost:3000/api/user/login', data);
  }
}
