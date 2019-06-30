import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WhatsappCanvasComponent } from './whatsapp-canvas.component';
import { MaterialModule } from '../../modules/material.module';
import { WhatsappFriendListComponent } from '../whatsapp-friend-list/whatsapp-friend-list.component';
import { WhatsappFriendMessageComponent } from '../whatsapp-friend-message-list/whatsapp-friend-message.component';
import { WhatsappFriendComponent } from '../whatsapp-friend/whatsapp-friend.component';
import { WhatsappMessageComponent } from '../whatsapp-message/whatsapp-message.component';
import { WhatsappFriendSearchComponent } from '../whatsapp-friend-search/whatsapp-friend-search.component';
import { FriendService } from '../../services/friend.service';

describe('WhatsappCanvasComponent', () => {
  let component: WhatsappCanvasComponent;
  let fixture: ComponentFixture<WhatsappCanvasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        WhatsappCanvasComponent,
        WhatsappFriendSearchComponent,
        WhatsappFriendListComponent,
        WhatsappMessageComponent,
        WhatsappFriendMessageComponent,
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
    fixture = TestBed.createComponent(WhatsappCanvasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
