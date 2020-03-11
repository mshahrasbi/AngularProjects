import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpEventType } from '@angular/common/http';
import {map, catchError, tap} from 'rxjs/operators';
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
        .post<{ name: string }>('https://posts-99ddc.firebaseio.com/posts.json', postData, {
            observe: 'response'
        })
          .subscribe( responseData => {
          console.log(responseData);
        }, error => {
            this.error.next(error.message)
        });
    }

    fetchPosts() {
        // send http request

        let searchParams = new HttpParams();
        searchParams = searchParams.append('print', 'pretty');
        searchParams = searchParams.append('custome', 'key');

        return this.http
            .get<{[key: string]: Post}>('https://posts-99ddc.firebaseio.com/posts.json', {
                headers: new HttpHeaders(
                    {
                        'Custom-Header': 'hello'
                    }
                ),
                params: searchParams
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

    deletePosts() {
        return this.http
            .delete('https://posts-99ddc.firebaseio.com/posts.json', {
                observe: 'events'
            })
            .pipe(
                tap(event => {
                    console.log(event);
                    if (event.type === HttpEventType.Response) {
                        console.log(event.body);
                    }
                })
            );
    }
}