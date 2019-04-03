import {Component, OnInit} from '@angular/core';
import {User} from '../../../classes/user';
import {FriendService} from '../../../services/friend.service';

@Component({
  selector: 'app-whatsapp-canvas',
  templateUrl: './whatsapp-canvas.component.html',
  styleUrls: ['./whatsapp-canvas.component.scss']
})
export class WhatsappCanvasComponent implements OnInit {
  public loggedUser: User;
  public selectedFriend: User;

  constructor(private _friendService: FriendService) {
  }

  ngOnInit() {
    this.loggedUser = this._friendService.loggedUser;
    this._friendService.getSelectedFriendObservable().subscribe(friend => this.selectedFriend = friend);
  }

}
