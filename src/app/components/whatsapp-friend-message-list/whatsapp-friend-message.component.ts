import {Component, OnInit} from '@angular/core';
import {User} from '../../classes/user';
import {FriendService} from '../../services/friend.service';
import {Message} from '../../classes/message';
import { RdfService } from '../../services/rdf.service';
import { AuthService } from '../../services/solid.auth.service';
declare let $rdf: any;

@Component({
  selector: 'app-whatsapp-friend-message-list',
  templateUrl: './whatsapp-friend-message.component.html',
  styleUrls: ['./whatsapp-friend-message.component.scss']
})
export class WhatsappFriendMessageComponent implements OnInit {
  public friend: User;

  fileClient: any;

  constructor(private _friendService: FriendService,private rdf: RdfService) {
  }

  ngOnInit() {
    this._friendService.getSelectedFriendObservable().subscribe(friend => this.friend = friend);
  }

  sendMessage(event, message: string) {
    this._friendService.sendMessage(message, this.friend);
    event.target.value = '';
  }


  getMessageSender(message: Message) {
    let sender = 'whatsapp-message-out';

    if (message.sender.name === this.friend.name) {
      sender = 'whatsapp-message-in';
    }

    return sender;
  }

}
