import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Router} from "@angular/router";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  savePhoto(context: string, id: number, file: File, title: string): Observable<any> {
    var path = environment.path;
    let __body = new FormData();
    __body.append('file', file as string | Blob);
    const headers= new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*');
    return this.http.put<any>(path + `/photos/${context}/${id}/${title}`, __body, {headers: headers});
  }

}
