import { Component, OnInit } from '@angular/core';
import { MainService } from '../main.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
  posts: any;

  constructor(private mainService: MainService) { }

  ngOnInit(): void {
    this.getPosts();
  }

  getPosts() {
    this.mainService.getPosts()
    .subscribe((res)=>{
      this.posts = res.posts;
    })
  }

}
