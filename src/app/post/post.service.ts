import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
     
import {  Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
  
import { Post } from './post';
  
@Injectable({
  providedIn: 'root'
})
export class PostService {
  
  private apiURL = "http://127.0.0.1:8000/api/posts";
    
  /*------------------------------------------
  --------------------------------------------
  Http Header Options
  --------------------------------------------
  --------------------------------------------*/
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
   
  /*------------------------------------------
  --------------------------------------------
  Created constructor
  --------------------------------------------
  --------------------------------------------*/
  constructor(private httpClient: HttpClient) { }
    
  /**
   * Write code on Method
   *
   * @return response()
   */
  getAll(): Observable<any> {
  
    return this.httpClient.get(this.apiURL)
  
    .pipe(
      catchError(this.errorHandler)
    )
  }
  

  // create post
  create(post:Post): Observable<any> {
  
    return this.httpClient.post(this.apiURL, post, this.httpOptions)
  
    .pipe(
      catchError(this.errorHandler)
    )
  }  

  // update post
   find(id:number): Observable<any> {
  
    return this.httpClient.get(this.apiURL + '/' + id)
  
    .pipe(
      catchError(this.errorHandler)
    )
  }
    
  /**
   * Write code on Method
   *
   * @return response()
   */
  update(id:number, post:Post): Observable<any> {
  
    return this.httpClient.put(this.apiURL + '/' + id, JSON.stringify(post), this.httpOptions)
 
    .pipe( 
      catchError(this.errorHandler)
    )
  }

  // delete
  delete(id:number){
    return this.httpClient.delete(this.apiURL + '/' + id, this.httpOptions)
  
    .pipe(
      catchError(this.errorHandler)
    )
  }
  
  errorHandler(error:any) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
 }
}