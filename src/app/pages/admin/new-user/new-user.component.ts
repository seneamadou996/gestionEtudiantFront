import { Component, OnInit } from '@angular/core';
import {UserService} from "../../../services/user/user.service";
import {Router} from "@angular/router";
import {UserDto} from "../../../model/user-dto";
import {AddressDto} from "../../../model/address-dto";
import {PhotoService} from "../../../services/photo/photo.service";

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss']
})
export class NewUserComponent implements OnInit {

  userDto: UserDto = {};
  addressDto: AddressDto = {};
  errorsMsg: Array<String> = [];
  file: File | null = null;
  imgUrl: String | ArrayBuffer = 'assets/image/user.jpg';

  constructor(
    private userService: UserService,
    private router:Router,
    private photoService: PhotoService
  ) { }

  ngOnInit(): void {

  }

  cancelClick() {
    this.router.navigate(['utilisateur']);
  }

  enregistrer() {
    this.userDto.schoolDto = UserService.getConnectedUser().schoolDto;
    this.userDto.addessDto = this.addressDto;
    this.userService.saveUser(this.userDto)
      .subscribe(resp => {
        this.savePhoto(resp.id, resp.lastName);
      }, error => {
        this.errorsMsg = error.error.errors;
      })
  }

  onFileInput(files: FileList | null) {
    if (files) {
      this.file = files.item(0);
      if (this.file) {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(this.file);
        fileReader.onload = (event) => {
          if (fileReader.result) {
            this.imgUrl = fileReader.result;
          }
        };
      }
    }
  }


  savePhoto(idUser?: number, title?: string) {
    if (idUser && title && this.file) {
      this.photoService.savePhoto('user', idUser, this.file, title)
        .subscribe(resp => {
          this.router.navigate(['utilisateur']);
        })
    }else {
      this.router.navigate(['utilisateur']);
    }
  }

}
