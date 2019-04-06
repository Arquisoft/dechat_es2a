import {Component, OnInit, SimpleChanges,OnChanges} from '@angular/core';
import {FriendList} from '../../classes/friend-list';
import {User} from '../../classes/user';
import {FriendService} from '../../services/friend.service';
import { RdfService } from '../../services/rdf.service';
import { AuthService } from '../../services/solid.auth.service';
declare let $rdf:any;


@Component({
  selector: 'app-whatsapp-friend-list',
  templateUrl: './whatsapp-friend-list.component.html',
  styleUrls: ['./whatsapp-friend-list.component.scss'],
})
export class WhatsappFriendListComponent implements OnInit ,OnChanges{
  public friends: FriendList[];

  constructor(private _friendService: FriendService,private rdf: RdfService, private auth: AuthService) {  }

  ngOnInit() {
    this._friendService.getFriendListObservable().subscribe(friends => {
      this.friends = friends;
    });
    console.log(this.friends);
  }

  selectFriend(friend: User) {
    this._friendService.selectedFriend = friend;
  }

  trackByUsers(index: number, friendList: FriendList): number { return friendList.friend.id; }

  ngOnChanges(changes: SimpleChanges): void {
    
    
  }



}
