import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QringresolocalPage } from './qringresolocal.page';

describe('QringresolocalPage', () => {
  let component: QringresolocalPage;
  let fixture: ComponentFixture<QringresolocalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QringresolocalPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QringresolocalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
