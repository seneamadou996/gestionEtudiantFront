import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {UserDto} from "../../../model/user-dto";
import {UserService} from "../../../services/user/user.service";
import {RoleUserFormDto} from "../../../model/role-user-form-dto";
import {RoleDto} from "../../../model/role-dto";

@Component({
  selector: 'app-page-profil',
  templateUrl: './page-profil.component.html',
  styleUrls: ['./page-profil.component.scss']
})
export class PageProfilComponent implements OnInit {

  userDto: UserDto = {};
  username: String | undefined;
  roleUserForm: RoleUserFormDto = {};
  listRole: Array<RoleDto> = [];
  connectedUser: UserDto = {};
  imgUrl: String | ArrayBuffer = 'assets/image/user.jpg';

  constructor(
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.userDto = UserService.getConnectedUser();
    this.imgUrl = this.userDto.photo? this.userDto.photo: '';
    this.username = this.userDto.username;
    this.userService.getAllRoles()
      .subscribe(role => {
        this.listRole = role;
      })
  }

  changerMoDePasse() {
    this.router.navigate(['changer-mot-de-passe']);
  }

  addRoleToUser() {
    this.roleUserForm.username = this.username?.toString();
    this.userService.addRoleToUser(this.roleUserForm)
      .subscribe(data => {
        this.getUserByUsername(this.username?.toString());
        this.router.navigate(['profil']);
      })
  }

  getUserByUsername(username?: string) {
    this.userService.gerUserByUsername(username)
      .subscribe(user => {
        this.connectedUser = user;
        localStorage.removeItem("connectedUser");
        localStorage.setItem("connectedUser", JSON.stringify(this.connectedUser));
      })
  }

}
