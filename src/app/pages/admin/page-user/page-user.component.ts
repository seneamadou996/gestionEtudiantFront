import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {UserService} from "../../../services/user/user.service";
import {UserDto} from "../../../model/user-dto";

@Component({
  selector: 'app-page-user',
  templateUrl: './page-user.component.html',
  styleUrls: ['./page-user.component.scss']
})
export class PageUserComponent implements OnInit {

  listUsers: Array<UserDto> = [];
  errorMsg = '';

  constructor(
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.findAllUsers();
  }

  findAllUsers() {
    this.userService.getAllUsers()
      .subscribe(user => {
        this.listUsers = user
      })
  }

  nouvelUtilisateur() {
    this.router.navigate(['nouvel-utilisateur']);
  }

  handleSuppression(event: any) {
    if (event === 'success') {
      this.findAllUsers();
    } else {
      this.errorMsg = event;
    }
  }
}
