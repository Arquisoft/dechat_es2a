import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {WhatsappFriendMessageComponent} from './whatsapp-friend-message.component';
import {MaterialModule} from '../../modules/material.module';
import {WhatsappMessageComponent} from '../whatsapp-message/whatsapp-message.component';
import {FriendService} from '../../services/friend.service';

describe('WhatsappFriendMessageComponent', () => {
  let component: WhatsappFriendMessageComponent;
  let fixture: ComponentFixture<WhatsappFriendMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        WhatsappFriendMessageComponent,
        WhatsappMessageComponent,
      ],
      imports: [
        MaterialModule
      ],
      providers: [
        FriendService
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WhatsappFriendMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
