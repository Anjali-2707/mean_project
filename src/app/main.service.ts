import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class MainService {
  posts: any;

  constructor(private http: HttpClient) { }

  getPosts(): Observable<any> {
    // this.http.get<Posts[]>('http://localhost:3000/api/posts') // Type of response we get
    return this.http.get('http://localhost:3000/api/posts');
    // .subscribe((res) => {
    //   this.posts = res.posts;
    // })
  }
}
