import { async, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { WhatsappCanvasComponent } from '../whatsapp-canvas/whatsapp-canvas.component';
import { MaterialModule } from '../../modules/material.module';
import { WhatsappFriendSearchComponent } from '../whatsapp-friend-search/whatsapp-friend-search.component';
import { WhatsappFriendListComponent } from '../whatsapp-friend-list/whatsapp-friend-list.component';
import { WhatsappMessageComponent } from '../whatsapp-message/whatsapp-message.component';
import { WhatsappFriendMessageComponent } from '../whatsapp-friend-message-list/whatsapp-friend-message.component';
import { WhatsappFriendComponent } from '../whatsapp-friend/whatsapp-friend.component';
import { FriendService } from '../../services/friend.service';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
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
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
