import {Component, Input, OnInit, EventEmitter, Output} from '@angular/core';
import {UserDto} from "../../model/user-dto";
import {UserService} from "../../services/user/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-detail-user',
  templateUrl: './detail-user.component.html',
  styleUrls: ['./detail-user.component.scss']
})
export class DetailUserComponent implements OnInit {

  @Input()
  userDto: UserDto = {};
  @Output()
  suppressionResult = new EventEmitter();

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  confirmerSuppressionUser() {
    if (this.userDto.id) {
      this.userService.deleteUser(this.userDto.id)
        .subscribe(resp => {
          this.suppressionResult.emit("success");
        }, err => {
          this.suppressionResult.emit(err.error.message);
        })
    }
  }

  modifiderUser() {
    this.router.navigate(['edit-utilisateur', this.userDto.id]);
  }
}
