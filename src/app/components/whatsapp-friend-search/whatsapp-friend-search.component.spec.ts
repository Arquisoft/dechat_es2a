import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WhatsappFriendSearchComponent } from './whatsapp-friend-search.component';
import {MaterialModule} from '../../modules/material.module';
import {FriendService} from '../../services/friend.service';

describe('WhatsappFriendSearchComponent', () => {
  let component: WhatsappFriendSearchComponent;
  let fixture: ComponentFixture<WhatsappFriendSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        WhatsappFriendSearchComponent
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
    fixture = TestBed.createComponent(WhatsappFriendSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
