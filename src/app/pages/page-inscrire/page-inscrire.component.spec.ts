import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageInscrireComponent } from './page-inscrire.component';

describe('PageInscrireComponent', () => {
  let component: PageInscrireComponent;
  let fixture: ComponentFixture<PageInscrireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageInscrireComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageInscrireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
