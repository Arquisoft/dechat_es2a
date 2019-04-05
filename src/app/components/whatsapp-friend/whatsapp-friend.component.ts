import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-whatsapp-friend',
  templateUrl: './whatsapp-friend.component.html',
  styleUrls: ['./whatsapp-friend.component.scss'],
})
export class WhatsappFriendComponent implements OnInit {
  @Input() public friend;

  constructor() {
  }

  ngOnInit() {
  }
}
