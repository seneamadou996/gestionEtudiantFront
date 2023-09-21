import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthenticationRequest} from "../../model/authentication-request";
import {Observable, of} from "rxjs";
import {AuthenticationResponse} from "../../model/authentication-response";
import {environment} from "../../../environments/environment";
import {UserDto} from "../../model/user-dto";
import {ChangeUserPasswordDto} from "../../model/change-user-password-dto";
import {Router} from "@angular/router";
import {RoleUserFormDto} from "../../model/role-user-form-dto";
import {RoleDto} from "../../model/role-dto";
import {JwtHelperService} from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  login(authenticationRequest: AuthenticationRequest): Observable<AuthenticationResponse> {
    var path = environment.path;
    return this.http.post<AuthenticationResponse>(path + "/auth/authenticate", authenticationRequest);
  }

  gerUserByUsername(username?: string): Observable<UserDto> {
    if (username) {
      var path = environment.path;
      const headers= new HttpHeaders()
        .set('content-type', 'application/json')
        .set('Access-Control-Allow-Origin', '*');
      return this.http.get<UserDto>(path + "/users/findUserByUsername/"+username, {headers: headers});
    }
    return of();
  }

  gerUserById(id?: number): Observable<UserDto> {
    if (id) {
      var path = environment.path;
      const headers= new HttpHeaders()
        .set('content-type', 'application/json')
        .set('Access-Control-Allow-Origin', '*');
      return this.http.get<UserDto>(path + "/users/"+id, {headers: headers});
    }
    return of();
  }

  saveUser(userDto: UserDto): Observable<UserDto> {
    var path = environment.path;
    const headers= new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*');
    return this.http.post<UserDto>(path + "/users/create", userDto, {headers: headers});
  }

  updateUser(userDto: UserDto, idUser: number): Observable<UserDto> {
    var path = environment.path;
    const headers= new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*');
    return this.http.put(path + "/users/update/"+ idUser, userDto, {headers: headers});
  }

  getAllUsers(): Observable<UserDto[]> {
    var path = environment.path;
    const headers= new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*');
    return this.http.get<UserDto[]>(path + "/users/all", {headers: headers});
  }

  deleteUser(id: number): Observable<any> {
    var path = environment.path;
    return this.http.delete<any>(path + "/users/delete/"+id);
  }

  getAllRoles(): Observable<RoleDto[]> {
    var path = environment.path;
    const headers= new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*');
    return this.http.get<RoleDto[]>(path + "/roles/all", {headers:headers});
  }

  addRoleToUser(roleUserForm: RoleUserFormDto): Observable<any> {
    var path = environment.path;
    return this.http.post<any>(path + "/users/addtouser", roleUserForm);
  }

  static setAccessToken(authenticationResponse: AuthenticationResponse) {
    localStorage.setItem("accessToken", JSON.stringify(authenticationResponse));
  }

  static setConnectedUser(userDto: UserDto) {
    localStorage.setItem("connectedUser", JSON.stringify(userDto));
  }

  static getConnectedUser(): UserDto {
    if (localStorage.getItem("connectedUser")) {
      return JSON.parse(localStorage.getItem("connectedUser") as string);
    }
    return {};
  }

  changerMotdePasse(changeMotPasseDto: ChangeUserPasswordDto): Observable<UserDto> {
    let path = environment.path;
    return this.http.post<UserDto>(path + "/users/changePassword", changeMotPasseDto);
  }

  //TODO
  isUserLoggedAndAccessTokenValid(): boolean {
    const jwtHelperServie = new JwtHelperService();
    const token = localStorage.getItem("accessToken");
    if (token && !jwtHelperServie.isTokenExpired(token)) {
      return true;
      //Verifier si le accessToken est valid
    }
    localStorage.removeItem("accessToken");
    localStorage.removeItem("connectedUser");
    this.router.navigate(['login']);
    return false;
  }



}
