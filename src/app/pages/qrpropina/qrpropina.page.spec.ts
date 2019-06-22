import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QrpropinaPage } from './qrpropina.page';

describe('QrpropinaPage', () => {
  let component: QrpropinaPage;
  let fixture: ComponentFixture<QrpropinaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QrpropinaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QrpropinaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
