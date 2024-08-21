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
    formData = {
        title: '',
        content: ''
    };
    targetedId: string = '';
    isLoading = false;

    constructor(private mainService: MainService) { }

    ngOnInit(): void {
        this.count = 0
        this.getPosts();
        // this.postPosts();
    }

    getPosts() {
        this.isLoading = true;
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
                this.isLoading = false;
            })
    }

    onSave() {
        console.log(this.targetedId);
        
        if (!this.targetedId) {
            this.postPosts();
        } else {
            this.callEditPosts(this.targetedId);
        }
    }

    postPosts(){
        this.mainService.postPosts({
            title: this.formData.title,
            content: this.formData.content,
        })
        .subscribe((res) => {
            console.log(res);
            this.getPosts();
            this.formData = {
                title: '',
                content: ''
            };
        })
    }

    callEditPosts(id: string){
        this.mainService.editPosts(id, {
            id,
            title: this.formData.title,
            content: this.formData.content,
        })
        .subscribe((res) => {
            console.log(res);
            this.getPosts();
            this.formData = {
                title: '',
                content: ''
            };
            this.targetedId = '';
        })
    }

    deletePosts(id: any) {
        this.mainService.deletePosts(id)
        .subscribe((res) => {
            console.log(res);
            this.getPosts();
        })
    }

    editPosts(post:any) {
        console.log(post);
        
        this.formData = {
            title: post.title,
            content: post.content
        };
        this.targetedId = post.id;
        // this.mainService.deletePosts(post.id)
        // .subscribe((res) => {
        //     console.log(res);
        //     this.getPosts();
        // })   
    }
}
