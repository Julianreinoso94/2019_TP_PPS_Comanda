import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AltaAnonimoPage } from './alta-anonimo.page';

describe('AltaAnonimoPage', () => {
  let component: AltaAnonimoPage;
  let fixture: ComponentFixture<AltaAnonimoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AltaAnonimoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AltaAnonimoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
