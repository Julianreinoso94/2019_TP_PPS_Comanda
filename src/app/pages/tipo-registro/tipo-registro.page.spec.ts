import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoRegistroPage } from './tipo-registro.page';

describe('TipoRegistroPage', () => {
  let component: TipoRegistroPage;
  let fixture: ComponentFixture<TipoRegistroPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TipoRegistroPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoRegistroPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
