import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CartaPage } from './carta.page';

describe('CartaPage', () => {
  let component: CartaPage;
  let fixture: ComponentFixture<CartaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CartaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
