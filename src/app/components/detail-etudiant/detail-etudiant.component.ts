import {Component, Input, EventEmitter, OnInit, Output} from '@angular/core';
import {EtudiantDto} from "../../model/etudiant-dto";
import {EtudiantService} from "../../services/etudiant/etudiant.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-detail-etudiant',
  templateUrl: './detail-etudiant.component.html',
  styleUrls: ['./detail-etudiant.component.scss']
})
export class DetailEtudiantComponent implements OnInit {

  @Input()
  etudiantDto: EtudiantDto = {};
  @Output()
  suppressionResult = new EventEmitter();

  constructor(
    private etudiantService: EtudiantService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  confirmerSuppressionUser() {
    this.etudiantService.delete(this.etudiantDto.id)
      .subscribe(resp => {
        this.suppressionResult.emit("success");
      }, error => {
        this.suppressionResult.emit(error.error.message);
      });
  }

  modifier() {
    this.router.navigate(['edit-etudiant', this.etudiantDto.id]);
  }
}
