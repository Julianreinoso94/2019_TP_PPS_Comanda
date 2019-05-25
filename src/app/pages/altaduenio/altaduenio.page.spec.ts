import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AltaduenioPage } from './altaduenio.page';

describe('AltaduenioPage', () => {
  let component: AltaduenioPage;
  let fixture: ComponentFixture<AltaduenioPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AltaduenioPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AltaduenioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
