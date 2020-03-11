import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {map, catchError} from 'rxjs/operators';
import {Subject, throwError} from 'rxjs';


import {Post} from './post.model';

@Injectable({providedIn: 'root'})
export class PostsService {

    error = new Subject<string>();

    constructor(private http: HttpClient) {}

    createAndStorePost(title: string, content: string) {
        const postData: Post = {title: title, content: content};

        // send http request
        this.http
        .post<{ name: string }>('https://posts-99ddc.firebaseio.com/posts.json', postData)
          .subscribe( responseData => {
          console.log(responseData);
        }, error => {
            this.error.next(error.message)
        });
    }

    fetchPosts() {
        // send http request

        return this.http
            .get<{[key: string]: Post}>('https://posts-99ddc.firebaseio.com/posts.json', {
                headers: new HttpHeaders(
                    {
                        'Custom-Header': 'hello'
                    }
                )
            })
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
                ),
                catchError( errorRes => {
                    // send to analytic server for example...
                    return throwError(errorRes);
                })
            );
    }

    clearPosts() {
        return this.http.delete('https://posts-99ddc.firebaseio.com/posts.json');
    }
}