import {Component, OnInit} from '@angular/core';
import {FriendList} from '../../classes/friend-list';
import {User} from '../../classes/user';
import {FriendService} from '../../services/friend.service';

@Component({
  selector: 'app-whatsapp-friend-list',
  templateUrl: './whatsapp-friend-list.component.html',
  styleUrls: ['./whatsapp-friend-list.component.scss'],
})
export class WhatsappFriendListComponent implements OnInit {
  public friends: FriendList[];

  constructor(private _friendService: FriendService) {  }

  ngOnInit() {
    this._friendService.getFriendListObservable().subscribe(friends => {
      this.friends = friends;
    });
  }

  selectFriend(friend: User) {
    this._friendService.selectedFriend = friend;
  }
}
