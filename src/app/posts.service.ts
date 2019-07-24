import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Post} from './post.model';
import {map, tap} from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class PostsService {

  constructor(private http: HttpClient) {}

  createAndStorePost(title: string, content: string) {

    const postData: Post = {title, content};
    // Send Http request
    this.http
      .post<{ name: string}>(
        'https://atcg-course-app-8.firebaseio.com/posts.json',
        postData,
        { observe: 'response'}
      )
      .subscribe((responseData) => {
        console.log(responseData);
      });
  }

  fetchPosts() {
    let searchParams = new HttpParams();
    searchParams =  searchParams.append('print', 'pretty');

    return this.http
      .get<{[key: string]: Post}>('https://atcg-course-app-8.firebaseio.com/posts.json',
        {
          headers: new HttpHeaders({'Data-Type-1': 'ContentHeader'}),
          params: searchParams
        } )
      .pipe(
        map( (responseData) => {
            const postsArray: Post[] = [];
            for (const key in responseData) {
              if (responseData.hasOwnProperty(key)) {
                postsArray.push({
                  ...responseData[key],
                  id: key
                });
              }
            }
            return postsArray;
          }
        ));
  }

  deletePosts() {
    return this.http.delete( 'https://atcg-course-app-8.firebaseio.com/posts.json', {
      observe: 'events',
      responseType: 'text'
    } ).pipe(
      tap(event => {
        console.log(event);
      })
    );
  }
}
