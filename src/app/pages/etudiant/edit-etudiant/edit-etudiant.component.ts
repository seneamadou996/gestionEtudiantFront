import { Component, OnInit } from '@angular/core';
import {EtudiantDto} from "../../../model/etudiant-dto";
import {AddressDto} from "../../../model/address-dto";
import {EtudiantService} from "../../../services/etudiant/etudiant.service";
import {PhotoService} from "../../../services/photo/photo.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-edit-etudiant',
  templateUrl: './edit-etudiant.component.html',
  styleUrls: ['./edit-etudiant.component.scss']
})
export class EditEtudiantComponent implements OnInit {

  etudiantDto: EtudiantDto = {};
  addessDto: AddressDto = {};
  errorsMsg: Array<String> = [];
  etudId = -1;
  file: File | null = null;
  imgUrl: String | ArrayBuffer = 'assets/image/user.jpg';

  constructor(
    private etudiantService: EtudiantService,
    private photoService: PhotoService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const idEtud = Number(this.activatedRoute.snapshot.paramMap.get("id"));
    this.etudiantService.findById(idEtud)
      .subscribe(etud => {
        this.etudiantDto = etud;
        this.etudId = idEtud;
        this.addessDto = this.etudiantDto.addressDto? this.etudiantDto.addressDto: {};
        this.imgUrl = this.etudiantDto.photo? this.etudiantDto.photo: '';
      })
  }

  cancelClick() {
    this.router.navigate(['etudiant']);
  }

  enregistrer() {
    this.etudiantService.update(this.etudiantDto, this.etudId)
      .subscribe(resp => {
        this.savePhoto(resp.id, resp.lastname);
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
