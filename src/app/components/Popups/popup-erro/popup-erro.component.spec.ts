import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupErroComponent } from './popup-erro.component';

describe('PopupErroComponent', () => {
  let component: PopupErroComponent;
  let fixture: ComponentFixture<PopupErroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupErroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupErroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
