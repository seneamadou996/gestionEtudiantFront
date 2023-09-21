import { Component, OnInit } from '@angular/core';
import {AuthenticationRequest} from "../../model/authentication-request";
import {UserService} from "../../services/user/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-page-login',
  templateUrl: './page-login.component.html',
  styleUrls: ['./page-login.component.scss']
})
export class PageLoginComponent implements OnInit {

  authenticationRequest: AuthenticationRequest = {};
  errorMsg = '';

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  login() {
    this.userService.login(this.authenticationRequest)
      .subscribe(data => {
        UserService.setAccessToken(data);
        this.getUserByUsername();
        this.router.navigate(['']);
      }, error => {
        console.log(error);
        this.errorMsg = "Login and / or password incorrect";
      })
  }

  getUserByUsername() {
    this.userService.gerUserByUsername(this.authenticationRequest.username)
      .subscribe(user => {
        UserService.setConnectedUser(user);
      })
  }

}
