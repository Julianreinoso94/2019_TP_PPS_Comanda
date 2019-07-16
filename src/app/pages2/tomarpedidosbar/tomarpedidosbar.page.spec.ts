import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TomarpedidosbarPage } from './tomarpedidosbar.page';

describe('TomarpedidosbarPage', () => {
  let component: TomarpedidosbarPage;
  let fixture: ComponentFixture<TomarpedidosbarPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TomarpedidosbarPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TomarpedidosbarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
