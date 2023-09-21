import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NouvelEtudiantComponent } from './nouvel-etudiant.component';

describe('NouvelEtudiantComponent', () => {
  let component: NouvelEtudiantComponent;
  let fixture: ComponentFixture<NouvelEtudiantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NouvelEtudiantComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NouvelEtudiantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
