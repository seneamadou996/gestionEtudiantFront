import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {SchoolDto} from "../../model/school-dto";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class SchoolService {

  constructor(
    private http: HttpClient
  ) { }

  inscrire(schollDto: SchoolDto): Observable<SchoolDto> {
    var path = environment.path;
    return this.http.post<SchoolDto>(path + "/schools/create", schollDto);
  }
}
