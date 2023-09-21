import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {EtudiantService} from "../../../services/etudiant/etudiant.service";
import {EtudiantDto} from "../../../model/etudiant-dto";

@Component({
  selector: 'app-page-etudiant',
  templateUrl: './page-etudiant.component.html',
  styleUrls: ['./page-etudiant.component.scss']
})
export class PageEtudiantComponent implements OnInit {

  listEtudiants: Array<EtudiantDto> = [];
  errorMsg = '';

  constructor(
    private router: Router,
    private etudiantService: EtudiantService
  ) { }

  ngOnInit(): void {
    this.findAllEtudiant();
  }

  nouvelEtudiant() {
    this.router.navigate(['nouvel-etudiant']);
  }

  findAllEtudiant() {
    this.etudiantService.findAll()
      .subscribe(etud => {
        this.listEtudiants = etud
      });
  }

  handleSuppression(event: any) {
    if (event === 'success') {
      this.findAllEtudiant();
    } else {
      this.errorMsg = event;
    }
  }
}
