import { TestBed, inject } from '@angular/core/testing';
import { User } from '../classes/user';
import { FriendService } from './friend.service';

describe('FriendService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FriendService]
    });
  });

  it('should be created', inject([FriendService], (service: FriendService) => {
    expect(service).toBeTruthy();
  }));


});
