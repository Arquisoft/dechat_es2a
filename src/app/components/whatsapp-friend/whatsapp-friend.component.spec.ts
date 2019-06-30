import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {WhatsappFriendComponent} from './whatsapp-friend.component';
import {MaterialModule} from '../../modules/material.module';

describe('WhatsappFriendComponent', () => {
  let component: WhatsappFriendComponent;
  let fixture: ComponentFixture<WhatsappFriendComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        WhatsappFriendComponent
      ],
      imports: [
        MaterialModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WhatsappFriendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
