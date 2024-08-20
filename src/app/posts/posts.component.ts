import { Component, OnInit } from '@angular/core';
import { MainService } from '../main.service';
import { map } from 'rxjs';

@Component({
    selector: 'app-posts',
    templateUrl: './posts.component.html',
    styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
    posts: any;
    count!: number;

    constructor(private mainService: MainService) { }

    ngOnInit(): void {
        this.count = 0
        this.getPosts();
        // this.postPosts();
    }

    getPosts() {
        this.mainService.getPosts()
            .pipe(map(postData => {
                return postData.posts.map((post: { title: any; content: any; _id: any; }) => {
                    return {
                        title: post.title,
                        content: post.content,
                        id: post._id
                    };
                });
            }))
            .subscribe((res) => {
                console.log(res);
                this.posts = res;
                this.count = res.length;
            })
    }

    postPosts() {
        this.mainService.postPosts({
            title: 'Posts',
            content: 'All posts here!'
        })
            .subscribe((res) => {
                console.log(res);
                this.getPosts();
            })
    }

    deletePosts(id: any) {
        this.mainService.deletePosts(id)
        .subscribe((res) => {
            console.log(res);
            this.getPosts();
        })
    }
}
