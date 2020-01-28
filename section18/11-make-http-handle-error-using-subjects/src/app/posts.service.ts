import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators';


import {Post} from './post.model';

@Injectable({providedIn: 'root'})
export class PostsService {

    constructor(private http: HttpClient) {}

    createAndStorePost(title: string, content: string) {
        const postData: Post = {title: title, content: content};

        // send http request
        this.http
        .post<{ name: string }>('https://posts-99ddc.firebaseio.com/posts.json', postData)
          .subscribe( responseData => {
          console.log(responseData);
        });
    }

    fetchPosts() {
        // send http request

        return this.http.get<{[key: string]: Post}>('https://posts-99ddc.firebaseio.com/posts.json')
        .pipe( 
            map( responseData => {
                const postArray: Post[] = [];
                for (const key in responseData) {
                    if (responseData.hasOwnProperty(key)) {
                    postArray.push({ ...responseData[key], id: key });
                    }
                }
                return postArray;
                }
            )
        );
    }

    clearPosts() {
        return this.http.delete('https://posts-99ddc.firebaseio.com/posts.json');
    }
}