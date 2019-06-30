import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {WhatsappFriendListComponent} from './whatsapp-friend-list.component';
import {MaterialModule} from '../../modules/material.module';
import {WhatsappCanvasComponent} from '../whatsapp-canvas/whatsapp-canvas.component';
import {WhatsappFriendMessageComponent} from '../whatsapp-friend-message-list/whatsapp-friend-message.component';
import {WhatsappFriendComponent} from '../whatsapp-friend/whatsapp-friend.component';
import {WhatsappMessageComponent} from '../whatsapp-message/whatsapp-message.component';
import {WhatsappFriendSearchComponent} from '../whatsapp-friend-search/whatsapp-friend-search.component';
import {FriendService} from '../../services/friend.service';

describe('WhatsappFriendListComponent', () => {
  let component: WhatsappFriendListComponent;
  let fixture: ComponentFixture<WhatsappFriendListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        WhatsappFriendListComponent,
        WhatsappFriendComponent
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
    fixture = TestBed.createComponent(WhatsappFriendListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
