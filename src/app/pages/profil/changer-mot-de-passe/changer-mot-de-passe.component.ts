import { Component, OnInit } from '@angular/core';
import {UserService} from "../../../services/user/user.service";
import {Router} from "@angular/router";
import {ChangeUserPasswordDto} from "../../../model/change-user-password-dto";

@Component({
  selector: 'app-changer-mot-de-passe',
  templateUrl: './changer-mot-de-passe.component.html',
  styleUrls: ['./changer-mot-de-passe.component.scss']
})
export class ChangerMotDePasseComponent implements OnInit {

  changeUserPassewordDto: ChangeUserPasswordDto = {};
  olderPassword = '';

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (localStorage.getItem("origin") && localStorage.getItem("origin") === "inscription") {
      this.olderPassword = 'som3R@nd0mP@$$word';
      localStorage.removeItem("origin");
    }
  }

  cancelClick() {
    this.router.navigate(['profil']);
  }

  changePassword() {
    this.changeUserPassewordDto.id = UserService.getConnectedUser().id;
    this.userService.changerMotdePasse(this.changeUserPassewordDto)
      .subscribe(data => {
        //rien faire
        this.router.navigate(['profil']);
      });
  }
}
