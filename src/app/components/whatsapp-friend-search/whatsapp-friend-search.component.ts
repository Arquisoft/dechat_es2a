import { Component, OnInit } from '@angular/core';
import {FriendService} from '../../services/friend.service';

@Component({
  selector: 'app-whatsapp-friend-search',
  templateUrl: './whatsapp-friend-search.component.html',
  styleUrls: ['./whatsapp-friend-search.component.scss']
})
export class WhatsappFriendSearchComponent implements OnInit {

  constructor(private _friendService: FriendService) { }

  ngOnInit() {
  }

  filterFriends(name: string) {
    this._friendService.filterFriends(name);
  }
}
