import { Component, OnInit } from '@angular/core';
import {UserDto} from "../../../model/user-dto";
import {AddressDto} from "../../../model/address-dto";
import {UserService} from "../../../services/user/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {PhotoService} from "../../../services/photo/photo.service";

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {

  userDto: UserDto = {};
  addressDto: AddressDto = {};
  errorsMsg: Array<String> = [];
  userId = -1;
  file: File | null = null;
  imgUrl: String | ArrayBuffer = 'assets/image/user.jpg';

  constructor(
    private userService: UserService,
    private router:Router,
    private activatedRoute: ActivatedRoute,
    private photoService: PhotoService
  ) { }

  ngOnInit(): void {
    const idUser = Number(this.activatedRoute.snapshot.paramMap.get("id"));
    this.userService.gerUserById(idUser)
      .subscribe(user => {
        this.userDto = user;
        this.userId = idUser;
        this.addressDto = this.userDto.addessDto? this.userDto.addessDto: {};
        this.imgUrl = this.userDto.photo? this.userDto.photo: '';
      });
  }

  cancelClick() {
    this.router.navigate(['utilisateur']);
  }

  enregistrer() {
    this.userService.updateUser(this.userDto, this.userId)
      .subscribe(resp => {
        this.savePhoto(resp.id, resp.lastName);
      }, error => {
        this.errorsMsg = error.error.errors;
      })
  }

  onFileInput(files: FileList  | null) {
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
