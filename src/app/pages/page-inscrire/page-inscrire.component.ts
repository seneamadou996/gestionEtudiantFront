import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {SchoolDto} from "../../model/school-dto";
import {AddressDto} from "../../model/address-dto";
import {SchoolService} from "../../services/school/school.service";
import {AuthenticationRequest} from "../../model/authentication-request";
import {UserService} from "../../services/user/user.service";

@Component({
  selector: 'app-page-inscrire',
  templateUrl: './page-inscrire.component.html',
  styleUrls: ['./page-inscrire.component.scss']
})
export class PageInscrireComponent implements OnInit {

  schoolDto: SchoolDto = {};
  addressDto: AddressDto = {};
  errorsMsg: Array<String> = [];

  constructor(
    private router: Router,
    private schoolService: SchoolService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
  }

  inscrire() {
    this.schoolDto.addressDto = this.addressDto;
    this.schoolService.inscrire(this.schoolDto)
      .subscribe(resp => {
        this.connectSchool();
      }, error => {
        this.errorsMsg = error.error.errors;
      })
  }

  connectSchool() {
    const authenticationRequest: AuthenticationRequest = {
      username: this.schoolDto.name?.toLowerCase(),
      password: 'som3R@nd0mP@$$word'
    };
    this.userService.login(authenticationRequest)
      .subscribe(response => {
        UserService.setAccessToken(response);
        this.getUserByUsername(authenticationRequest.username);
        localStorage.setItem('origin','inscription');
        this.router.navigate(['changer-mot-de-passe']);
      })
  }

  getUserByUsername(usermane?: string) {
    this.userService.gerUserByUsername(usermane)
      .subscribe(user => {
        UserService.setConnectedUser(user);
      })
  }
}
