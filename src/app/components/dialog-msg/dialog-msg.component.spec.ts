import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogMsgComponent } from './dialog-msg.component';

describe('DialogMsgComponent', () => {
  let component: DialogMsgComponent;
  let fixture: ComponentFixture<DialogMsgComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogMsgComponent]
    });
    fixture = TestBed.createComponent(DialogMsgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
