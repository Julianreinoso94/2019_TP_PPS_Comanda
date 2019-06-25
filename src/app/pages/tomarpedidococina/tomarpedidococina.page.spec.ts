import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TomarpedidococinaPage } from './tomarpedidococina.page';

describe('TomarpedidococinaPage', () => {
  let component: TomarpedidococinaPage;
  let fixture: ComponentFixture<TomarpedidococinaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TomarpedidococinaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TomarpedidococinaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
