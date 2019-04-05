import {Component, Input, OnInit} from '@angular/core';
import {Message} from '../../classes/message';

@Component({
  selector: 'app-whatsapp-message',
  templateUrl: './whatsapp-message.component.html',
  styleUrls: ['./whatsapp-message.component.scss']
})
export class WhatsappMessageComponent implements OnInit {
  @Input() public message: Message;

  constructor() { }

  ngOnInit() {
  }

}
