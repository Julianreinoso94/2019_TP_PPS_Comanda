import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LenguajePopoverPage } from './lenguaje-popover.page';

describe('LenguajePopoverPage', () => {
  let component: LenguajePopoverPage;
  let fixture: ComponentFixture<LenguajePopoverPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LenguajePopoverPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LenguajePopoverPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
