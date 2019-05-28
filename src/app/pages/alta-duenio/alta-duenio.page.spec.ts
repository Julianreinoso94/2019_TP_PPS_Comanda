import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AltaDuenioPage } from './alta-duenio.page';

describe('AltaDuenioPage', () => {
  let component: AltaDuenioPage;
  let fixture: ComponentFixture<AltaDuenioPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AltaDuenioPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AltaDuenioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
