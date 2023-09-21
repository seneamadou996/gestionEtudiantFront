import { Component, OnInit } from '@angular/core';
import {EtudiantService} from "../../../services/etudiant/etudiant.service";
import {EtudiantDto} from "../../../model/etudiant-dto";
import {AddressDto} from "../../../model/address-dto";
import {Router} from "@angular/router";
import {PhotoService} from "../../../services/photo/photo.service";
import {UserService} from "../../../services/user/user.service";

@Component({
  selector: 'app-nouvel-etudiant',
  templateUrl: './nouvel-etudiant.component.html',
  styleUrls: ['./nouvel-etudiant.component.scss']
})
export class NouvelEtudiantComponent implements OnInit {

  etudiantDto: EtudiantDto = {};
  addessDto: AddressDto = {};
  errorsMsg: Array<String> = [];
  file: File | null = null;
  imgUrl: String | ArrayBuffer = 'assets/image/user.jpg';

  constructor(
    private etudiantService: EtudiantService,
    private photoService: PhotoService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }


  cancelClick() {
    this.router.navigate(['etudiant']);
  }

  enregistrer() {
    this.etudiantDto.addressDto = this.addessDto;
    this.etudiantDto.idSchool = UserService.getConnectedUser().schoolDto?.id;
    this.etudiantService.saveEtudiant(this.etudiantDto)
      .subscribe(etud => {
        this.savePhoto(etud.id, etud.lastname);
      }, error => {
        this.errorsMsg = error.error.errors;
      });
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

  savePhoto(idEtud?: number, title?: string) {
    if (idEtud && title && this.file) {
      this.photoService.savePhoto('etudiant', idEtud, this.file, title)
        .subscribe(resp => {
          this.router.navigate(['etudiant']);
        })
    }else {
      this.router.navigate(['etudiant']);
    }
  }

}
