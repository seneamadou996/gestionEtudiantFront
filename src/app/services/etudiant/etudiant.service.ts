import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {EtudiantDto} from "../../model/etudiant-dto";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class EtudiantService {

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  saveEtudiant(etudiantDto: EtudiantDto): Observable<EtudiantDto> {
    let path = environment.path;
    const headers= new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*');
    return this.http.post<EtudiantDto>(path + `/etudiants/create`, etudiantDto, {headers: headers});
  }


  findAll(): Observable<EtudiantDto[]> {
    let path = environment.path;
    const headers= new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*');
    return this.http.get<EtudiantDto[]>(path + `/etudiants/all`, {headers: headers});
  }

  findById(id: number): Observable<EtudiantDto> {
    let path = environment.path;
    const headers= new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*');
    return this.http.get<EtudiantDto>(path + `/etudiants/${id}`, {headers: headers});
  }

  update(etudiantDto: EtudiantDto, id: number): Observable<EtudiantDto> {
    let path = environment.path;
    const headers= new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*');
    return this.http.put<EtudiantDto>(path + `/etudiants/update/${id}`, etudiantDto, {headers: headers});
  }

  delete(id?: number): Observable<any> {
    let path = environment.path;
    return this.http.delete<any>(path + `/etudiants/delete/${id}`);
  }

}
